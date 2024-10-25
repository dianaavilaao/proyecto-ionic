// selected-service.page.ts
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../models/servicio';
declare var google: any;

@Component({
  selector: 'app-selected-service',
  templateUrl: './selected-service.page.html',
  styleUrls: ['./selected-service.page.scss'],
})
export class SelectedServicePage implements AfterViewInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;
  direccionDestino: string = '';
  geocoder: any;
  directionsService: any;
  directionsRenderer: any;
  sedeLatLng: { lat: number, lng: number } | null = null; // Coordenadas de la sede seleccionada
  servicioSeleccionado: Service | null = null; // Servicio seleccionado
  distanciaRuta: number = 0; // Distancia calculada de la ruta en km
  puedeAceptarViaje: boolean = false; // Controla el estado del botón "Aceptar viaje"

  // Mapa de sedes con sus coordenadas reales
  sedesCoordenadas: { [key: string]: { lat: number; lng: number } } = {
    'alameda': { lat: -33.448811744328104, lng: -70.67000634086763 },
    'padre-alonso': { lat: -33.44682566206291, lng: -70.65790159815451 },
    'antonio-varas': { lat: -33.44068250885547, lng: -70.61310785582465 },
    'educacion-continua': { lat: -33.44094340384291, lng: -70.64136448465972 },
    'maipu': { lat: -33.51108930945361, lng: -70.75242783014274 },
    'melipilla': { lat: -33.694007463538455, lng: -71.21363605897166 },
    'plaza-norte': { lat: -33.36325179825936, lng: -70.67806718597237 },
    'plaza-oeste': { lat: -33.515031677647414, lng: -70.71841127431784 },
    'vespucio': { lat: -33.5158878754339, lng: -70.59814927916166 },
    'puente-alto': { lat: -33.59837125344353, lng: -70.57875488465972 },
    'san-bernardo': { lat: -33.59875879098744, lng: -70.70576867246973 },
    'san-carlos': { lat: -33.400101350316945, lng: -70.50550904364131 },
    'san-joaquin': { lat: -33.50006728013748, lng: -70.61648592218478 },
    'valparaiso': { lat: -33.044326091862054, lng: -71.61526329763237 },
    'vina-del-mar': { lat: -33.0336442009385, lng: -71.53315191666383 },
    'arauco': { lat: -37.24702962406319, lng: -73.29512711651584 },
    'nacimiento': { lat: -37.510110951624355, lng: -72.66152531534028 },
    'san-andres': { lat: -36.795107594505424, lng: -73.06259426070766 },
    'villarrica': { lat: -39.27738652083515, lng: -72.22425840294416 },
    'puerto-montt': { lat: -41.47002231927331, lng: -72.92580857402234 },
  };

  constructor(
    private navController: NavController,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.inicializarMapa();
    this.route.queryParams.subscribe(params => {
      if (params['servicio']) {
        this.servicioSeleccionado = JSON.parse(params['servicio']);
        
        // Configura las coordenadas de la sede automáticamente
        const sede = this.servicioSeleccionado?.sede;
        if (sede && this.sedesCoordenadas[sede]) {
          this.sedeLatLng = this.sedesCoordenadas[sede];
          this.map.setCenter(this.sedeLatLng);
          this.map.setZoom(15);
        } else {
          this.mostrarToast('Sede no válida', 'danger');
        }
      }
    });
  }

  volver() {
    this.navController.back();
  }

  inicializarMapa() {
    const mapOptions = {
      center: { lat: -33.45694, lng: -70.64827 },
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.geocoder = new google.maps.Geocoder();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
  }

  async aceptarDireccion() {
    if (!this.direccionDestino) {
      this.mostrarToast('Por favor ingresa una dirección válida', 'danger');
      return;
    }

    if (!this.sedeLatLng) {
      this.mostrarToast('No se ha configurado una sede válida', 'danger');
      return;
    }

    // Geocodificación para verificar la dirección
    this.geocoder.geocode({ address: this.direccionDestino }, (results: any, status: any) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const destinoLatLng = results[0].geometry.location;
        this.mostrarRuta(destinoLatLng);
      } else {
        this.mostrarToast('No se pudo encontrar la dirección', 'danger');
      }
    });
  }

  mostrarRuta(destinoLatLng: any) {
    const request = {
      origin: this.sedeLatLng,
      destination: destinoLatLng,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);

        // Calcular la distancia total en kilómetros y compararla con la distancia del servicio
        this.distanciaRuta = result.routes[0].legs[0].distance.value / 1000;
        const distanciaMaxima = this.servicioSeleccionado?.distanciaMaxima || 0;
        this.puedeAceptarViaje = this.distanciaRuta <= distanciaMaxima;

        this.mostrarToast(`Distancia hasta el destino: ${this.distanciaRuta.toFixed(2)} km`, 'success');
      } else {
        this.mostrarToast('No se pudo calcular la ruta', 'danger');
      }
    });
  }

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
