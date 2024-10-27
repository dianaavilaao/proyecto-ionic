import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProtectedComponent } from './protected.component';
import { ProtectedRoutingModule } from './protected-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProtectedRoutingModule
  ],
  declarations: [ProtectedComponent]
})
export class ProtectedModule {}