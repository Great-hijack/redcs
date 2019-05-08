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
    title: { EN: 'Account Register', VI: 'Đăng ký' },
    btnCancel: { EN: 'Cancel', VI: 'Huỷ' },
    btnSubmit: { EN: 'Submit', VI: 'Gửi' },
    placeholderName: { EN: 'Name', VI: 'Tên' },
    placeholderEmail: { EN: 'Email', VI: 'Email' },
    placeholderPassword: { EN: 'Password', VI: 'Mật khẩu' },
    placeholderPhone: { EN: 'Phone', VI: 'Điện thoại' },
    labelRole: { EN: 'Role', VI: 'Chức năng' },
    optionRole: { EN: 'Choose Role', VI: 'Chọn chức năng' },
    lableOrg: { EN: 'Organization', VI: 'Tổ chức' },
    optionOrg: { EN: 'Choose Organization', VI: 'Chọn tổ chức' },
  };
  pageId = 'AccountRegisterPage';

  ACCOUNT: iUser = null;
  PASSWORD: string;
  ROLES_EN: string[] = ['Referral', 'Referral Lead', 'Service Provider'];
  ROLES_VI: string[] = ['Người Giới Thiệu', 'Referral Lead', 'Nhà Cung Cấp'];
  ROLES: any[] = [{ EN: 'Referral', VI: 'Người Giới Thiệu' }, { EN: 'Referral Lead', VI: 'Referral Lead' }, { EN: 'Service Provider', VI: 'Nhà Cung Cấp' },]
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
      // this.ROLES = this.localService.BASIC_INFOS.ROLES;
      this.MOVEABILITIES = this.localService.BASIC_INFOS.MOVEABILITIES;
      this.SERVICEPROVIDERS = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
    }
    this.ACCOUNT = this.localService.USER_DEFAULT;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountRegisterPage');
    if (this.localService.BASIC_INFOS_GOT) {
      // this.ROLES = this.localService.BASIC_INFOS.ROLES;
      this.ORGS = this.localService.BASIC_INFOS.ORGS;
    } else {
      this.navCtrl.setRoot('HomePage');
    }
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    }
    // else {
    //   this.navCtrl.setRoot('HomePage');
    // }
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

  isFormFullFilled() {
    if (
      this.ACCOUNT.U_NAME == '' ||
      this.ACCOUNT.U_EMAIL == '' ||
      this.ACCOUNT.U_TEL == '' ||
      this.ACCOUNT.U_ROLE == '') return false;
    if (this.ACCOUNT.U_ROLE == 'Service Provider' && this.ACCOUNT.U_ORG == 'MA1') return false;
    return true;
  }

  doSubmit() {
    console.log(this.ACCOUNT);
    let _title = this.LANG =='EN'? 'CONFIRMATION' : 'Xác nhận';
    let _message = this.LANG =='EN'? 'Are you sure you want to create this account?' : 'Bạn có chắc sẽ tạo tài khoản này?';
    let _text1 = this.LANG =='EN'? 'Disagree' : 'Không';
    let _text2 = this.LANG =='EN'? 'Agree' : 'Có';
    const confirm = this.alertCtrl.create({
      title: _title,
      message: _message,
      buttons: [
        {
          text: _text1,
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: _text2,
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
    let MSG_EN = 'Create account successfully. A link was sent to your email. Please reset your password and wait for approval from MA';
    let MSG_VI = 'Tạo tài khoản thành công. Một đường link đã được gửi đến email của bạn. Vui lòng đặt lại mật khẩu và chờ MA xét duyệt.';

    console.log(this.ACCOUNT);
    this.loadingService.startLoading();
    if (this.ACCOUNT.U_ROLE !== 'Service Provider') { this.ACCOUNT.U_ORG = 'MA1' }
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
          return this.authService.resetAccount(this.ACCOUNT.U_EMAIL);
        })
        .then((res2) => {
          console.log(res2);
          this.localService.USER = this.ACCOUNT;
          this.loadingService.hideLoading();
          if (this.LANG == 'EN') {
            this.appService.alertMsg('Success', MSG_EN);
          } else {
            this.appService.alertMsg('Thành công', MSG_VI);
          }

          this.navCtrl.pop();
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          if (this.LANG == 'EN') {
            this.appService.alertMsg('Fail', 'message:' + err.message);
          } else {
            this.appService.alertMsg('Lỗi', 'Lỗi:' + err.message);
          }
        })
    } else {
      if (this.LANG == 'EN') {
        this.appService.alertMsg('Fail', 'password not matched')
      } else {
        this.appService.alertMsg('Lỗi', 'Mật khẩu không khớp')
      }
      
    }
  }

}
