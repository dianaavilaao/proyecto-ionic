import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  usuario!: string;
  contrasena!: string;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private animationController: AnimationController,
    private storage: Storage
  ) {
    this.initStorage();
  }

  // Inicializa el almacenamiento
  async initStorage() {
    await this.storage.create();
  }

  async login() {
    // Verifica que los campos no estén vacíos
    if (this.usuario && this.contrasena) {
      // Recupera los usuarios guardados desde el almacenamiento
      const usuariosGuardados: User[] = (await this.storage.get('usuarios')) || [];

      // Busca un usuario que coincida con el nombre de usuario o email y la contraseña
      const usuarioEncontrado = usuariosGuardados.find(
        u => (u.usuario === this.usuario || u.email === this.usuario) && u.contrasena === this.contrasena
      );

      if (usuarioEncontrado) {
        // Usuario autenticado correctamente
        await this.mostrarMensajeToast('Login exitoso', 'success');

        // Puedes guardar el usuario autenticado en el almacenamiento si es necesario
        await this.storage.set('usuarioAutenticado', usuarioEncontrado);

        // Navega a la página principal
        this.navCtrl.navigateForward('/home', { queryParams: { name: usuarioEncontrado.usuario } });
      } else {
        // Si no se encontró el usuario, muestra un mensaje de error
        await this.mostrarMensajeToast('Login erróneo. Verifica tus credenciales.', 'danger');
      }
    } else {
      // Muestra un mensaje de error si faltan campos
      await this.mostrarMensajeToast('Por favor, completa todos los campos.', 'danger');
    }
  }

  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }

  async mostrarMensajeToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      duration: 3000,
      message: mensaje,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  ngAfterViewInit(): void {
    this.animacionLogo();
  }

  animacionLogo() {
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
      this.animationController
        .create()
        .addElement(logoElement)
        .duration(1000)
        .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
        .fromTo('opacity', '0', '1')
        .play();
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
