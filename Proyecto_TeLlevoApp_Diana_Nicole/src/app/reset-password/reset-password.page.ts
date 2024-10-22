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

  // Función para verificar si el usuario existe
  async verificarUsuario() {
    const usuarioEncontrado = await this.loginService.buscarUsuario(this.usuario); // Usamos await

    if (usuarioEncontrado) {
      this.presentToast('Usuario encontrado. Ingresa una nueva contraseña.', 'success');
      this.mostrarCampoContrasena = true;  // Mostrar campo de nueva contraseña
    } else {
      this.presentToast('Error: Usuario no encontrado', 'danger');
      this.mostrarCampoContrasena = false;  // Ocultar campo de nueva contraseña
    }
  }

  // Función para actualizar la contraseña del usuario
  async actualizarContrasena() {
    if (this.nuevaContrasena) {
      const exito = await this.loginService.actualizarContrasena(this.usuario, this.nuevaContrasena); // Usamos await
      if (exito) {
        this.presentToast('Contraseña actualizada con éxito', 'success');
        this.navCtrl.navigateBack('/login');  // Navegar de regreso a la página de login
      } else {
        this.presentToast('Error al actualizar la contraseña', 'danger');
      }
    } else {
      this.presentToast('Por favor ingresa una nueva contraseña', 'warning');
    }
  }

  // Mostrar mensajes de feedback con un Toast
  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  // Función para volver a la página anterior
  volver() {
    this.navController.back();
  }
}
