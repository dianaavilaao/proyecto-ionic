import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario: User = new User('', '', '', '', ''); // Instancia inicial de Usuario

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.initStorage();
  }

  // Inicializa el almacenamiento
  async initStorage() {
    await this.storage.create();
  }

  volver() {
    this.navCtrl.back();
  }

  async register() {
    // Verifica que todos los campos sean válidos
    if (this.usuario.usuario && this.usuario.email && this.usuario.telefono && this.usuario.contrasena && this.usuario.sede) {
      try {
        // Recupera los usuarios existentes en el almacenamiento
        const usuariosGuardados: User[] = (await this.storage.get('usuarios')) || [];

        // Verifica si el nombre de usuario, email o teléfono ya existen
        const usuarioExistente = usuariosGuardados.find(u => u.usuario === this.usuario.usuario);
        const emailExistente = usuariosGuardados.find(u => u.email === this.usuario.email);
        const telefonoExistente = usuariosGuardados.find(u => u.telefono === this.usuario.telefono);

        if (usuarioExistente) {
          // Muestra un mensaje de error si el nombre de usuario ya existe
          await this.mostrarToast('El nombre de usuario ya está registrado.', 'danger');
          return;
        }

        if (emailExistente) {
          // Muestra un mensaje de error si el email ya está registrado
          await this.mostrarToast('El email ya está registrado.', 'danger');
          return;
        }

        if (telefonoExistente) {
          // Muestra un mensaje de error si el teléfono ya está registrado
          await this.mostrarToast('El teléfono ya está registrado.', 'danger');
          return;
        }

        // Si no existen conflictos, agrega el nuevo usuario a la lista
        usuariosGuardados.push(this.usuario);

        // Guarda la lista actualizada en el almacenamiento
        await this.storage.set('usuarios', usuariosGuardados);

        // Muestra un mensaje de éxito
        await this.mostrarToast('Usuario registrado con éxito.', 'success');

        // Redirige a la página principal o a la página de inicio de sesión
        this.navCtrl.navigateRoot('/login');
      } catch (error) {
        // Maneja el error en caso de fallo al guardar los datos
        await this.mostrarToast('Error al guardar los datos. Inténtelo nuevamente.', 'danger');
      }
    } else {
      // Muestra un mensaje de error si faltan campos
      await this.mostrarToast('Por favor, completa todos los campos.', 'danger');
    }
  }

  // Método para mostrar mensajes de Toast
  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    await toast.present();
  }

  //async ionViewDidEnter() {
    //const usuarioGuardado = await this.storage.get('usuario');
    //if (usuarioGuardado) {
      //this.usuario = usuarioGuardado;
    //}
  //}
}
