import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import {ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})


export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  usuario: any = {};
  constructor(
    private navCtrl: NavController,
    private navController: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  volver() {
    this.navController.back();
  }

  confirmEditModal() {
    this.modal.dismiss(this.usuario, 'confirm'); 
    this.navController.navigateBack('/profile'); 
  }

  dismissEditModal() {
    this.modal.dismiss(null, 'cancel'); 
    this.navController.navigateBack('/profile'); 
  }

  dismissAddVehicleModal(){
    this.modal.dismiss(null, 'cancel'); 
    this.navController.navigateBack('/profile'); 
  }



}

