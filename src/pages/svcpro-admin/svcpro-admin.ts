import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';

@IonicPage()
@Component({
  selector: 'page-svcpro-admin',
  templateUrl: 'svcpro-admin.html',
})
export class SvcproAdminPage {

  data: any;
  USER: iUsr;
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

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SvcproAdminPage');
    this.userExpired = this.accountService.isUserExpired(this.USER);
    if (this.userExpired ) this.navCtrl.setRoot('HomePage');
  }

  getCases(){
    this.navCtrl.push('CasesSvcproviderPage', {USER: this.USER});
  }

  go2Appointment(){
    this.navCtrl.push('AppointmentsPage', {USER: this.USER})
  }

  go2Search(){
    this.navCtrl.push('CaseSearchPage', {USER: this.USER, OPTION: 'ALL' })
  }

}
