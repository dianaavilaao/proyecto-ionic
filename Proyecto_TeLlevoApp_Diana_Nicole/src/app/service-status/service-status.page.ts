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
        const capacidadDisponible = Math.max(capacidadMaxima - asientosOcupados, 0);
  
        return {
          ...servicio,
          tiempoRestante: tiempoRestante > 0 ? tiempoRestante : 0, // Mostrar 0 si el tiempo restante es negativo
          capacidadDisponible
        };
      })
      .filter(servicio => servicio.tiempoRestante > 0); // Mostrar solo servicios con tiempo restante positivo
  
    console.log('Servicios activos del usuario:', this.serviciosUsuario);
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
}