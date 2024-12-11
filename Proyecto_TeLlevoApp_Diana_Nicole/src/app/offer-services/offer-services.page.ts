import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { User } from '../models/user';
import { Vehiculo } from '../models/vehiculo';
import { Service } from '../models/servicio';
import { LoginService } from '../services/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-offer-services',
  templateUrl: './offer-services.page.html',
  styleUrls: ['./offer-services.page.scss'],
})
export class OfferServicesPage implements OnInit {

  usuario: User | null = null;
  vehiculo: Vehiculo | null = null;
  selectedValue: number = 5;
  sedeSeleccionada: string = '';
  distanciaMaxima: number = 0;
  editingVehicle: Vehiculo = new Vehiculo('', '', '', '', 4, 0);
  nuevoVehiculo: Vehiculo = new Vehiculo('', '', '', '', 4, 0);

  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private navController: NavController,
    private loginService: LoginService,
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.usuario = await this.loginService.obtenerUsuarioAutenticado();
    if (this.usuario) {
      this.vehiculo = await this.loginService.obtenerVehiculoUsuario(this.usuario.usuario);
      //if (this.vehiculo) {
       //this.editingVehicle = { ...this.vehiculo };
      //}
    }
  }

  volver() {
    this.navController.back();
  }

  // Función para cancelar la edición o adición de un vehículo
  cancel() {
    this.nuevoVehiculo = new Vehiculo('', '', '', '',4,0);
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

    // Validación de la sede y la distancia máxima
    if (!this.sedeSeleccionada || this.sedeSeleccionada === '') {
      this.mostrarToast('Debe seleccionar una sede', 'danger');
      return;
    }

    if (this.distanciaMaxima <= 0) {
      this.mostrarToast('La distancia máxima debe ser mayor que 0', 'danger');
      return;
    }

    try {
      const nuevoServicio = new Service(
        Date.now(), // ID único
        this.usuario, // Usuario conductor
        this.vehiculo, // Vehículo
        this.sedeSeleccionada,
        this.selectedValue,
        this.distanciaMaxima
      );

      await this.loginService.guardarServicio(nuevoServicio);
      this.mostrarToast('Servicio creado, ahora tu publicación es visible', 'success');
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

  goToServiceStatus() {
    this.router.navigate(['/service-status']);
  }
  
  async confirmarEdicion() {
    const alert = await this.alertController.create({
      header: 'Confirmar edición',
      message: '¿Estás seguro de que deseas guardar los cambios en el vehículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edición cancelada');
          }
        },
        {
          text: 'Guardar',
          handler: () => {
            this.confirmEditModal(); // Llamar al método para guardar los cambios
          }
        }
      ]
    });
  
    await alert.present();
  }

}
