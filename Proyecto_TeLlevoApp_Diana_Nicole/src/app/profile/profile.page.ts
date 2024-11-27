import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Vehiculo } from '../models/vehiculo';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  usuario: User | null = null;
  vehiculos: Vehiculo[] = []; // Lista de vehículos del usuario
  nuevoVehiculo: Vehiculo = new Vehiculo('', '', '', '',4,0); // Vehículo nuevo para agregar
  vehiculo: Vehiculo | null = null;
  editingVehicle: Vehiculo = new Vehiculo('', '', '', '',4,0);

  constructor(
    private navCtrl: NavController,
    private navController: NavController,
    private modalController: ModalController,
    private loginService: LoginService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    this.cargarDatosUsuario();
    this.usuario = await this.loginService.obtenerUsuarioAutenticado();
    if (this.usuario) {
      this.vehiculo = await this.loginService.obtenerVehiculoUsuario(this.usuario.usuario);
      //if (this.vehiculo) {
        //this.editingVehicle = { ...this.vehiculo };
      //}
    }
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
    const alert = await this.alertController.create({
      header: 'Confirmar cambios',
      message: '¿Estás seguro de que quieres guardar los cambios en tu perfil?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: async () => {
            if (this.usuario) {
              await this.loginService.actualizarUsuarioAutenticado(this.usuario);
              this.modal.dismiss(this.usuario, 'confirm');
              await this.cargarDatosUsuario(); 
              this.navController.navigateBack('/profile');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  dismissEditModal() {
    this.modal.dismiss(null, 'cancel');
  }

  async agregarVehicle() {
    if (this.usuario) {
      await this.loginService.guardarVehiculo(this.usuario.usuario, this.nuevoVehiculo);
      this.vehiculo = this.nuevoVehiculo;
      this.dismissAddVehicleModal();
      // Recargar datos
      await this.ngOnInit();
    }
  }

  async deleteVehicle() {
    const alert = await this.alertController.create({
      header: 'Eliminar vehículo',
      message: '¿Estás seguro de que quieres eliminar este vehículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            if (this.usuario) {
              await this.loginService.eliminarVehiculo(this.usuario.usuario);
              this.vehiculo = null;
              // Recargar datos
              await this.ngOnInit();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  dismissAddVehicleModal() {
    this.modal.dismiss(null, 'cancel');
    this.navController.navigateBack('/profile');
  }


  async editVehicle() {
    if (this.usuario && this.editingVehicle) {
      await this.loginService.editarVehiculo(this.usuario.usuario, this.editingVehicle);
      this.vehiculo = this.editingVehicle;
      this.dismissEditVehicleModal();
      await this.ngOnInit();
    }
  }

  dismissEditVehicleModal() {
    this.modal.dismiss(null, 'cancel');
  }



}
