import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

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
    private storage: Storage,
    private loginService: LoginService
  ) {
    this.initStorage();
  }

  // Inicializa el almacenamiento
  async initStorage() {
    await this.storage.create();
  }

// login.ts
async login() {
  if (this.usuario && this.contrasena) {
    // Utiliza el servicio de login para autenticar
    const usuarioEncontrado = await this.loginService.autenticarUsuario(this.usuario, this.contrasena);

    if (usuarioEncontrado) {
      await this.mostrarMensajeToast('Login exitoso', 'success');
      await this.storage.set('usuarioAutenticado', usuarioEncontrado);
      this.navCtrl.navigateForward('/home', { queryParams: { name: usuarioEncontrado.usuario } });
    } else {
      await this.mostrarMensajeToast('Login erróneo. Verifica tus credenciales.', 'danger');
    }
  } else {
    await this.mostrarMensajeToast('Por favor, completa todos los campos.', 'danger');
  }
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

  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }
}
