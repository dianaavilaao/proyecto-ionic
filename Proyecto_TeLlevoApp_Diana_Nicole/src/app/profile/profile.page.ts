import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Vehiculo } from '../models/vehiculo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  usuario: User | null = null;
  vehiculos: Vehiculo[] = []; // Lista de vehículos del usuario
  nuevoVehiculo: Vehiculo = new Vehiculo('', '', '', ''); // Vehículo nuevo para agregar

  constructor(
    private navCtrl: NavController,
    private navController: NavController,
    private modalController: ModalController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  // Cargar los datos del usuario autenticado
  async cargarDatosUsuario() {
    this.usuario = await this.loginService.obtenerUsuarioAutenticado();
    if (this.usuario) {
      this.vehiculos = this.usuario.vehiculos; // Carga la lista de vehículos del usuario
    }
  }

  volver() {
    this.navController.back();
  }

  // Método para confirmar la edición del usuario
  async confirmEditModal() {
    if (this.usuario) {
      await this.loginService.actualizarUsuarioAutenticado(this.usuario);
      this.modal.dismiss(this.usuario, 'confirm');
      await this.cargarDatosUsuario(); // Recarga los datos después de actualizar
      this.navController.navigateBack('/profile');
    }
  }

  dismissEditModal() {
    this.modal.dismiss(null, 'cancel');
    this.navController.navigateBack('/profile');
  }

  // Método para agregar un nuevo vehículo
  async agregarVehicle() {
    if (this.usuario) {
      this.usuario.agregarVehiculo(this.nuevoVehiculo); // Agrega el vehículo al usuario
      await this.loginService.actualizarUsuarioAutenticado(this.usuario);
      this.nuevoVehiculo = new Vehiculo('', '', '', ''); // Reinicia el formulario
      await this.cargarDatosUsuario(); // Recarga la lista de vehículos
      this.modal.dismiss(null, 'confirm');
    }
  }

  dismissAddVehicleModal() {
    this.modal.dismiss(null, 'cancel');
    this.navController.navigateBack('/profile');
  }

  // Método para eliminar un vehículo
  async deleteVehicle(vehiculo: Vehiculo) {
    if (this.usuario) {
      this.usuario.vehiculos = this.usuario.vehiculos.filter(v => v !== vehiculo);
      await this.loginService.actualizarUsuarioAutenticado(this.usuario);
      await this.cargarDatosUsuario(); // Recarga la lista de vehículos
    }
  }
}
