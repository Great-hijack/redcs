import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';

@IonicPage()
@Component({
  selector: 'page-cases-reflead',
  templateUrl: 'cases-reflead.html',
})
export class CasesRefleadPage {
  USER: iUsr;
  PATIENTS: iPatient[] = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService
  ) {
    this.USER = this.navParams.data.USER;
    if (typeof (this.USER) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))
    }else{
      this.getAllCases();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    
  }

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
  }

  getAllCases(){
    this.crudService.patientsGetAllOfOrg(this.USER.U_ORG)
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
