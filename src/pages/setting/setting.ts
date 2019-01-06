import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iSetting } from '../../interfaces/setting.interface';
import { LocalService } from '../../services/local.service';
// import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { iUser } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  mySettings: iSetting;
  isSigned;
  USER: iUser = null;
  USER_ID: string;
  isAdminOfApp: boolean = false;
  Languages = [
    {LANG: 'EN', CODE: '0'},
    {LANG: 'VI', CODE: '1'}
  ]
  Language = this.Languages[0];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.mySettings = this.localService.SETTING_DEFAULT;
    if (firebase.auth().currentUser) {
      this.isSigned = true;
      this.USER_ID = firebase.auth().currentUser.uid;
      console.log(this.USER_ID);
    } else {
      this.isSigned = false;
      console.log('not signed')
    }
    console.log(this.isSigned);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    this.USER = this.localService.USER;
  }

  go2AccountPage(action: string) {
    this.navCtrl.push('AccountPage', { action: action })
  }

  onSignOut() {
    this.loadingService.startLoading();
    this.authService.signOut().then(() => {
      console.log('user logged out!');
      this.localService.doUserLogout();
      setTimeout(() => {
        this.navCtrl.setRoot('HomePage');
        this.loadingService.hideLoading();
      }, 1000);
    })
      .catch((err) => {
        console.log(err);
        this.loadingService.hideLoading();

      })


  }

  go2ProfilePage() {
    console.log('edit profile page');
    this.navCtrl.push('ProfilePage', { action: 'edited-by-owner', USER_ID: this.USER_ID });
  }

  go2FavoriteViewPage() {
    this.navCtrl.push('FavoriteViewPage');
  }

  go2BookingHistory() {
    this.navCtrl.push('BookingHistoryPage', { USER_ID: this.USER_ID, USER: this.USER });
  }

  selectLanguage(Lang){
    console.log(Lang);
  }



}
