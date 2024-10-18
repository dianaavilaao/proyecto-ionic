import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-offer-services',
  templateUrl: './offer-services.page.html',
  styleUrls: ['./offer-services.page.scss'],
})
export class OfferServicesPage implements OnInit {
  
  @ViewChild(IonModal) modal!: IonModal;
  selectedValue: number = 5;
  name!: string;

  constructor(
    private navController: NavController,
    
  ) {
    
   }

  ngOnInit() {
  }


  volver() {
    this.navController.back();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }


}
