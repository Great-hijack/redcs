import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { iUsr } from '../../interfaces/usr.interface';
import { CrudService } from '../../services/crud.service';
import firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-cases-view',
  templateUrl: 'cases-view.html',
})
export class CasesViewPage {

  data: any;
  USER: iUsr;
  PATIENTS: iPatient[] = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
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
      case "Referral":
        pro = this.crudService.patientGetAllsOfReferral(this.USER.U_ID)
      case "Service Provider":
        pro = this.crudService.patientsGetAllOfServiceProvider(this.USER.U_ID)
      case "MoveAbility":
        pro = this.crudService.patientsGetAllOfMoveAbility(this.USER.U_ID)
    }

    pro.then((qSnap) => {
      qSnap.forEach(doc => {
        let PAT = <iPatient>doc.data();
        this.PATIENTS.push(PAT);
      })
      console.log(this.PATIENTS);
    })

  }

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
  }
}
