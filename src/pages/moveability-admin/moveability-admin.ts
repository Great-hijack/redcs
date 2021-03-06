import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { CrudService } from '../../services/crud.service';
import { iPatient } from '../../interfaces/patient.interface';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';
@IonicPage()
@Component({
  selector: 'page-moveability-admin',
  templateUrl: 'moveability-admin.html',
})
export class MoveabilityAdminPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'MOVEABILITY', VI: 'MOVEABILITY' },
    CASES: { EN: 'CASES', VI: 'CASES' },
    NEW_CASES: { EN: 'NEW CASES', VI: 'MỚI' },
    WAITING_LIST: { EN: 'WAITING LIST', VI: 'DANH SÁCH CHỜ' },
    APPOINTMENT: { EN: 'APPOINTMENT', VI: 'LỊCH HẸN' },
    LANGUAGES: { EN: 'LANGUAGES', VI: 'NGÔN NGỮ' },
    PRIVACY: { EN: 'PRIVACY', VI: 'RIÊNG TƯ' },
    BENEFICIARY_QUESTIONAIRE: { EN: 'QUESTIONAIR', VI: 'BẢNG CÂU HỎI' },
    TECHNICAL_ASSESSMENT: { EN: 'TECHNICAL ASSESSMENT', VI: 'ĐÁNH GIÁ' },
    REPORTING: { EN: 'REPORTING', VI: 'BÁO CÁO' },
    EXPENSE: { EN: 'EXPENSE', VI: 'CHI PHÍ' },
    COMBINATION_SEARCH: { EN: 'SEARCH', VI: 'TÌM KIẾM' },
    PAYMENT_REQ: { EN: 'PAYMENT REQUEST', VI: 'YÊU CẦU THANH TOÁN' },
  };
  pageId = 'MoveabilityAdminPage';

  data: any;
  USER: iUser
  userExpired: boolean = true;
  NEW_PATIENTS: number = 0;

  TITLE: any;
  CASES: any;
  NEW_CASES: any;
  WAITING_LIST: any;
  APPOINTMENT: any;
  // LANGUAGES: any;
  PRIVACY: any;
  BENEFICIARY_QUESTIONAIRE: any;
  TECHNICAL_ASSESSMENT: any;
  REPORTING: any;
  EXPENSE: any;
  COMBINATION_SEARCH: any;
  STATES = ['DRAFT', 'SUBMITTED', 'ACCEPTED', 'DENIED', 'APPROVED', 'REJECTED', 'INVITED', 'UNDER TREATMENT', 'PAYMENT REQUEST', 'PAYMENT APPROVED', 'PAID', 'CLOSED'];
  //Language: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService,
    private crudService: CrudService,
    private langService: LangService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    // this.initLang();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoveabilityAdminPage');
    //this.Language=this.langService;
    // console.log("lang " + this.langService.LangModel.btnCase);

    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }


    if (typeof (this.USER) !== 'undefined') {
      this.userExpired = this.accountService.isUserExpired(this.USER);
      if (this.userExpired) this.navCtrl.setRoot('HomePage');
      // this.getNewCasesNumber();
      this.getNewCasesNumberRealtime();
    } else {
      this.navCtrl.setRoot('HomePage')
    }
  }

  // initLang() {
  //   let lang = new MoveabilityAdminLang();
  //   let i = this.langService.index;
  //   this.TITLE = lang.TITLE[i];
  //   this.CASES = lang.CASES[i];
  //   this.NEW_CASES = lang.NEW_CASES[i];
  //   this.WAITING_LIST = lang.WAITING_LIST[i];
  //   this.APPOINTMENT = lang.APPOINTMENT[i];
  //   this.LANGUAGES = lang.LANGUAGES[i];
  //   this.PRIVACY = lang.PRIVACY[i];
  //   this.BENEFICIARY_QUESTIONAIRE = lang.BENEFICIARY_QUESTIONAIRE[i];
  //   this.TECHNICAL_ASSESSMENT = lang.TECHNICAL_ASSESSMENT[i];
  //   this.REPORTING = lang.REPORTING[i];
  //   this.EXPENSE = lang.EXPENSE[i];
  //   this.COMBINATION_SEARCH = lang.COMBINATION_SEARCH[i];

  // }

  addNew() {
    this.navCtrl.push('CasePrecheckPage');
  }

  // getCases(OPTION: string) {
  //   // this.navCtrl.push('CasesMoveabilityPage', { USER: this.USER, OPTION: OPTION });
  //   this.navCtrl.push('CasesViewPage', { USER: this.USER, OPTION: OPTION });
  // }

  getCases() {
    let STATES = ['APPROVED', 'REJECTED', 'INVITED', 'UNDER TREATMENT', 'PAYMENT REQUEST', 'PAYMENT APPROVED', 'PAYMENTAPPROVED', 'PAID', 'CLOSED'];
    // this.navCtrl.push('CasesRefleadPage', { USER: this.USER });
    this.navCtrl.push('CasesViewPage', { USER: this.USER, STATES: STATES });
  }

  getNewCasesNumber() {
    console.log('getSize');
    this.crudService.patientsGetNewOfMoveAbility(this.USER.U_ORG)
      .then((qSnap) => {
        this.NEW_PATIENTS = qSnap.size;
      })

    let sub = this.crudService.patientsNewOfMoveAbilityGet(this.USER.U_ORG)
  }


  getNewCasesNumberRealtime() {
    this.crudService.patientsNewOfMoveAbilityGet(this.USER.U_ORG).subscribe(qSnap => {
      console.log('eeee')
      console.log(qSnap);
      this.NEW_PATIENTS = qSnap.length;
    })
  }

  getNewCases() {
    // this.navCtrl.push('CasesRefleadPage', { USER: this.USER });
    this.navCtrl.push('CasesViewPage', { USER: this.USER, STATES: ['ACCEPTED'] });
  }

  getWaitingCases() {
    this.navCtrl.push('CasesViewPage', { USER: this.USER, STATES: ['APPROVED'], OPTION: 'WAITING' });
  }

  go2Appointment() {
    this.navCtrl.push('AppointmentsPage', { USER: this.USER })
  }

  go2Languages() {
    this.navCtrl.push('LanguagesPage', { USER: this.USER });
  }

  go2PriceUpdate() {
    this.navCtrl.push('PriceUpdatePage', { USER: this.USER })
  }

  go2PrivacyUpdate() {
    this.navCtrl.push('PrivacyUpdatePage', { USER: this.USER })
  }

  go2Questionaires() {
    // this.navCtrl.push('QuestionairesViewPage', { USER: this.USER });
    this.navCtrl.push('QuestionairesPage')
  }

  go2TechnicalAssessment() {
    this.navCtrl.push('TechnicalAssessmentPage', { USER: this.USER })
  }

  go2Search() {
    this.navCtrl.push('CaseSearchPage', { USER: this.USER, OPTION: 'ALL' })
  }

  go2Reports() {
    this.navCtrl.push('ReportsPage', { USER: this.USER });
  }

  go2CombinationSearch() {
    // this.navCtrl.push('CombinationSearchPage', { USER: this.USER });
    this.navCtrl.push('CaseSearchPage', { USER: this.USER });
  }

  go2PaymentReq() {
    // this.navCtrl.push('CasesViewPage', { USER: this.USER, OPTION: 'OPTION', STATES: ['PAYMENT REQUEST'] });
    this.navCtrl.push('PaymentsPage', { USER: this.USER });
  }


}
