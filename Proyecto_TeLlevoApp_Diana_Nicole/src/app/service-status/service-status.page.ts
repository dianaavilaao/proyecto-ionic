import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Service } from '../models/servicio';
import { NavController } from '@ionic/angular';

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
    private navController: NavController
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
    .filter(servicio => servicio.conductor.usuario === this.usuarioAutenticado.usuario)
    .map(servicio => {
      const tiempoRestante = servicio.minutosAnuncio - ((ahora - servicio.id) / 60000);
      const capacidadMaxima = servicio.vehiculo.capacidadMaxima || 0;
      const asientosOcupados = servicio.vehiculo.asientosOcupados || 0;

      // Asegurar que pasajeros es un array válido
      servicio.pasajeros = servicio.pasajeros || [];

      // Calcular capacidad disponible y si todos los pasajeros aceptaron
      const todosAceptaron = servicio.pasajeros.every(pasajero => pasajero.acepto);

      return {
        ...servicio,
        tiempoRestante: Math.max(tiempoRestante, 0), // Asegurar que no sea negativo
        capacidadMaxima,
        asientosOcupados,
        todosAceptaron, // Asigna a la nueva propiedad
      };
    })
    .filter(servicio => servicio.tiempoRestante > 0); // Mostrar solo servicios activos
}
  
  async cargarServiciosUsuario() {
    try {
      // Obtener el usuario autenticado
      const usuarioAutenticado = await this.loginService.obtenerUsuarioAutenticado();
  
      if (usuarioAutenticado) {
        this.usuarioAutenticado = usuarioAutenticado; // Guarda el usuario autenticado
        this.servicios = await this.loginService.obtenerServicios(); // Obtén todos los servicios
  
        // Aplicar filtro para servicios activos
        this.filtrarServiciosActivos();
      } else {
        console.error('No hay un usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    }
  }

  iniciarViaje(servicio: Service) {
    if (servicio.todosAceptaron) {
      servicio.enCurso = true; // Marcar el servicio como en curso
      this.loginService.actualizarServicio(servicio).then(() => {
        console.log('El viaje ha comenzado.');
        alert('El viaje ha sido iniciado exitosamente.');
      }).catch(err => {
        console.error('Error al iniciar el viaje:', err);
      });
    } else {
      alert('No todos los pasajeros han aceptado el viaje.');
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