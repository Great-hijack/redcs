import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocalService } from '../services/local.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from '../services/auth.service';
import { iUser } from '../interfaces/user.interface';
import { LangService } from '../services/lang.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    HomePage: { EN: 'Home', VI: 'Trang nhà' },
    SettingPage: { EN: 'Setting', VI: 'Cài đặt' },
    AboutPage: { EN: 'About', VI: 'Về chúng tôi' },
    UserManagePage: { EN: 'User Manager', VI: 'Quản lý người dùng' },
    ConfigPage: { EN: 'Admin Configuration', VI: 'Cấu hình' },
  };
  pageId = 'MyApp';
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<{ title: string, component: string, icon: string }>;
  pages1: Array<{ title: string, component: string, icon: string }>;
  pages2: Array<{ title: string, component: string, icon: string }>;
  pages3: Array<{ title: string, component: string, icon: string }>;
  USER: iUser = null;
  isAdminOfApp: boolean = false;
  USER_ID: string;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private localService: LocalService,
    private authService: AuthService,
    private langService: LangService
  ) {
    this.initializeApp();
    this.initListOfSideMenu();


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initListOfSideMenu() {
    this.pages = [
      { title: this.LANGUAGES.HomePage[this.LANG], component: 'HomePage', icon: 'home' },
      { title: this.LANGUAGES.SettingPage[this.LANG], component: 'SettingPage', icon: 'cog' },
      { title: this.LANGUAGES.AboutPage[this.LANG], component: 'AboutPage', icon: 'information-circle' },
    ];
    // 
    this.pages1 = [
    ];
    // page for referal
    this.pages2 = [
    ];

    // page for admin
    this.pages3 = [
      { title: this.LANGUAGES.UserManagePage[this.LANG], component: 'UserManagePage', icon: 'man' },
      { title: this.LANGUAGES.ConfigPage[this.LANG], component: 'ConfigPage', icon: 'cog' },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, { USER: this.USER, ROLE: 'USER' });
  }

  openPage1(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component, { USER: this.USER, ROLE: 'USER'  });
  }

  openPage2(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component, { USER: this.USER, ROLE: 'GUIDE'  });
  }

  openPage3(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, { USER: this.USER, ROLE: 'ADMIN' });
  }

  /**
   * menu open, ktra user login or not, 
   * ktra Admin of App or not
   * get UserInfo, Neu USER co la admin cua Shop, thi tag Admin se hien thi
   * 
   */
  ionOpen() {
    console.log('Menu is opened')
    this.LANG = this.langService.LANG;
    this.getLANGUAGESupdated();
    this.initListOfSideMenu();

    this.localService.USER_ID = firebase.auth().currentUser !== null ? firebase.auth().currentUser.uid : null;
    this.USER_ID = this.localService.USER_ID;
    console.log(this.localService.USER_ID, this.USER_ID);
    if (this.localService.USER_ID) {
      this.checkIfUserAdminOfApp(this.localService.USER_ID);
      this.getUserInfo(this.localService.USER_ID);
    } else {
      this.isAdminOfApp = false;
      this.USER = null;
    }
  }

  getLANGUAGESupdated(){
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);
    }
  }

  checkIfUserAdminOfApp(USER_ID) {
    if (!this.localService.isAdminOfAppChecked) {
      firebase.firestore().doc('ADM_OF_APP/' + USER_ID).get()
        .then((docSnap) => {
          this.localService.isAdminOfAppChecked = true;
          if (docSnap.exists) {
            this.isAdminOfApp = true;
            this.localService.isAdminOfApp = true;
          } else {
            this.isAdminOfApp = false;
            this.localService.isAdminOfApp = false;
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      console.log('isAdminOfAppChecked = true')
      this.isAdminOfApp = this.localService.isAdminOfApp;
    }
  }

  getUserInfo(USER_ID) {
    if (!this.localService.isUserInfoGot) {
      firebase.firestore().doc('USERS/' + USER_ID).get()
        .then((docRef) => {
          this.localService.isUserInfoGot = true;
          if (docRef.exists) {
            this.USER = <iUser>docRef.data();
            this.localService.USER = this.USER;
            console.log(this.USER);
          }
        })
    } else {
      console.log('isUserInfoGot = true')
      this.USER = this.localService.USER;
    }
  }

  go2ProfilePage() {
    this.nav.setRoot('ProfilePage', { USER: this.USER, action: 'edited-by-owner', USER_ID: this.USER.U_ID });
  }
}
