import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { User } from '../models/user';
import { Vehiculo } from '../models/vehiculo';
import { Service } from '../models/servicio';
import { LoginService } from '../services/login.service';

interface ServicioExtendido extends Service {
  tiempoRestante: number;
  capacidadDisponible: number;
}

@Component({
  selector: 'app-offer-services',
  templateUrl: './offer-services.page.html',
  styleUrls: ['./offer-services.page.scss'],
})
export class OfferServicesPage implements OnInit, OnDestroy {

  usuario: User | null = null;
  vehiculo: Vehiculo | null = null;
  selectedValue: number = 5;
  sedeSeleccionada: string = '';
  distanciaMaxima: number = 0;
  editingVehicle: Vehiculo = new Vehiculo('', '', '', '', 4, 0);
  nuevoVehiculo: Vehiculo = new Vehiculo('', '', '', '', 4, 0);
  servicios: Service[] = []; // Lista de servicios
  serviciosFiltrados: ServicioExtendido[] = []; // Lista de servicios filtrados con tiempo restante y capacidad disponible

  @ViewChild(IonModal) modal!: IonModal;
  servicio: Service | null = null;
  intervalId: any;

  constructor(
    private navController: NavController,
    private loginService: LoginService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.usuario = await this.loginService.obtenerUsuarioAutenticado();
    if (this.usuario) {
      this.vehiculo = await this.loginService.obtenerVehiculoUsuario(this.usuario.usuario);
      this.servicios = await this.loginService.obtenerServicios(); // Obtiene la lista de servicios
      this.filtrarServicios(); // Filtra los servicios al iniciar
      this.intervalId = setInterval(() => this.filtrarServicios(), 60000); // Verifica cada minuto
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  filtrarServicios() {
    const ahora = Date.now();

    this.serviciosFiltrados = this.servicios
      .map(servicio => {
        // Calcular el tiempo restante en minutos
        const tiempoRestante = servicio.minutosAnuncio - ((ahora - servicio.id) / 60000);
        
        // Asegurar que capacidad y asientos ocupados están definidos y son números
        const capacidadMaxima = servicio.vehiculo.capacidadMaxima || 0;
        const asientosOcupados = servicio.pasajeros.length || 0;
        const capacidadDisponible = Math.max(capacidadMaxima - asientosOcupados, 0); // Evitar valores negativos

        return {
          ...servicio,
          tiempoRestante: tiempoRestante > 0 ? tiempoRestante : 0, // Si el tiempo restante es negativo, mostrar 0
          capacidadDisponible // Asegurar que no sea negativo
        } as ServicioExtendido;
      })
      .filter(servicio => servicio.tiempoRestante > 0); // Mostrar solo los servicios con tiempo restante positivo

    // Para verificar, muestra en consola los servicios filtrados y sus capacidades
    console.log("Servicios filtrados:", this.serviciosFiltrados);
  }

  volver() {
    this.navController.back();
  }

  // Función para cancelar la edición o adición de un vehículo
  cancel() {
    this.nuevoVehiculo = new Vehiculo('', '', '', '', 4, 0);
    return this.modalController.dismiss(null, 'cancel');
  }

  // Función para confirmar la adición de un vehículo nuevo
  async confirm() {
    if (this.usuario) {
      const vehiculo = new Vehiculo(
        this.nuevoVehiculo.marca,
        this.nuevoVehiculo.modelo,
        this.nuevoVehiculo.patente,
        this.nuevoVehiculo.color,
        this.nuevoVehiculo.capacidadMaxima, // Aquí se utiliza la capacidad personalizada
        0
      );
      await this.loginService.guardarVehiculo(this.usuario.usuario, vehiculo);
      this.vehiculo = vehiculo;
      this.nuevoVehiculo = new Vehiculo('', '', '', '', 0, 0); 
      await this.modalController.dismiss(vehiculo, 'confirm');
      await this.ngOnInit();
    }
  }

  cancelEdit() {
    this.modal.dismiss(null, 'cancel');
    this.navController.navigateBack('/offer-services'); 
  }

  dismissEditModal() {
    this.modal.dismiss(null, 'cancel');
    this.navController.navigateBack('/offer-services'); 
  }

  async confirmEditModal() {
    if (this.usuario && this.editingVehicle) {
      await this.loginService.editarVehiculo(this.usuario.usuario, this.editingVehicle);
      this.vehiculo = this.editingVehicle;
      this.dismissEditModal();
      await this.ngOnInit();
    }
  }

  async agregarVehiculo(vehiculo: Vehiculo) {
    if (this.usuario) {
      await this.loginService.guardarVehiculo(this.usuario.usuario, vehiculo);
      this.vehiculo = vehiculo;
      this.cancel();
      await this.ngOnInit();
    }
  }

  async editarVehiculo(vehiculo: Vehiculo) {
    if (this.usuario) {
      await this.loginService.guardarVehiculo(this.usuario.usuario, vehiculo);
      this.vehiculo = vehiculo;
      this.cancelEdit();
      await this.ngOnInit();
    }
  }

  // Función para crear un servicio de transporte
  async crearServicio() {
    if (!this.usuario || !this.vehiculo) {
      this.mostrarToast('Debe estar autenticado y tener un vehículo registrado', 'danger');
      return;
    }
  
    try {
      const nuevoServicio = new Service(
        Date.now(),
        this.usuario,
        this.vehiculo,
        this.sedeSeleccionada,
        this.selectedValue,
        this.distanciaMaxima,
        [],
        60 // Valor de minutosAnuncio
      );
  
      await this.loginService.guardarServicio(nuevoServicio);
      this.servicio = nuevoServicio; // Asigna el nuevo servicio a `servicio`
      this.mostrarToast('Servicio creado, ahora tu publicación es visible', 'success');
      this.servicios = await this.loginService.obtenerServicios(); // Actualiza la lista de servicios
      this.filtrarServicios(); // Filtra los servicios después de agregar uno nuevo
    } catch (error) {
      this.mostrarToast('Error al crear el servicio', 'danger');
      console.error('Error al crear el servicio:', error);
    }
  }

  // Función para mostrar un mensaje de Toast
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}