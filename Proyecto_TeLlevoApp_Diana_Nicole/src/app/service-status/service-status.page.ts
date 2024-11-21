import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Service } from '../models/servicio';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.page.html',
  styleUrls: ['./service-status.page.scss'],
})
export class ServiceStatusPage implements OnInit {
  servicios: Service[] = []; // Todos los servicios
  serviciosUsuario: Service[] = []; // Servicios del usuario autenticado
  usuarioAutenticado: any;

  constructor(private loginService: LoginService,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.cargarServiciosUsuario();
  }

  volver() {
    this.navController.back();
  }
  
  filtrarServiciosActivos() {
    const ahora = Date.now();

    this.serviciosUsuario = this.servicios
      .filter(servicio => 
        servicio.conductor.usuario === this.usuarioAutenticado.usuario && 
        !servicio.enCurso
      )
      .map(servicio => {
        // Calcular tiempo restante
        const tiempoRestante = this.calcularTiempoRestante(servicio.minutosAnuncio, servicio.id);
        
        // Asegurar que el array de pasajeros existe
        servicio.pasajeros = servicio.pasajeros || [];

        // Verificar si hay pasajeros y si todos aceptaron
        const hayPasajeros = servicio.pasajeros.length > 0;
        const todosAceptaron = hayPasajeros && servicio.pasajeros.every(p => p.acepto);

        return {
          ...servicio,
          tiempoRestante: Math.max(tiempoRestante, 0),
          todosAceptaron
        };
      })
      .filter(servicio => servicio.tiempoRestante > 0);
  }
  

  private calcularTiempoRestante(minutosAnuncio: number, idServicio: number): number {
    const ahora = Date.now();
    return minutosAnuncio - ((ahora - idServicio) / 60000);
  }


  puedeIniciarViaje(servicio: Service): boolean {
    return (
      servicio.pasajeros.length > 0 &&
      servicio.pasajeros.every(p => p.acepto) &&
      !servicio.enCurso
    );
  }

  async cargarServiciosUsuario() {
    try {
      const usuarioAutenticado = await this.loginService.obtenerUsuarioAutenticado();
      if (usuarioAutenticado) {
        this.usuarioAutenticado = usuarioAutenticado;
        this.servicios = await this.loginService.obtenerServicios();
        this.filtrarServiciosActivos();
  
        // Actualización explícita de la lista de pasajeros
        this.serviciosUsuario.forEach(servicio => {
          servicio.todosAceptaron = servicio.pasajeros.every(p => p.acepto);
          servicio.vehiculo.asientosOcupados = servicio.pasajeros.filter(p => p.acepto).length;
        });
      } else {
        console.error('No hay un usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    }
  }


  async iniciarViaje(servicio: Service) {
    if (!this.puedeIniciarViaje(servicio)) {
      const mensaje = servicio.pasajeros.length === 0 
        ? 'No hay pasajeros en el viaje.' 
        : 'No todos los pasajeros han confirmado.';
      
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 3000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    try {
      servicio.enCurso = true;
      await this.loginService.actualizarServicio(servicio);
      
      const toast = await this.toastController.create({
        message: 'El viaje ha comenzado exitosamente.',
        duration: 3000,
        color: 'success'
      });
      toast.present();
      
      // Recargar los servicios
      await this.cargarServiciosUsuario();
    } catch (error) {
      console.error('Error al iniciar el viaje:', error);
      const toast = await this.toastController.create({
        message: 'Error al iniciar el viaje.',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }
  }

  aceptarViaje(servicio: Service, usuario: string) {
    const pasajero = servicio.pasajeros.find(p => p.usuario === usuario);
    if (pasajero) {
      pasajero.acepto = true;
      this.loginService.actualizarServicio(servicio).then(() => {
        console.log(`${usuario} ha aceptado el viaje.`);
      }).catch(err => {
        console.error('Error al aceptar el viaje:', err);
      });
    }
  }
 }
