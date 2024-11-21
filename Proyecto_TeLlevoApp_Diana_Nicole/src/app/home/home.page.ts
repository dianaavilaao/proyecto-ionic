import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Service } from '../models/servicio';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  name!: string;
  viajeEnCurso: Service | null = null; // Viaje en curso asociado al usuario

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private animationController: AnimationController,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
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

  ngAfterViewInit(): void {
    this.animacionCartas();
  }

  animacionCartas() {
    const cardOfrece = document.querySelector('.card-ofrece') as HTMLElement;
    const cardBusca = document.querySelector('.card-busca') as HTMLElement;

    if (cardOfrece && cardBusca) {
      cardOfrece.style.opacity = '0';
      cardBusca.style.opacity = '0';

      this.animationController
        .create()
        .addElement(cardOfrece)
        .duration(600)
        .fromTo('transform', 'translateX(-200px)', 'translateX(0px)')
        .fromTo('opacity', '0', '1')
        .easing('ease-out')
        .play()
        .then(() => {
          this.animationController
            .create()
            .addElement(cardBusca)
            .duration(600)
            .fromTo('transform', 'translateX(-200px)', 'translateX(0px)')
            .fromTo('opacity', '0', '1')
            .easing('ease-out')
            .play();
        });
    }
  }
  
}
