import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { iUsr } from '../../interfaces/usr.interface';
import { CrudService } from '../../services/crud.service';
import firebase from 'firebase';
import 'firebase/firestore';
import { AppService } from '../../services/app.service';

@IonicPage()
@Component({
  selector: 'page-cases-view',
  templateUrl: 'cases-view.html',
})
export class CasesViewPage {

  data: any;
  USER: iUsr;
  OPTION: string = 'NEW';
  PATIENTS: iPatient[] = []
  NEW_PATIENTS: iPatient[] = []
  WAIT_PATIENTS: iPatient[] = []

  FROM: string = '2018/08/12';
  TO: string = '2018/08/12';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private appService: AppService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.OPTION = typeof(this.data.OPTION) =='undefined'? 'ALL' : this.data.OPTION;
    console.log(this.data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasesReferralPage');
    if (typeof (this.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.getCases();
    }

  }
  getCases() {
    this.PATIENTS = [];
    let pro: Promise<firebase.firestore.QuerySnapshot>;
    let U_ROLE = this.USER.U_ROLE;
    switch (U_ROLE) {
      case "Referral Lead":
        pro = this.crudService.patientsGetAllOfOrg(this.USER.U_ORG);
        break;
      case "Referral":
        pro = this.crudService.patientsGetAllOfReferral(this.USER.U_ID)
        break;
      case "Service Provider":
        pro = this.crudService.patientsGetAllOfServiceProvider(this.USER.U_ORG)
        break;
      case "MoveAbility":
        switch (this.OPTION) {
          case 'ALL':
            console.log('MA ALL');
            pro = this.crudService.patientsGetAllOfMoveAbility(this.USER.U_ORG);
            break;

          case 'NEW':
            console.log('MA NEW');
            pro = this.crudService.patientsGetNewOfMoveAbility(this.USER.U_ORG)
            break;
          case 'WAITING':
            console.log('MA WAITING');
            pro = this.crudService.patientsGetWaitingOfMoveAbility(this.USER.U_ORG)
            break;
        }
        break;
    }

    console.log(U_ROLE, this.OPTION);
    pro.then((qSnap) => {
      console.log(qSnap);
      qSnap.forEach(doc => {
        let PAT = <iPatient>doc.data();
        this.PATIENTS.push(PAT);
      })
      console.log(this.PATIENTS);
    })
      .catch(err => console.log(err));

  }

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
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
}
