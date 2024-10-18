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

  vehiculo: any = {
    marca: '',
    modelo: '',
    patente: '',
    color: ''
  };

  constructor(private navController: NavController) {}

  ngOnInit() {}

  volver() {
    this.navController.back();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.navController.navigateBack('/offer-services'); 
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.navController.navigateBack('/offer-services'); 
  }

  cancelEdit() {
    this.modal.dismiss(null, 'cancel');
    this.navController.navigateBack('/offer-services'); 
  }

  dismissEditModal() {
    this.modal.dismiss(null, 'cancel');
    this.navController.navigateBack('/offer-services'); 
  }

  confirmEditModal() {
    this.modal.dismiss(this.vehiculo, 'confirm');
    this.navController.navigateBack('/offer-services'); 
  }

  // Nueva función para agregar vehículo QUE!!?¡?!?!?
  addVehicle() {
    // Aquí puedes agregar la lógica para almacenar el nuevo vehículo
    // Ejemplo: guardarlo en una base de datos o en el almacenamiento local
    this.modal.dismiss(this.vehiculo, 'confirm');
    this.navController.navigateBack('/offer-services'); // Navega de vuelta
  }

}
