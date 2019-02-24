import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-case-detail-view',
  templateUrl: 'case-detail-view.html',
})
export class CaseDetailViewPage {
  data: any;
  USER: iUser;
  PATIENT: iPatient;
  OPTION: string;
  MOVEABILITIES = [];
  SERVICEPROVIDERS = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    this.PATIENT = this.data.PATIENT;
    this.USER = this.data.USER;
    this.OPTION = this.data.OPTION;

    if (this.localService.BASIC_INFOS) {
      this.MOVEABILITIES = this.localService.BASIC_INFOS.MOVEABILITIES;
      this.SERVICEPROVIDERS = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
    } else {
      this.crudService.getBasicData().then((res) => {
        console.log(res);
        this.MOVEABILITIES = this.localService.BASIC_INFOS.MOVEABILITIES;
        this.SERVICEPROVIDERS = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
      }).catch(err => console.log(err))
    }
    if (this.localService.USR) {
      this.USER = this.localService.USR;
    } else {
      this.crudService.getCurrentUsrProfile()
      .then(()=>{
        this.USER = this.localService.USR;
      })
    }
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseViewPage');
    // this.
  }

  go2CaseUpdate() {
    this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, ACTION: 'update' })
  }

  updateCaseByReferralLead(ACTION: string) {
    this.PATIENT.PAT_STATE = ACTION;
    this.PATIENT.PAT_REFLEAD_ID = this.USER.U_ID;
    this.crudService.patientUpdate(this.PATIENT)
      .then((res) => {
        console.log(res);
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  updateCaseByMoveAbility(ACTION: string) {
    this.PATIENT.PAT_STATE = ACTION;
    this.PATIENT.PAT_MVA_ID = this.USER.U_ID;
    this.crudService.patientUpdate(this.PATIENT)
      .then((res) => {
        console.log(res);
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
      })
  }

}
