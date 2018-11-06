import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { iPatient } from '../../interfaces/patient.interface';
import { iUsr } from '../../interfaces/usr.interface';

@IonicPage()
@Component({
  selector: 'page-cases-list',
  templateUrl: 'cases-list.html',
})
export class CasesListPage {
  data; 
  DATA;
  USER: iUsr;
  PATIENTS: iPatient[] = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService
  ) {
    
    this.USER = this.navParams.data.USER;
    this.data = this.navParams.data;
    this.DATA = this.data.DATA;
    
    if (typeof (this.USER) === 'undefined' || typeof (this.DATA) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))
    }else{
      this.PATIENTS = this.data.DATA.PATIENTS;
    }
    console.log(this.USER, this.PATIENTS);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasesListPage');
    // this.crudService.patientsGetAllOfOrg(this.USER.U_ORG)
    //   .then((qSnap) => {
    //     this.PATIENTS = [];
    //     qSnap.forEach(doc => {
    //       let PAT = <iPatient>doc.data()
    //       this.PATIENTS.push(PAT);
    //     })
    //     console.log(this.PATIENTS);
    //   })
  }

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
  }

}
