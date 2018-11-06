import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { iPatient } from '../../interfaces/patient.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';

/**
 * Generated class for the CasesReferralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cases-referral',
  templateUrl: 'cases-referral.html',
})
export class CasesReferralPage {
  data: any;
  USER: iUsr;
  PATIENTS: iPatient[] = []
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private crudService: CrudService,
    private appService: AppService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    console.log(this.data);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasesReferralPage');
    if(typeof(this.USER) =='undefined'){
      this.navCtrl.setRoot('HomePage');
    }else{
      this.getAllCases();
    }
    
  }

  getAllCases(){
    this.PATIENTS =[];
    this.crudService.patientGetAllsOfReferral(this.USER.U_ID)
    .then((qSnap)=>{
      qSnap.forEach(doc=>{
        let PAT = <iPatient>doc.data();
        this.PATIENTS.push(PAT);
      })
    })
  }

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER})
  }

}
