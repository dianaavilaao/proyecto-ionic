import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario!: string;
  contrasena!: string;

  /*Decidimos usar NavController para la navegación entre
  vistas porque consideramos que es mas corto y facil de usar*/
  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private toastController: ToastController
  ) {}



  async login() {
    if (this.loginService.validarLogin(this.usuario, this.contrasena)) {
      this.mostrarMensajeToast('Login exitoso', 'success')
      this.navCtrl.navigateForward('/home', { queryParams: { name: this.usuario } });
    }else{
    this.mostrarMensajeToast('Login erroneo', 'danger')
    }
  }


  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }

  async mostrarMensajeToast(mensaje: string, color: string){
    const toast = await this.toastController.create({
      duration: 3000,
      message: mensaje,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

}
