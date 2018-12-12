import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { CrudService } from '../../services/crud.service';
import { iPatient } from '../../interfaces/patient.interface';
import { LangService } from '../../services/lang.service';

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

  TITLE:any;
  CASES: any;
  NEW_CASES: any; 
  WAITING_LIST: any;
  APPOINTMENT: any; 
  LANGUAGES:any; 
  PRIVACY: any; 
  BENEFICIARY_QUESTIONAIRE:any; 
  TECHNICAL_ASSESSMENT:any; 
  REPORTING:any; 
  EXPENSE:any; 
  COMBINATION_SEARCH:any; 


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


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoveabilityAdminPage');
    //this.Language=this.langService;
    console.log("lang " + this.langService.LangModel.btnCase);

    this.TITLE=this.langService.LangModel.title;
    this.CASES= this.langService.LangModel.btnCase;
    this.NEW_CASES=this.langService.LangModel.btnNewCase; 
    this.WAITING_LIST=this.langService.LangModel.btnWattingList;
    this.APPOINTMENT=this.langService.LangModel.btnAppointment; 
    this.LANGUAGES=this.langService.LangModel.btnLanguages; 
    this.PRIVACY=this.langService.LangModel.btnPrivacy; 
    this.BENEFICIARY_QUESTIONAIRE=this.langService.LangModel.btnBeneficiary; 
    this.TECHNICAL_ASSESSMENT=this.langService.LangModel.btnTechnical; 
    this.REPORTING=this.langService.LangModel.btnReport; 
    this.EXPENSE=this.langService.LangModel.btnExpense; 
    this.COMBINATION_SEARCH=this.langService.LangModel.btnCombination; 
  

    if (typeof (this.USER) !== 'undefined') {
      this.userExpired = this.accountService.isUserExpired(this.USER);
      if (this.userExpired) this.navCtrl.setRoot('HomePage');
      this.getNewCases();
    }else{
      this.navCtrl.setRoot('HomePage')
    }
  }

  addNew() {
    this.navCtrl.push('CasePrecheckPage');
  }

  getCases(OPTION: string) {
    this.navCtrl.push('CasesMoveabilityPage', { USER: this.USER, OPTION: OPTION });
  }

  getNewCases() {
    this.crudService.patientsGetNewOfMoveAbility(this.USER.U_ORG)
      .then((qSnap) => {
        this.NEW_PATIENTS = qSnap.size;
      })
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

  go2TechnicalAssessment() {
    this.navCtrl.push('TechnicalAssessmentPage', { USER: this.USER })
  }

  go2Search() {
    this.navCtrl.push('CaseSearchPage', { USER: this.USER, OPTION: 'ALL' })
  }

  go2CombinationSearch(){
    this.navCtrl.push('CombinationSearchPage',{ USER: this.USER})
  }
}
