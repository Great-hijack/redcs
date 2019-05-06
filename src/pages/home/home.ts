import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { iUser } from '../../interfaces/user.interface';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { NotificationService } from '../../services/notification.service';
import { MailService } from '../../services/mail.service';
import { Storage } from '@ionic/storage';
import { iPatient } from '../../interfaces/patient.interface';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Home', VI: 'Trang chủ' },
    btnSignUp: { EN: 'Sign up', VI: 'Đăng ký' },
    btnLogin: { EN: 'Login', VI: 'Đăng nhập' },
    btnSignOut: { EN: 'Sign out', VI: 'Đăng xuất' },
    btnContinue: { EN: 'Continue', VI: 'Tiếp tục' },
  };
  pageId = 'HomePage';
  logo_url = "../../assets/imgs/logo.jpg"

  // TITLE_HOME = '';
  // BTNSIGNOUT = '';
  // BTNCONTINUE = '';
  // BTNSIGNUP = '';
  // BTNLOGIN = '';

  // TITLE = ['Home', 'Trang nhà'][0];
  // btnSignUp = ['Sign up', 'Đăng ký'][0];
  // btnLogin = ['Login', 'Đăng nhập'][0];
  // btnSignOut = ['Sign out', 'Đăng xuất'][0];
  // btnContinue = ['Continue', 'Tiếp tục'][0];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private localService: LocalService,
    public authService: AuthService,
    private appService: AppService,
    private langService: LangService,
    private notiService: NotificationService,
    private mailService: MailService,
    private storage: Storage
  ) {

    // this.initLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    if (!this.localService.BASIC_INFOS_GOT) {
      this.getData();
    } else {
      console.log('BASIC_INFOS_GOT')
    }

    this.storage.get('LANG').then(res => {
      console.log(res);
      if (res) {
        this.langService.LANG = res;
        this.LANG = res;
      } else {
        this.langService.LANG = 'EN';
        this.LANG = 'EN';
      }
    }).catch(err => {
      console.log(err);
    })

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
    // let sub = this.mailService.sendEmail2NotifyCaseSubmitted('tho@enablecode.vn')
    //   // this.mailService.sendEmail()
    //   .subscribe((res) => {
    //     console.log(res);
    //     sub.unsubscribe();
    //   })
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);
    } else {
      // this.navCtrl.setRoot('HomePage');
    }

    // this.getNewString();

    // this.updateDateforPatients();
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
        this.localService.USER = null;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  go2OwnPage() {
    if (this.authService.isUserSignedIn() && !this.localService.USER) {
      this.crudService.getUserProfile(this.authService.uid)
        .then((res) => {
          let USER = <iUser>res.data();
          this.localService.USER = USER;
          console.log(USER);
          this.go2Page(USER);
        })
    } else {
      this.go2Page(this.localService.USER);
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

  // initLang() {
  //   let lang = new HomeLang();
  //   let i = this.langService.index;

  //   this.TITLE = lang.TITLE[i];
  //   this.btnSignUp = lang.btnSignUp[i];
  //   this.btnLogin = lang.btnLogin[i];
  //   this.btnSignOut = lang.btnSignOut[i];
  //   this.btnContinue = lang.btnContinue[i];
  // }

  // just for test
  requestPermission() {
    // this.notiService.requestPermission('uid1234');
  }

  //just for test
  getNewString() {
    this.appService.convertNumber2CurrenyFormat('10000000000', 'VND');
  }

  // just for update date for each state
  updateDateforPatients(){
    this.crudService.patientGetAlls().then(qSnap=>{
      qSnap.forEach(doc=>{
        let PAT = <iPatient>doc.data();
        console.log(PAT);
        PAT['PAT_DRAFT'] = '0000-00-00';
        PAT['PAT_DENIED'] = '0000-00-00';
        PAT['PAT_ACCEPTED'] = '0000-00-00';
        PAT['PAT_REJECTED'] = '0000-00-00';
        PAT['PAT_SUBMITTED'] = '0000-00-00';
        PAT['PAT_APPROVED'] = '0000-00-00';
        PAT['PAT_INVITED'] = '0000-00-00';
        PAT['PAT_UNDERTREATMENT'] = '0000-00-00';
        PAT['PAT_PAYMENTREQUEST'] = '0000-00-00';
        PAT['PAT_PAYMENTAPPROVED'] = '0000-00-00';
        PAT['PAT_PAID'] = '0000-00-00';
        PAT['PAT_CLOSED'] = '0000-00-00';

        doc.ref.update(PAT);
      })
    
    })
  }



}
