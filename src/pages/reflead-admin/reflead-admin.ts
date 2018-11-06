import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { iUsr } from '../../interfaces/usr.interface';

@IonicPage()
@Component({
  selector: 'page-reflead-admin',
  templateUrl: 'reflead-admin.html',
})
export class RefleadAdminPage {
  data: any;
  USER: iUsr
  userExpired: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    if (typeof (this.USER) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))
    } else {
      this.userExpired = this.accountService.isUserExpired(this.USER);
      if (this.userExpired) this.navCtrl.setRoot('HomePage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefleadAdminPage');

  }

  getCases() {
    this.navCtrl.push('CasesRefleadPage', { USER: this.USER });
  }

  go2Appointment() {
    this.navCtrl.push('AppointmentsPage', { USER: this.USER })
  }

}

