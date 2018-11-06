import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { iUsr } from '../../interfaces/usr.interface';

@IonicPage()
@Component({
  selector: 'page-account-register',
  templateUrl: 'account-register.html',
})
export class AccountRegisterPage {
  // ACCOUNT = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   phone: '',
  //   organization: '',
  //   role: ''
  // };

  ACCOUNT: iUsr = null;
  PASSWORD: string;
  ROLES: string[] = ['MoveAbility', 'Referral', 'Referral Lead', 'Service Provider'];
  ORGS: string[] = ['OCRC1', 'OCRC2', 'OCRC3', 'OCRC4'];
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
    private crudService: CrudService
  ) {
    this.ORGS = this.localService.BASIC_INFOS.ORGS;
    this.ROLES = this.localService.BASIC_INFOS.ROLES;
    this.MOVEABILITIES = this.localService.BASIC_INFOS.MOVEABILITIES;
    this.SERVICEPROVIDERS = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
    this.ACCOUNT = this.localService.USR_DEFAULT;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountRegisterPage');
    if(this.localService.BASIC_INFOS_GOT){
      this.ROLES = this.localService.BASIC_INFOS.ROLES;
      this.ORGS = this.localService.BASIC_INFOS.ORGS;
    }
  }

  doCancel(){
    this.navCtrl.setRoot('HomePage');
  }

  doSubmit(){
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
    let USR: iUsr = this.localService.USR_DEFAULT;
    this.loadingService.startLoading();
    if (this.ACCOUNT.U_NAME.trim() !=='' &&this.PASSWORD.trim() !=='' ) {
      // this.crudService.accountSignUp(this.signUp.email, this.signUp.password1)
      this.authService.signUp(this.ACCOUNT.U_EMAIL, this.ACCOUNT.U_EMAIL)
        .then((res) => {
          console.log(res);
          USR.U_ID = res.user.uid;
          USR.U_EMAIL = this.ACCOUNT.U_EMAIL;
          USR.U_NAME = this.ACCOUNT.U_NAME;
          USR.U_ORG = this.ACCOUNT.U_ORG;
          USR.U_ROLE = this.ACCOUNT.U_ROLE;
          USR.U_TEL = this.ACCOUNT.U_TEL;
          return this.crudService.usrProfileCreate(USR);
        })
        .then((res1)=>{
          console.log(res1);
          this.localService.USR = USR;
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
