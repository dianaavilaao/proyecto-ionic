import { Component, NgModule, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-offer-services',
  templateUrl: './offer-services.page.html',
  styleUrls: ['./offer-services.page.scss'],
})
export class OfferServicesPage implements OnInit {

  selectedValue: number = 5;

  constructor(
    private navController: NavController,

  ) {
    
   }

  ngOnInit() {
  }


  volver() {
    this.navController.back();
  }
}
