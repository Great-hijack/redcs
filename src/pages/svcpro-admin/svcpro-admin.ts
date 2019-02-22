import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { SvcproAdminLang } from '../../languages/svcpro-admin.lang';

@IonicPage()
@Component({
  selector: 'page-svcpro-admin',
  templateUrl: 'svcpro-admin.html',
})
export class SvcproAdminPage {

  data: any;
  USER: iUsr;
  userExpired: boolean = true;
  TITLE: any;
  txtCASES: any;
  txtAPPOINTMENT: any;
  STATES = ['DRAFT','SUBMITTED','ACCEPTED','DENIED','APPROVED','REJECTED','WAITING','INVITED','UNDER TREATMENT','PAYMENT REQUEST','PAID','CLOSED'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService,
    private langService: LangService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;

    this.initLang();
  }

  ionViewDidLoad() {
    if (typeof (this.USER) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))
    } else {
      console.log('ionViewDidLoad SvcproAdminPage');
      this.userExpired = this.accountService.isUserExpired(this.USER);
      if (this.userExpired) this.navCtrl.setRoot('HomePage');
    }

  }

  getCases() {
    // this.navCtrl.push('CasesSvcproviderPage', { USER: this.USER });
    this.navCtrl.push('CasesViewPage', { USER: this.USER , STATE: ''});
  }
  getCasesPaymentRequest() {
    // this.navCtrl.push('CasesSvcproviderPage', { USER: this.USER });
    this.navCtrl.push('CasesViewPage', { USER: this.USER , STATES: ['PAYMENT REQUEST']});
  }

  getCasesPaid() {
    // this.navCtrl.push('CasesSvcproviderPage', { USER: this.USER });
    this.navCtrl.push('CasesViewPage', { USER: this.USER , STATES: ['PAID']});
  }

  go2Appointment() {
    this.navCtrl.push('AppointmentsPage', { USER: this.USER })
  }

  go2Search() {
    this.navCtrl.push('CaseSearchPage', { USER: this.USER, OPTION: 'ALL' })
  }

  initLang() {
    let i = this.langService.index;
    let lang = new SvcproAdminLang();
    this.TITLE = lang.TITLE[i];
    this.txtCASES = lang.txtCASES[i];
    this.txtAPPOINTMENT = lang.txtAPPOINTMENT[i];
  }

}
