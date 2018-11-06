import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';

@IonicPage()
@Component({
  selector: 'page-cases-moveability',
  templateUrl: 'cases-moveability.html',
})
export class CasesMoveabilityPage {
  data: any;
  USER: iUsr;
  PATIENTS: iPatient[] = []
  NEW_PATIENTS: iPatient[] = []
  WAIT_PATIENTS: iPatient[] = []
  OPTION: string = 'NEW';

  FROM: string = '2018/08/12';
  TO: string = '2018/08/12';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private appService: AppService
  ) {

    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.OPTION = this.data.OPTION;
    console.log(this.data);
    if (typeof (this.USER) === 'undefined' || typeof (this.OPTION) === 'undefined') {
      this.navCtrl.setRoot('HomePage')
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CasesMoveabilityPage');
    switch (this.OPTION) {
      case 'ALL':
        this.getAllCases();
        break;
      case 'NEW':
        this.getNewCases();
        break;
      case 'WAITING':
        this.getWaitingCases();
        break;
      default:
        break;
    }

  }

  setSelected(PAT: iPatient) {

    PAT.PAT_isSELECTED = !PAT.PAT_isSELECTED;
    console.log(PAT);
  }

  sendInvitation() {
    let PATs = [];
    this.PATIENTS.forEach(PAT => {
      if (PAT.PAT_isSELECTED) {
        PAT.PAT_STATE = 'INVITED';
        PAT.PAT_INV_FROM = this.FROM;
        PAT.PAT_INV_TO = this.TO;
        PAT.PAT_isSELECTED = false;
        PATs.push(PAT);
      }
    });

    this.crudService.patientsUpdate(PATs)
      .then((res) => {
        console.log(res);
        this.appService.toastMsg('Invitation sent...', 3000);
        this.navCtrl.pop();
      })
      .catch(err => {
        this.appService.alertError('Error', 'something went wrong');
      })

  }

  cancel() {
    this.navCtrl.pop();
  }



  getAllCases() {
    this.crudService.patientsGetAllOfMoveAbility(this.USER.U_ORG)
      .then((qSnap) => {
        this.PATIENTS = [];
        qSnap.forEach(doc => {
          let PAT = <iPatient>doc.data()
          this.PATIENTS.push(PAT);
        })
        console.log(this.PATIENTS);
      })
  }

  getNewCases() {
    this.crudService.patientsGetNewOfMoveAbility(this.USER.U_ORG)
      .then((qSnap) => {
        this.PATIENTS = [];
        qSnap.forEach(doc => {
          let PAT = <iPatient>doc.data()
          this.PATIENTS.push(PAT);
        })
        console.log(this.PATIENTS);
      })
  }

  getWaitingCases() {
    this.crudService.patientsGetWaitingOfMoveAbility(this.USER.U_ORG)
      .then((qSnap) => {
        this.PATIENTS = [];
        qSnap.forEach(doc => {
          let PAT = <iPatient>doc.data()
          this.PATIENTS.push(PAT);
        })
        console.log(this.PATIENTS);
      })
  }

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER, OPTION: this.OPTION })
  }

}
