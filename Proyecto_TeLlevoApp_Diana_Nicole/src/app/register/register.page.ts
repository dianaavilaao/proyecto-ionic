import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario: User = new User('', '', '', '', '');

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private loginService: LoginService
  ) {}

  volver() {
    this.navCtrl.back();
  }

  async register() {
    // Verifica que todos los campos sean válidos
    if (this.usuario.usuario && this.usuario.email && this.usuario.telefono && this.usuario.contrasena && this.usuario.sede) {
      try {
        // Intenta registrar el usuario a través del LoginService
        const error = await this.loginService.registrarUsuario(this.usuario);
        if (error) {
          // Muestra el mensaje de error si el registro falla
          await this.mostrarToast(error, 'danger');
        } else {
          // Muestra un mensaje de éxito
          await this.mostrarToast('Usuario registrado con éxito.', 'success');

          // Redirige a la página de login
          this.navCtrl.navigateRoot('/login');
        }
      } catch (error) {
        // Maneja el error en caso de fallo al guardar los datos
        await this.mostrarToast('Error al guardar los datos. Inténtelo nuevamente.', 'danger');
      }
    } else {
      // Muestra un mensaje de error si faltan campos
      await this.mostrarToast('Por favor, completa todos los campos.', 'danger');
    }
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    await toast.present();
  }
}
