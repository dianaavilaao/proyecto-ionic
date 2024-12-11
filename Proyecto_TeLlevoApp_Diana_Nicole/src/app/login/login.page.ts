import { Component } from '@angular/core';
import { NavController, ToastController,AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  usuario!: string;
  contrasena!: string;
  private isBackNavigation: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private animationController: AnimationController,
    private storage: Storage,
    private loginService: LoginService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.initStorage();
  }

  ngOnInit() {
    // Detecta si la navegación hacia esta página es una acción de "hacia atrás"
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica si la URL actual es '/login'
        if (event.url === '/login' && window.history.state.navigationId > 1) {
          this.isBackNavigation = true;
        }
      }
    });
  }


  // Inicializa el almacenamiento
  async initStorage() {
    await this.storage.create();
  }

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

  async ionViewWillEnter() {
    if (this.isBackNavigation) {
      console.log('ionViewWillEnter triggered due to back navigation');
      const confirm = await this.showLogoutConfirmation();
    }
  }

  async showLogoutConfirmation(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Quieres cerrar sesión al volver al login?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.navCtrl.navigateBack('/home'); 
              resolve(false); 
            },
          },
          {
            text: 'Sí, cerrar sesión',
            handler: () => resolve(true), 
          },
        ],
      });
      await alert.present();
    });
  }
  

}
