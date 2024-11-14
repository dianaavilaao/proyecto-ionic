import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Service } from '../models/servicio';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.page.html',
  styleUrls: ['./search-services.page.scss'],
})
export class SearchServicesPage implements OnInit {
  servicios: Service[] = []; // Lista de servicios disponibles
  serviciosFiltrados: any[] = []; // Lista de servicios filtrados con tiempo restante y capacidad disponible
  sedeSeleccionada: string = ''; // Sede seleccionada por el usuario

  constructor(
    private navController: NavController,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    // Obtener todos los servicios al iniciar la página
    this.servicios = await this.loginService.obtenerServicios();
    this.filtrarServicios();
  }

  volver() {
    this.navController.back();
  }

  // Filtra los servicios según la sede seleccionada y calcula el tiempo restante y capacidad disponible
  filtrarServicios() {
    const ahora = Date.now();

    this.serviciosFiltrados = this.servicios
      .filter(servicio => servicio.sede === this.sedeSeleccionada)
      .map(servicio => {
        // Calcular el tiempo restante en minutos
        const tiempoRestante = servicio.minutosAnuncio - ((ahora - servicio.id) / 60000);
        
        // Asegurar que capacidad y asientos ocupados están definidos y son números
        const capacidadMaxima = servicio.vehiculo.capacidadMaxima || 0;
        const asientosOcupados = servicio.vehiculo.asientosOcupados || 0;
        const capacidadDisponible = Math.max(capacidadMaxima - asientosOcupados, 0); // Evitar valores negativos

        return {
          ...servicio,
          tiempoRestante: tiempoRestante > 0 ? tiempoRestante : 0, // Si el tiempo restante es negativo, mostrar 0
          capacidadDisponible // Asegurar que no sea negativo
        };
      })
      .filter(servicio => servicio.tiempoRestante > 0); // Mostrar solo los servicios con tiempo restante positivo

    // Para verificar, muestra en consola los servicios filtrados y sus capacidades
    console.log("Servicios filtrados:", this.serviciosFiltrados);
  }

  // Función para aceptar la sede ingresada y filtrar los servicios
  aceptarSede() {
    if (this.sedeSeleccionada) {
      this.filtrarServicios();
    }
  }

  // Tomar un viaje
  tomarViaje(servicio: Service) {
    this.navController.navigateForward(`/selected-service`, {
      queryParams: { servicio: JSON.stringify(servicio) }
    });
  }
}
