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

        // Si el viaje está en curso, activar la animación
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
    const carrito = this.carritoElement.nativeElement;
    carrito.style.display = 'block';  // Asegurarse de que el carrito sea visible
    this.iniciarAnimacionViaje();
  }

  // Función para iniciar la animación del carrito
  iniciarAnimacionViaje() {
    const carrito = this.carritoElement.nativeElement;

    // Crear la animación
    const animation = this.animationCtrl.create()
      .addElement(carrito) // Elemento que se va a animar
      .duration(1000) // Duración de la animación en milisegundos
      .iterations(Infinity) // Hace que la animación se repita infinitamente
      .keyframes([
        { transform: 'translateX(0px)', offset: 0 }, // Posición inicial
        { transform: 'translateX(200px)', offset: 0.5 }, // Desplazamiento a la derecha
        { transform: 'translateX(0px)', offset: 1 }, // Regreso a la posición inicial
      ]);

    // Iniciar la animación
    animation.play();
  }
}
