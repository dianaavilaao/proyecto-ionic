import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';  

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  usuario!: string;  
  nuevaContrasena!: string;  
  mostrarCampoContrasena: boolean = false;  

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private loginService: LoginService,
    private navController: NavController,
  ) {}

  verificarUsuario() {
    const usuarioEncontrado = this.loginService.buscarUsuario(this.usuario);

    if (usuarioEncontrado) {
      this.presentToast('Usuario encontrado. Ingresa una nueva contraseña.', 'success');
      this.mostrarCampoContrasena = true;  
    } else {
      this.presentToast('Error: Usuario no encontrado', 'danger');
      this.mostrarCampoContrasena = false;  
    }
  }

  actualizarContrasena() {
    if (this.nuevaContrasena) {
      const exito = this.loginService.actualizarContrasena(this.usuario, this.nuevaContrasena);
      if (exito) {
        this.presentToast('Contraseña actualizada con éxito', 'success');
        this.navCtrl.navigateBack('/login');  
      } else {
        this.presentToast('Error al actualizar la contraseña', 'danger');
      }
    } else {
      this.presentToast('Por favor ingresa una nueva contraseña', 'warning');
    }
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  volver() {
    this.navController.back();
  }
}
