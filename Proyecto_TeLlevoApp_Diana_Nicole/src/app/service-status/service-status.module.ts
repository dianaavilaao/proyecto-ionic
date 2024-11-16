import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceStatusPageRoutingModule } from './service-status-routing.module';

import { ServiceStatusPage } from './service-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceStatusPageRoutingModule
  ],
  declarations: [ServiceStatusPage]
})
export class ServiceStatusPageModule {}
