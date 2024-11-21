import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Service } from '../models/servicio';
import { Pasajero } from '../models/pasajero';

@Component({
  selector: 'app-user-accept',
  templateUrl: './user-accept.page.html',
  styleUrls: ['./user-accept.page.scss'],
})
export class UserAcceptPage implements OnInit {
  serviciosDisponibles: Service[] = [];
  usuarioAutenticado: any;

  constructor(
    private loginService: LoginService,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.cargarServiciosDisponibles();
  }

  async cargarServiciosDisponibles() {
    try {
      this.usuarioAutenticado = await this.loginService.obtenerUsuarioAutenticado();
      const servicios = await this.loginService.obtenerServicios();

      // Filtrar solo los servicios activos y que no estén en curso
      this.serviciosDisponibles = servicios.filter(
        (servicio: Service) => !servicio.enCurso && servicio.tiempoRestante! > 0
      );
    } catch (error) {
      console.error('Error al cargar servicios disponibles:', error);
    }
  }

  puedeAceptarServicio(servicio: Service): boolean {
    const capacidadDisponible = servicio.vehiculo.capacidadMaxima - servicio.vehiculo.asientosOcupados;
    return capacidadDisponible > 0; // Verifica si hay espacio disponible
  }

  async aceptarViaje(servicio: Service) {
    try {
      console.log('Servicio seleccionado para aceptar:', servicio);
  
      if (!this.usuarioAutenticado) {
        this.mostrarToast('Usuario no autenticado.', 'danger');
        return;
      }
  
      // Verificar si hay capacidad disponible
      const capacidadDisponible = servicio.vehiculo.capacidadMaxima - servicio.vehiculo.asientosOcupados;
      console.log(`Capacidad disponible: ${capacidadDisponible}`);
  
      if (capacidadDisponible <= 0) {
        this.mostrarToast('No hay asientos disponibles en este viaje.', 'danger');
        return;
      }
  
      // Verificar si el usuario ya es pasajero
      const pasajeroExistente = servicio.pasajeros.find(
        p => p.usuario === this.usuarioAutenticado.usuario
      );
  
      if (pasajeroExistente) {
        console.log('El usuario ya es pasajero:', pasajeroExistente);
  
        if (pasajeroExistente.acepto) {
          this.mostrarToast('Ya has aceptado este viaje.', 'warning');
        } else {
          pasajeroExistente.acepto = true;
          servicio.vehiculo.ocuparAsiento();
          console.log('Estado del servicio después de aceptar (existente):', servicio);
        }
      } else {
        const nuevoPasajero = new Pasajero(this.usuarioAutenticado.usuario, true);
        servicio.pasajeros.push(nuevoPasajero);
        servicio.vehiculo.ocuparAsiento();
        console.log('Estado del servicio después de aceptar (nuevo pasajero):', servicio);
      }
  
      await this.loginService.actualizarServicio(servicio);
      console.log('Servicio actualizado exitosamente.');
  
      this.mostrarToast('Te has unido al viaje exitosamente.', 'success');
      await this.cargarServiciosDisponibles();
  
    } catch (error) {
      console.error('Error al aceptar el viaje:', error);
      this.mostrarToast('Error al procesar la solicitud.', 'danger');
    }
  }
  
  
  

  
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  volver() {
    this.navController.back();
  }
}
