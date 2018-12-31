import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { iUsr } from '../../interfaces/usr.interface';


@IonicPage()
@Component({
  selector: 'page-cases-svcprovider',
  templateUrl: 'cases-svcprovider.html',
})
export class CasesSvcproviderPage {
  USER: iUsr;
  PATIENTS: iPatient[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService
  ) {
    this.USER = this.navParams.data.USER;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasesSvcproviderPage');
    if (typeof (this.USER) === 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.getAllPatients();
    }
  }

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
  }

  getAllPatients(){
    this.crudService.patientsGetAllOfServiceProvider(this.USER.U_ORG)
        .then((qSnap) => {
          this.PATIENTS = [];
          qSnap.forEach(doc => {
            let PAT = <iPatient>doc.data()
            this.PATIENTS.push(PAT);
          })
          console.log(this.PATIENTS);
        })
  }
}
