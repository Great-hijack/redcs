import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-svcpro-admin',
  templateUrl: 'svcpro-admin.html',
})
export class SvcproAdminPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'REFERRAL', VI: 'REFERRAL' },
    txtCASES: { EN: 'CASES', VI: 'CASES' },
    txtAPPOINTMENT: { EN: 'APPOINTMENT', VI: 'LỊCH HẸN' },
  };
  pageId = 'SvcproAdminPage';

  data: any;
  USER: iUser;
  userExpired: boolean = true;
  TITLE: any;
  txtCASES: any;
  txtAPPOINTMENT: any;
  STATES = ['DRAFT', 'SUBMITTED', 'ACCEPTED', 'DENIED', 'APPROVED', 'REJECTED', 'INVITED', 'UNDER TREATMENT', 'PAYMENT REQUEST', 'PAID', 'CLOSED'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService,
    private langService: LangService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
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

    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }


  }

  getCases() {
    this.navCtrl.push('CasesViewPage', { USER: this.USER, STATES: this.STATES });
  }
  getCasesPaymentRequest() {
    this.navCtrl.push('CasesViewPage', { USER: this.USER, STATES: ['PAYMENT REQUEST'] });
  }

  getCasesPaid() {
    this.navCtrl.push('CasesViewPage', { USER: this.USER, STATES: ['PAID'] });
  }

  go2Appointment() {
    this.navCtrl.push('AppointmentsPage', { USER: this.USER })
  }

  go2Search() {
    this.navCtrl.push('CaseSearchPage', { USER: this.USER, OPTION: 'ALL' })
  }

  go2Reports() {
    this.navCtrl.push('ReportsPage', { USER: this.USER });
  }


}
