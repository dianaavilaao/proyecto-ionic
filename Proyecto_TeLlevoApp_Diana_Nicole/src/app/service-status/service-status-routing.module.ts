import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceStatusPage } from './service-status.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceStatusPageRoutingModule {}
