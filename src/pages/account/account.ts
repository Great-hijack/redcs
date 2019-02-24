import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { LoadingService } from '../../services/loading.service';
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  data: any;
  action: string = 'sign-in';
  signIn: { email: string, password: string } = { email: '', password: '' };
  signUp: { email: string, password1: string, password2: string, name: string } = { email: '', password1: '', password2: '', name: '' };
  resetAccount: { email: string } = { email: '' };
  isBackable: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private appService: AppService,
    private authService: AuthService,
    private crudService: CrudService,
    private localService: LocalService,
    private loadingService: LoadingService
  ) {
    this.data = navParams.data;
    this.action = this.data.action;
    if (typeof (this.action) != 'undefined') {
      this.isBackable = true;
    } else {
      this.navCtrl.setRoot('HomePage');
    }
    console.log(this.action);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  onSignIn(form) {
    console.log(form.value);
    this.loadingService.startLoading();
    this.authService.signIn(this.signIn.email, this.signIn.password)
      .then((res) => {
        console.log(res);
        this.navCtrl.setRoot('HomePage');
        this.loadingService.hideLoading();
      })
      .catch((err) => {
        console.log('Error when loggin');
        this.loadingService.hideLoading();
        this.appService.alertError('Error', err.message)
      })
  }
  

  onSignInOnRequest(form) {
    console.log(form.value);
    this.loadingService.startLoading();
    this.authService.signIn(this.signIn.email, this.signIn.password)
      .then(() => {
        console.log('Login success');
        this.loadingService.hideLoading();
        this.navCtrl.pop();
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log('Error when loggin');
        this.appService.alertError('Error', err.message)
      })
  }

  onAuthInOnRequest(form) {
    console.log(form.value);
    this.loadingService.startLoading();
    this.authService.signIn(this.signIn.email, this.signIn.password)
      .then(() => {
        console.log('Login success');
        this.loadingService.hideLoading();
        // this.navCtrl.pop();
        this.viewCtrl.dismiss({ authSuccess: true })
          .then((res) => { console.log(res) })
          .catch((err) => { console.log(err) })
      })
      .catch((err) => {
        console.log('Error when loggin');
        this.loadingService.hideLoading();
        this.appService.alertError('Error', err.message)
      })
  }

  onSignUp(form) {
    console.log(form.value);
    let USER = this.localService.USR_DEFAULT;
    this.loadingService.startLoading();
    if (this.signUp.password1 === this.signUp.password2) {
      // this.crudService.accountSignUp(this.signUp.email, this.signUp.password1)
      this.authService.signUp(this.signUp.email, this.signUp.password1)
        .then((res) => {
          console.log(res);
          USER.U_ID = res.user.uid;
          USER.U_EMAIL = res.user.email;
          USER.U_NAME = this.signUp.name;
          return this.crudService.usrProfileCreate(USER);
        })
        .then((res1)=>{
          console.log(res1);
          this.localService.USR = USER;
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

  onResetAccount(form) {
    // this.btnReset = false;
    console.log(form.value)
    this.loadingService.startLoading();
    this.authService.resetAccount(this.resetAccount.email)
      .then((data) => {
        // this.btnReset = true;
        this.authService.isSigned = false;
        // this.isSigned = this.authService.isSigned;
        this.loadingService.hideLoading();
        this.appService.alertMsg('Success', 'Please check email and reset your account: ' + this.resetAccount.email);
        this.navCtrl.push('HomePage');
      })
      .catch((err) => {
        console.log('Wrong email');
        this.loadingService.hideLoading();
        this.appService.alertMsg('Fail', this.resetAccount.email + ' not registered yet');
      })
  }

  go2SignUp() {
    this.action = 'sign-up';
  }

  go2ResetPassword() {
    this.action = 'reset-account';
  }

  closeView() {
    this.navCtrl.pop();
  }

}
