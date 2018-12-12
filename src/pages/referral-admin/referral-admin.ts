import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../services/account.service';
import { iUsr } from '../../interfaces/usr.interface';
import { AppService } from '../../services/app.service';
import { HomePage } from '../home/home';
import { LangService } from '../../services/lang.service';

/**
 * Generated class for the ReferralAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-referral-admin',
  templateUrl: 'referral-admin.html',
})
export class ReferralAdminPage {
  data: any;
  USER: iUsr
  userExpired: boolean = true;

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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferralAdminPage');
    if (Object.getOwnPropertyNames(this.data).length === 0) {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.userExpired = this.accountService.isUserExpired(this.USER);
      if (this.userExpired) this.navCtrl.setRoot('HomePage');
    }

    this.TITLE=this.langService.LangModel.title_referral;
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
  }

  addNew() {
    this.navCtrl.push('CasePrecheckPage',{ USER: this.USER, OPTION: 'ALL' } );
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
}
