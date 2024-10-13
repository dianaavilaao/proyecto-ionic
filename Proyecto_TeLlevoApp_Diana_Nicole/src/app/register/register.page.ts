import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(private navCtrl: NavController, private toastController: ToastController) { }

  volver() {
    this.navCtrl.back();
  }
}
