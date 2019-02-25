import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../services/account.service';
import { iUser } from '../../interfaces/user.interface';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-referral-admin',
  templateUrl: 'referral-admin.html',
})
export class ReferralAdminPage {
  
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'REFERRAL', VI: 'NGƯỜI GIỚI THIỆU' },
    CASES: { EN: 'CASE', VI: 'DANH SÁCH BN' },
    NEW_CASES: { EN: 'NEW REGISTRATION', VI: 'ĐĂNG KÝ MỚI' },
    APPOINTMENT: { EN: 'APPOINTMENT', VI: 'LỊCH HẸN' },
    BENEFICIARY_QUESTIONAIRE: { EN: 'QUESTIONNAIRES', VI: 'BẢNG CÂU HỎI' },
    REPORTING: { EN: 'REPORTING', VI: 'BÁO CÁO' },
  };
  pageId = 'ReferralAdminPage';
  
  data: any;
  USER: iUser
  userExpired: boolean = true;

  STATES = ['DRAFT', 'SUBMITTED', 'ACCEPTED', 'DENIED', 'APPROVED', 'REJECTED', 'WAITING', 'INVITED', 'UNDER TREATMENT', 'PAYMENT REQUEST', 'PAID', 'CLOSED'];

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
    console.log(this.data, this.USER);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferralAdminPage');
    if (Object.getOwnPropertyNames(this.data).length === 0) {
      this.navCtrl.setRoot('HomePage');
    } else {
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

  addNew() {
    // this.navCtrl.push('CasePrecheckPage', { USER: this.USER, OPTION: 'ALL' });
    this.navCtrl.push('CaseInformationFillPage', { USER: this.USER, ACTION: 'add-new' })
  }

  getCases() {
    this.navCtrl.push('CasesViewPage', { USER: this.USER, STATES: this.STATES });
  }

  go2Appointment() {
    this.navCtrl.push('AppointmentsPage', { USER: this.USER })
  }

  go2Search() {
    this.navCtrl.push('CaseSearchPage', { USER: this.USER, OPTION: 'ALL' })
  }

  // go2BeneficiaryQuestionaire() {
  //   // this.navCtrl.push('BenefQuestPage', { USER: this.USER });
  //   this.navCtrl.push('QuestionaireEditPage', { USER: this.USER, ACTION: 'ADD' })
  // }

  go2Questionaires() {
    // this.navCtrl.push('QuestionairesViewPage', { USER: this.USER });
    this.navCtrl.push('QuestionairesPage')
  }

  go2Reports() {
    this.navCtrl.push('ReportsPage', { USER: this.USER });
  }

  

}
