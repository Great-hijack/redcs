import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { AppService } from '../../services/app.service';

@IonicPage()
@Component({
  selector: 'page-case-view',
  templateUrl: 'case-view.html',
})
export class CaseViewPage {
  data: any;
  USER: iUser;
  PATIENT: iPatient;
  OPTION: string;
  MOVEABILITIES = [];
  SERVICEPROVIDERS = [];
  hidden: boolean = true;
  PRIVACY: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private localService: LocalService,
    private appService: AppService
  ) {
    this.data = this.navParams.data;
    this.PATIENT = this.data.PATIENT;
    this.USER = this.data.USER;
    this.OPTION = this.data.OPTION;
    this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY
    console.log(typeof (this.USER))
    if (typeof (this.USER) === 'undefined' || typeof (this.PATIENT) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))

    } else {
      this.hidden = false;
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
          .then(() => {
            this.USER = this.localService.USR;
          })
      }
      console.log(this.data);
    }


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
    switch (ACTION) {
      case 'APPROVED':
        if (this.PATIENT.PAT_SVP) {
          this.doUpdateCase(ACTION);
        } else {
          this.appService.alertError('Oops', 'Please select service provider');
        }
        break;
      case 'REJECTED':
        this.doUpdateCase(ACTION);
        break;

      default:
        break;
    }

  }

  doUpdateCase(ACTION) {
    if (this.PATIENT.PAT_SVP) {
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
    }else{
      this.appService.alertError('Error', 'Please select service provider');
    }
  }

  go2CaseDetail(PAGE: string) {
    this.navCtrl.push(PAGE, { USER: this.USER, PATIENT: this.PATIENT });
  }

  updateDraft(){
    console.log('updateDraft');
    this.navCtrl.push('CaseInformationFillPage', {PATIENT: this.PATIENT, USER: this.USER});
  }

}
