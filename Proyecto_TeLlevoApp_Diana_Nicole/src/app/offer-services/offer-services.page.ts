import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { User } from '../models/user';
import { Vehiculo } from '../models/vehiculo';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-offer-services',
  templateUrl: './offer-services.page.html',
  styleUrls: ['./offer-services.page.scss'],
})
export class OfferServicesPage implements OnInit {

  usuario: User | null = null;
  vehiculo: Vehiculo | null = null;
  selectedValue: number = 5;
  sedeSeleccionada: string = '';
  distanciaMaxima: number = 0;

  nuevoVehiculo: Vehiculo = {
    marca: '',
    modelo: '',
    patente: '',
    color: ''
  };

  @ViewChild(IonModal) modal!: IonModal;
  name!: string;

  constructor(
    private navController: NavController,
    private loginService: LoginService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.usuario = await this.loginService.obtenerUsuarioAutenticado();
    if (this.usuario) {
      this.vehiculo = await this.loginService.obtenerVehiculoUsuario(this.usuario.usuario);
    }
  }

  
  volver() {
    this.navController.back();
  }

  //cancel() {
   // this.modal.dismiss(null, 'cancel');
    //this.navController.navigateBack('/offer-services'); 
  //}
  // Funciones para el modal
  cancel() {
    // Limpiar el formulario
    this.nuevoVehiculo = {
      marca: '',
      modelo: '',
      patente: '',
      color: ''
    };
    return this.modalController.dismiss(null, 'cancel');
  }

  //confirm() {
    //this.modal.dismiss(this.name, 'confirm');
    //this.navController.navigateBack('/offer-services'); 
  //}

  async confirm() {
    // Validar que todos los campos estén completos
    if (!this.nuevoVehiculo.marca || !this.nuevoVehiculo.modelo || 
        !this.nuevoVehiculo.patente || !this.nuevoVehiculo.color) {
      // Aquí podrías mostrar un mensaje de error
      return;
    }

    if (this.usuario) {
      // Crear nuevo vehículo
      const vehiculo = new Vehiculo(
        this.nuevoVehiculo.marca,
        this.nuevoVehiculo.modelo,
        this.nuevoVehiculo.patente,
        this.nuevoVehiculo.color
      );

      // Guardar el vehículo
      await this.loginService.guardarVehiculo(this.usuario.usuario, vehiculo);
      
      // Actualizar el vehículo en la vista
      this.vehiculo = vehiculo;
      
      // Limpiar el formulario
      this.nuevoVehiculo = {
        marca: '',
        modelo: '',
        patente: '',
        color: ''
      };

      // Cerrar el modal
      await this.modalController.dismiss(vehiculo, 'confirm');
    }
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

  async agregarVehiculo(vehiculo: Vehiculo) {
    if (this.usuario) {
      await this.loginService.guardarVehiculo(this.usuario.usuario, vehiculo);
      this.vehiculo = vehiculo;
      this.cancel();
      // Recargar datos
      await this.ngOnInit();
    }
  }

  async editarVehiculo(vehiculo: Vehiculo) {
    if (this.usuario) {
      await this.loginService.guardarVehiculo(this.usuario.usuario, vehiculo);
      this.vehiculo = vehiculo;
      this.cancelEdit();
      // Recargar datos
      await this.ngOnInit();
    }
  }


}


