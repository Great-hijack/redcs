import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';

import firebase from 'firebase/app';
import 'firebase/auth'

@IonicPage()
@Component({
  selector: 'page-account-login',
  templateUrl: 'account-login.html',
})
export class AccountLoginPage {
  ACCOUNT = {
    email: '',
    password: ''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingService: LoadingService,
    private authService: AuthService,
    private appService: AppService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountLoginPage');
  }

  doCancel() {
    this.navCtrl.pop();
  }

  doSignIn() {
    console.log(this.ACCOUNT);
    // console.log(form.value);
    this.loadingService.startLoading();
    this.authService.signIn(this.ACCOUNT.email, this.ACCOUNT.password)
      .then((res) => {
        console.log(res);
        // this.navCtrl.setRoot('HomePage');
        return this.authService.checkIfUserSignIn()
      })
      .then((res) => {
        console.log(res);
        this.navCtrl.pop();
        this.loadingService.hideLoading();
      })
      .catch((err) => {
        console.log('Error when loggin');
        this.loadingService.hideLoading();
        this.appService.alertError('Error', err.message)
      })
  }

  doSignIn1() {
    firebase.auth().signInWithEmailAndPassword(this.ACCOUNT.email, this.ACCOUNT.password)
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }


}
