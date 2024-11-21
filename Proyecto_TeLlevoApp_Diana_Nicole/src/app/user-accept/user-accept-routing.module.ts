import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAcceptPage } from './user-accept.page';

const routes: Routes = [
  {
    path: '',
    component: UserAcceptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAcceptPageRoutingModule {}
