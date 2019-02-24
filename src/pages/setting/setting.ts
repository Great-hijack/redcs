import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
// import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { LangService } from '../../services/lang.service';
import { iUsr } from '../../interfaces/usr.interface';
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  isSigned;
  USER: iUsr = null;
  USER_ID: string;
  isAdminOfApp: boolean = false;
  Languages = [
    { SHORTNAME: 'EN', LONGNAME: "English", CODE: 0 },
    { SHORTNAME: 'VI', LONGNAME: "Tiếng Việt", CODE: 1 }
  ]
  Language = this.Languages[0];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private langService: LangService
  ) {
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
    this.USER = this.localService.USR;
    let index = this.langService.index;
    this.Language = this.Languages[index];
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

  selectLanguage(Lang) {
    console.log(Lang);
    this.langService.setLanguage(Lang.CODE, Lang.SHORTNAME);
    // this.navCtrl.setRoot('HomePage');
  }



}
