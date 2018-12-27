import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../services/account.service';
import { iUsr } from '../../interfaces/usr.interface';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { ReferralAdminLang } from '../../languages/referral-admin.lang';

@IonicPage()
@Component({
  selector: 'page-referral-admin',
  templateUrl: 'referral-admin.html',
})
export class ReferralAdminPage {
  data: any;
  USER: iUsr
  userExpired: boolean = true;

  TITLE: any;
  CASES: any;
  NEW_CASES: any;
  APPOINTMENT: any;
  BENEFICIARY_QUESTIONAIRE: any;
  REPORTING: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService,
    private langService: LangService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    console.log(this.data, this.USER);
    this.initLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferralAdminPage');
    if (Object.getOwnPropertyNames(this.data).length === 0) {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.userExpired = this.accountService.isUserExpired(this.USER);
      if (this.userExpired) this.navCtrl.setRoot('HomePage');
    }
  }

  addNew() {
    this.navCtrl.push('CasePrecheckPage', { USER: this.USER, OPTION: 'ALL' });
  }

  getCases() {
    this.navCtrl.push('CasesReferralPage', { USER: this.USER });
  }

  go2Appointment() {
    this.navCtrl.push('AppointmentsPage', { USER: this.USER })
  }

  go2Search() {
    this.navCtrl.push('CaseSearchPage', { USER: this.USER, OPTION: 'ALL' })
  }

  go2BeneficiaryQuestionaire() {
    this.navCtrl.push('BenefQuestPage', { USER: this.USER })
  }

  initLang() {
    let lang = new ReferralAdminLang();
    let i = this.langService.index;
    this.TITLE = lang.TITLE[i];
    this.CASES = lang.CASES[i];
    this.NEW_CASES = lang.NEW_CASES[i];
    this.APPOINTMENT = lang.APPOINTMENT[i];
    this.BENEFICIARY_QUESTIONAIRE = lang.BENEFICIARY_QUESTIONAIRE[i];
    this.REPORTING = lang.REPORTING[i];
  }
}
