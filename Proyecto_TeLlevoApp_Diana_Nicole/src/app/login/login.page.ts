import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username!: string;
  password!: string;

  constructor(private navCtrl: NavController) {}

  login() {
    if (this.username && this.password) {
      this.navCtrl.navigateForward('/home', { queryParams: { name: this.username } });
    }
  }

  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }
}
