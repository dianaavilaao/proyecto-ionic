// search-services.page.ts
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
  serviciosFiltrados: any[] = []; // Lista de servicios filtrados con tiempo restante
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

  // Filtra los servicios según la sede seleccionada y el tiempo restante
  filtrarServicios() {
    const ahora = Date.now();

    this.serviciosFiltrados = this.servicios
      .filter(servicio => servicio.sede === this.sedeSeleccionada)
      .map(servicio => {
        // Calcular el tiempo restante en minutos
        const tiempoRestante = servicio.minutosAnuncio - ((ahora - servicio.id) / 60000);
        return {
          ...servicio,
          tiempoRestante: tiempoRestante > 0 ? tiempoRestante : 0 // Si el tiempo restante es negativo, mostrar 0
        };
      })
      .filter(servicio => servicio.tiempoRestante > 0); // Mostrar solo los servicios con tiempo restante positivo
  }

  // Función para aceptar la sede ingresada y filtrar los servicios
  aceptarSede() {
    if (this.sedeSeleccionada) {
      this.filtrarServicios();
    }
  }

  // Tomar un viaje
  tomarViaje(servicio: Service) {
    console.log('Viaje tomado:', servicio);
    // Aquí puedes implementar la lógica adicional para tomar el viaje
  }
}
