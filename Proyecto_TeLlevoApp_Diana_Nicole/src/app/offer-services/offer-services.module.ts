import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferServicesPageRoutingModule } from './offer-services-routing.module';

import { OfferServicesPage } from './offer-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferServicesPageRoutingModule
  ],
  declarations: [OfferServicesPage]
})
export class OfferServicesPageModule {}
