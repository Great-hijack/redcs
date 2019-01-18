import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { iUsr } from '../../interfaces/usr.interface';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { HomeLang } from '../../languages/home.lang';
import { NotificationService } from '../../services/notification.service';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  logo_url = "../../assets/imgs/logo.jpg"

  TITLE_HOME = '';
  BTNSIGNOUT = '';
  BTNCONTINUE = '';
  BTNSIGNUP = '';
  BTNLOGIN = '';

  TITLE = ['Home', 'Trang nhà'][0];
  btnSignUp = ['Sign up', 'Đăng ký'][0];
  btnLogin = ['Login', 'Đăng nhập'][0];
  btnSignOut = ['Sign out', 'Đăng xuất'][0];
  btnContinue = ['Continue', 'Tiếp tục'][0];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private localService: LocalService,
    public authService: AuthService,
    private appService: AppService,
    private langService: LangService,
    private notiService: NotificationService
  ) {

    this.initLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    if (!this.localService.BASIC_INFOS_GOT) {
      this.getData();
    } else {
      console.log('BASIC_INFOS_GOT')
    }

    // // this.authService.isUserSignedIn()
    // this.authService.checkIfUserSignIn();
    // // this.getCurrentDate();
    // this.authService.checkIfSignIn();

    // this.TITLE_HOME = this.langService.title_home;
    // this.BTNCONTINUE = this.langService.btnContinue;
    // this.BTNSIGNOUT = this.langService.btnSignOut;
    // this.BTNLOGIN = this.langService.btnLoginHome;
    // this.BTNSIGNUP = this.langService.btnSignUp;

    this.requestPermission();
  }

  // getCurrentDate(){

  //   let res = this.appService.getDateFromMilisecond(1533741954*1000);
  //   console.log(res);
  //   this.getDaysFromNow();
  // }

  // getDaysFromNow(){
  //   let days = this.appService.getArrayOfDateFromToday(7);
  //   console.log(days);
  // }

  getData() {
    this.crudService.getBasicData()
      .then(() => {
        console.log('basic info got');
        // if (res.exists) {
        //   this.localService.BASIC_INFOS = res.data();
        //   this.localService.BASIC_INFOS_GOT = true;
        //   console.log(this.localService.BASIC_INFOS);
        // }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  signUp() {
    this.navCtrl.push('AccountRegisterPage');
  }

  logIn() {
    this.navCtrl.push('AccountLoginPage');
  }

  signOut() {
    console.log('sign out');
    this.authService.signOut()
      .then((res) => {
        this.localService.USR = null;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  go2OwnPage() {
    if (this.authService.isUserSignedIn() && !this.localService.USR) {
      this.crudService.getUsrProfile(this.authService.uid)
        .then((res) => {
          let USER = <iUsr>res.data();
          this.localService.USR = USER;
          console.log(USER);
          this.go2Page(USER);
        })
    } else {
      this.go2Page(this.localService.USR);
    }
  }

  go2Page(USER) {
    console.log(USER);
    switch (USER.U_ROLE) {
      case 'MoveAbility':
        this.navCtrl.setRoot('MoveabilityAdminPage', { USER: USER })
        break;
      case 'Referral':
        this.navCtrl.setRoot('ReferralAdminPage', { USER: USER })
        break;
      case 'Referral Lead':
        this.navCtrl.setRoot('RefleadAdminPage', { USER: USER })
        break;
      case 'Service Provider':
        this.navCtrl.setRoot('SvcproAdminPage', { USER: USER })
        break;
      default:
        break;
    }
  }

  initLang() {
    let lang = new HomeLang();
    let i = this.langService.index;

    this.TITLE = lang.TITLE[i];
    this.btnSignUp = lang.btnSignUp[i];
    this.btnLogin = lang.btnLogin[i];
    this.btnSignOut = lang.btnSignOut[i];
    this.btnContinue = lang.btnContinue[i];
  }

  // just for test
  requestPermission(){
    this.notiService.requestPermission('uid1234');
  }

}
