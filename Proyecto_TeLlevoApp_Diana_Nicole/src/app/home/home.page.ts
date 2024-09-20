import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  name!: string;

  constructor(
    private route: ActivatedRoute,
    private animationController: AnimationController,
    private navController: NavController,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
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

  volver() {
    this.navController.back();
  }

}