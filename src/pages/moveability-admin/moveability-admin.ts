import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { CrudService } from '../../services/crud.service';
import { iPatient } from '../../interfaces/patient.interface';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService,
    private crudService: CrudService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoveabilityAdminPage');
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
