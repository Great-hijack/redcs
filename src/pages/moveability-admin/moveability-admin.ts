import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { CrudService } from '../../services/crud.service';
import { iPatient } from '../../interfaces/patient.interface';
import { LangService } from '../../services/lang.service';
import { MoveabilityAdminLang } from '../../languages/moveability-admin.lang';
@IonicPage()
@Component({
  selector: 'page-moveability-admin',
  templateUrl: 'moveability-admin.html',
})
export class MoveabilityAdminPage {

  data: any;
  USER: iUsr
  userExpired: boolean = true;
  NEW_PATIENTS: number = 0;

  TITLE: any;
  CASES: any;
  NEW_CASES: any;
  WAITING_LIST: any;
  APPOINTMENT: any;
  LANGUAGES: any;
  PRIVACY: any;
  BENEFICIARY_QUESTIONAIRE: any;
  TECHNICAL_ASSESSMENT: any;
  REPORTING: any;
  EXPENSE: any;
  COMBINATION_SEARCH: any;
  STATES = ['DRAFT', 'SUBMITTED', 'ACCEPTED', 'DENIED', 'APPROVED', 'REJECTED', 'WAITING', 'INVITED', 'UNDER TREATMENT', 'PAYMENT REQUEST', 'PAID', 'CLOSED'];
  //Language: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService,
    private crudService: CrudService,
    private langService: LangService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.initLang();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoveabilityAdminPage');
    //this.Language=this.langService;
    // console.log("lang " + this.langService.LangModel.btnCase);



    if (typeof (this.USER) !== 'undefined') {
      this.userExpired = this.accountService.isUserExpired(this.USER);
      if (this.userExpired) this.navCtrl.setRoot('HomePage');
      this.getNewCasesNumber();
    } else {
      this.navCtrl.setRoot('HomePage')
    }
  }

  initLang() {
    let lang = new MoveabilityAdminLang();
    let i = this.langService.index;
    this.TITLE = lang.TITLE[i];
    this.CASES = lang.CASES[i];
    this.NEW_CASES = lang.NEW_CASES[i];
    this.WAITING_LIST = lang.WAITING_LIST[i];
    this.APPOINTMENT = lang.APPOINTMENT[i];
    this.LANGUAGES = lang.LANGUAGES[i];
    this.PRIVACY = lang.PRIVACY[i];
    this.BENEFICIARY_QUESTIONAIRE = lang.BENEFICIARY_QUESTIONAIRE[i];
    this.TECHNICAL_ASSESSMENT = lang.TECHNICAL_ASSESSMENT[i];
    this.REPORTING = lang.REPORTING[i];
    this.EXPENSE = lang.EXPENSE[i];
    this.COMBINATION_SEARCH = lang.COMBINATION_SEARCH[i];

  }

  addNew() {
    this.navCtrl.push('CasePrecheckPage');
  }

  // getCases(OPTION: string) {
  //   // this.navCtrl.push('CasesMoveabilityPage', { USER: this.USER, OPTION: OPTION });
  //   this.navCtrl.push('CasesViewPage', { USER: this.USER, OPTION: OPTION });
  // }

  getCases() {
    // this.navCtrl.push('CasesRefleadPage', { USER: this.USER });
    this.navCtrl.push('CasesViewPage', { USER: this.USER, STATES: this.STATES });
  }

  getNewCasesNumber() {
    console.log('getSize');
    this.crudService.patientsGetNewOfMoveAbility(this.USER.U_ORG)
      .then((qSnap) => {
        this.NEW_PATIENTS = qSnap.size;
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

  go2PriceUpdate() {
    this.navCtrl.push('PriceUpdatePage', { USER: this.USER })
  }

  go2PrivacyUpdate() {
    this.navCtrl.push('PrivacyUpdatePage', { USER: this.USER })
  }

  go2BeneficiaryQuestionaire() {
    this.navCtrl.push('BenefQuestPage', { USER: this.USER })
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
    this.navCtrl.push('CasesViewPage', { USER: this.USER, OPTION: 'OPTION', STATE: 'PAYMENT REQUEST' });
  }
}
