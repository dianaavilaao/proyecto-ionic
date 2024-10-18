import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferServicesPage } from './offer-services.page';

const routes: Routes = [
  {
    path: '',
    component: OfferServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferServicesPageRoutingModule {}
