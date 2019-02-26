import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { iUser } from '../../interfaces/user.interface';
import { AccountRegisterLang } from '../../languages/account-register.lang';
import { LangService } from '../../services/lang.service';
@IonicPage()
@Component({
  selector: 'page-account-register',
  templateUrl: 'account-register.html',
})
export class AccountRegisterPage {

  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    title : { EN: 'Account Register', VI : 'Đăng ký'},
    btnCancel : { EN: 'Cancel', VI : 'Huỷ'},
    btnSubmit : { EN: 'Submit', VI : 'Gửi'},
    placeholderName : { EN: 'Name', VI : 'Tên'},
    placeholderEmail : { EN: 'Email', VI : 'Email'},
    placeholderPassword : { EN: 'Password', VI : 'Mật khẩu'},
    placeholderPhone : { EN: 'Phone', VI : 'Điện thoại'},
    labelRole : { EN: 'Role', VI : 'Chức năng'},
    optionRole : { EN: 'Choose Role', VI : 'Chọn chức năng'},
    lableOrg : { EN: 'Organization', VI : 'Tổ chức'},
    optionOrg : { EN: 'Choose Organization', VI : 'Chọn tổ chức'},
  };
  pageId = 'AccountRegisterPage';

  ACCOUNT: iUser = null;
  PASSWORD: string;
  ROLES: string[] = ['Referral', 'Referral Lead', 'Service Provider'];
  // ORGS: string[] = ['OCRC1', 'OCRC2', 'OCRC3', 'OCRC4'];
  ORGS: any[] = [];
  MOVEABILITIES = [];
  SERVICEPROVIDERS = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private authService: AuthService,
    private appService: AppService,
    private localService: LocalService,
    private crudService: CrudService,
    private langService: LangService
  ) {
    if (this.localService.BASIC_INFOS) {
      this.ORGS = this.localService.BASIC_INFOS.ORGS;
      this.ROLES = this.localService.BASIC_INFOS.ROLES;
      this.MOVEABILITIES = this.localService.BASIC_INFOS.MOVEABILITIES;
      this.SERVICEPROVIDERS = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
    }
    this.ACCOUNT = this.localService.USER_DEFAULT;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountRegisterPage');
    if (this.localService.BASIC_INFOS_GOT) {
      this.ROLES = this.localService.BASIC_INFOS.ROLES;
      this.ORGS = this.localService.BASIC_INFOS.ORGS;
    }
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
    this.navCtrl.setRoot('HomePage');
  }

  submit() {
    if (this.ACCOUNT.U_NAME == '' || this.ACCOUNT.U_EMAIL == '' || this.ACCOUNT.U_TEL == '') {
      this.appService.alertError('Error', 'Some fills missing');
      return;
    }
    this.doSubmit();
  }
  doSubmit() {
    console.log(this.ACCOUNT);
    const confirm = this.alertCtrl.create({
      title: 'CONFIRMATION:',
      message: 'Are you sure you want to create this account?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked, Send to db');
            this.onSignUp();
          }
        }
      ]
    });
    confirm.present();
  }

  // onSignIn() {
  //   // console.log(form.value);
  //   this.loadingService.startLoading();
  //   this.authService.signIn(this.ACCOUNT.email, this.ACCOUNT.password)
  //     .then((res) => {
  //       console.log(res);
  //       this.navCtrl.setRoot('HomePage');
  //       this.loadingService.hideLoading();
  //     })
  //     .catch((err) => {
  //       console.log('Error when loggin');
  //       this.loadingService.hideLoading();
  //       this.appService.alertError('Error', err.message)
  //     })
  // }

  onSignUp() {
    console.log(this.ACCOUNT);
    // console.log(form.value);
    // let USER: iUser = this.localService.USER_DEFAULT;
    this.loadingService.startLoading();
    if (this.ACCOUNT.U_NAME.trim() !== '' && this.PASSWORD.trim() !== '') {
      // this.crudService.accountSignUp(this.signUp.email, this.signUp.password1)
      this.authService.signUp(this.ACCOUNT.U_EMAIL, this.ACCOUNT.U_EMAIL)
        .then((res) => {
          console.log(res);
          this.ACCOUNT.U_ID = res.user.uid;
          return this.crudService.userProfileCreate(this.ACCOUNT);
        })
        .then((res1) => {
          console.log(res1);
          this.localService.USER = this.ACCOUNT;
          this.loadingService.hideLoading();
          this.appService.alertMsg('Success', 'Account created successfully. Please sign in');
          this.navCtrl.pop();
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.appService.alertMsg('Fail', 'message:' + err.message);
        })
    } else {
      this.appService.alertMsg('Fail', 'password not matched')
    }
  }

}
