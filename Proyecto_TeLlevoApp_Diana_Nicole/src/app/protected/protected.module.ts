import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedPage } from '..app/protected/protected.page'; 

@NgModule({
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ],
  declarations: [ProtectedPage] 
})
export class ProtectedPageModule { }

