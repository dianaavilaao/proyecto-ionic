import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Service } from '../models/servicio';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  name!: string;
  viajeEnCurso: Service | null = null; // Viaje en curso asociado al usuario
  carritoVisible: boolean = false; // Controla la visibilidad del carrito
  @ViewChild('carrito') carritoElement!: ElementRef;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private animationController: AnimationController,
    private loginService: LoginService,
    private animationCtrl: AnimationController
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.name = params['name'];

      // Verifica si hay un viaje en curso
      const viajeId = params['viajeEnCurso'];
      if (viajeId) {
        const servicios = await this.loginService.obtenerServicios();
        this.viajeEnCurso = servicios.find(s => s.id === +viajeId) || null;

        // Si el viaje está en curso, activar el carrito
        if (this.viajeEnCurso?.enCurso) {
          this.activarCarrito();
        }
      }
    });
  }

  volver() {
    this.navCtrl.back();
  }

  goToOfferServices() {
    this.navCtrl.navigateForward('/offer-services');
  }

  goToSearchServices() {
    this.navCtrl.navigateForward('/search-services');
  }

  goToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  goToUserAccept() {
    this.navCtrl.navigateForward('/user-accept');
  }

  // Función para activar la animación
  activarCarrito() {
    this.carritoVisible = true; // Actualiza el estado de visibilidad del carrito
    const carrito = this.carritoElement.nativeElement;
    carrito.style.display = 'block';
    this.iniciarAnimacionViaje();
  }

  iniciarAnimacionViaje() {
    const carrito = this.carritoElement.nativeElement;
  
    // Obtener el ancho de la pantalla
    const screenWidth = window.innerWidth;
  
    // Crear la animación
    const animation = this.animationCtrl.create()
      .addElement(carrito)
      .duration(3000) // Ajusta la duración para el movimiento del carrito
      .iterations(Infinity) // Hace que la animación se repita infinitamente
      .keyframes([
        { transform: `translateX(-${screenWidth}px)`, offset: 0 }, // Fuera de la pantalla por la izquierda
        { transform: `translateX(${screenWidth}px)`, offset: 1 }   // Fuera de la pantalla por la derecha
      ]);
  
    // Iniciar la animación
    animation.play();
  }
}