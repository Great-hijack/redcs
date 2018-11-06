import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { iUsr } from '../../interfaces/usr.interface';
import { AppService } from '../../services/app.service';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  logo_url = "../../assets/imgs/logo.jpg"
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private localService: LocalService,
    public authService: AuthService,
    private appService: AppService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    if (!this.localService.BASIC_INFOS_GOT)
      this.getData();
    // this.authService.isUserSignedIn()
    this.authService.checkIfUserSignIn();
    // this.getCurrentDate();
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
    }else{
      this.go2Page(this.localService.USR);
    }
  }

  go2Page(USER){
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



}
