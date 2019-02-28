import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { AccountLoginLang } from '../../languages/account-login.lang'
import firebase from 'firebase/app';
import 'firebase/auth'
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-account-login',
  templateUrl: 'account-login.html',
})
export class AccountLoginPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE : { EN: 'Account Login', VI : 'Đăng nhập'},
    btnCancel : { EN: 'Cancel', VI : 'Huỷ'},
    btnLogin : { EN: 'Login', VI : 'Đăng nhập'},
    placeholderUsername : { EN: 'Username', VI : 'Tên đăng nhập'},
    placeholderPassword : { EN: 'Password', VI : 'Mật khẩu'},
  };
  pageId = 'AccountLoginPage';

  ACCOUNT = {
    email: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingService: LoadingService,
    private authService: AuthService,
    private appService: AppService,
    private langService: LangService,
    private localService: LocalService

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountLoginPage');
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
        return this.authService.checkIfSignInx()
      })
      .then((res) => {
        console.log(res);
        if (this.navCtrl.swipeBackEnabled) {
          this.navCtrl.pop();
        } else {
          this.navCtrl.setRoot('HomePage');
        }
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
