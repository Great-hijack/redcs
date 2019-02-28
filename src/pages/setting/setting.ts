import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
// import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { LangService } from '../../services/lang.service';
import { iUser } from '../../interfaces/user.interface';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE : { EN: 'SETTING', VI : 'Cài đặt'},
    lbAccount : { EN: 'ACCOUNT', VI : 'Tài khoản'},
    lbResetAccount : { EN: 'Reset Account', VI : 'Làm mới Tài khoản'},
    lbLanguages : { EN: 'Languages', VI : 'Ngôn ngữ'},
    lbSignOut : { EN: 'Sign Out', VI : 'Đăng xuất'},
    lbUpdateProfile : { EN: 'Update Profile', VI : 'Cập nhật thông tin cá nhân'},
  };
  pageId = 'SettingPage';

  isSigned;
  USER: iUser = null;
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
    private langService: LangService,
    private storage: Storage
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
    this.USER = this.localService.USER;
    let index = this.langService.index;
    this.Language = this.Languages[index];
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }
  convertArray2Object() {
    let LANGUAGES: any[] = this.localService.BASIC_INFOS.LANGUAGES[this.pageId];
    let OBJ: any = {}
    LANGUAGES.forEach(L => {
      OBJ[L.KEY] = L
    })
    console.log(OBJ);
    return OBJ;
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
    this.storage.set('LANG', Lang.SHORTNAME).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
    // this.navCtrl.setRoot('HomePage');
  }



}
