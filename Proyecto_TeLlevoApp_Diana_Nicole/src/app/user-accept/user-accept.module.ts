import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAcceptPageRoutingModule } from './user-accept-routing.module';

import { UserAcceptPage } from './user-accept.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAcceptPageRoutingModule
  ],
  declarations: [UserAcceptPage]
})
export class UserAcceptPageModule {}
