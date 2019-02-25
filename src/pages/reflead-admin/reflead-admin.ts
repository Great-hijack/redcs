import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { iUser } from '../../interfaces/user.interface';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';
@IonicPage()
@Component({
  selector: 'page-reflead-admin',
  templateUrl: 'reflead-admin.html',
})
export class RefleadAdminPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Referral Lead', VI: 'Referral Lead' },
    txtCASES: { EN: 'CASES', VI: 'CASES' },
    txtADDNEW: { EN: 'ADD NEW', VI: 'THÊM MỚI' },
    txtAPPOINTMENT: { EN: 'APPOINTMENT', VI: 'LỊCH HẸN' },
    txtBENEFICIARY_QUESTIONAIRE: { EN: 'BENEFICIARY QUESTIONAIRE', VI: 'BẢNG CÂU HỎI' },
  };
  pageId = 'RefleadAdminPage';
  data: any;
  USER: iUser
  userExpired: boolean = true;

  TITLE: any;
  txtCASES: any;
  txtADDNEW: any;
  txtAPPOINTMENT: any;
  txtBENEFICIARY_QUESTIONAIRE: any;

  STATES = ['DRAFT', 'SUBMITTED', 'ACCEPTED', 'DENIED', 'APPROVED', 'REJECTED', 'WAITING', 'INVITED', 'UNDER TREATMENT', 'PAYMENT REQUEST', 'PAID', 'CLOSED'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService,
    private langService: LangService,
    private localService: LocalService
  ) {
    // this.initLang();
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

  go2Appointment() {
    this.navCtrl.push('AppointmentsPage', { USER: this.USER })
  }

  
}

