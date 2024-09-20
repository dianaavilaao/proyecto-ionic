import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';
import { AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit{
  usuario!: string;
  contrasena!: string;

  /*Decidimos usar NavController para la navegación entre
  vistas porque consideramos que es mas corto y facil de usar*/
  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private toastController: ToastController,
    private animationController: AnimationController
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

}
