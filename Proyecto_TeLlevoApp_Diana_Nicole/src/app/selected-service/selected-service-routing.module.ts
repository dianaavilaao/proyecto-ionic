import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedServicePage } from './selected-service.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedServicePageRoutingModule {}
