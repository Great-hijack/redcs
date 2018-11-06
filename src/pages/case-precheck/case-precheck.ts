import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { iUsr } from '../../interfaces/usr.interface';

@IonicPage()
@Component({
  selector: 'page-case-precheck',
  templateUrl: 'case-precheck.html',
})
export class CasePrecheckPage {
  data: any;
  USER: iUsr;
  PATIENT: iPatient;
  PATIENTS: iPatient[] =[];
  SEARCHSTR: string = '';
  EXISTING_PATIENT: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appService: AppService,
    private localService: LocalService,
    private crudService: CrudService
  ) {
    this.PATIENT = this.localService.PATIENT_DEFAULT;
    console.log(this.PATIENT);
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    if (typeof (this.USER) === 'undefined') {
      this.navCtrl.setRoot('HomePage')
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasePrecheckPage');
  }

  checkExistance(){
    console.log(this.SEARCHSTR);
    if(this.SEARCHSTR.trim() !==''){
      this.crudService.patientGetByResidentID(this.SEARCHSTR)
      .then((res)=>{
        if(res.empty){
          this.appService.alertMsg('Not exist', 'There is no record of this patient');
          this.PATIENT.PAT_RES_ID = this.SEARCHSTR;
          this.navCtrl.push('CaseInformationFillPage', {PATIENT: this.PATIENT, USER: this.USER})
        }else{
          this.PATIENTS =[];
          res.forEach(doc=>{
            let PAT = <iPatient>doc.data();
            this.PATIENTS.push(PAT);
          })
        }
      })
      .catch((err)=>{
        console.log(err);
      })
      // // check db then return result
      // this.EXISTING_PATIENT = false;
      // if(!this.EXISTING_PATIENT){
      //   this.PATIENT.PAT_RES_ID = this.SEARCHSTR;
      //   this.navCtrl.push('CaseInformationFillPage', {PATIENT: this.PATIENT})
      // }else{
      //   this.EXISTING_PATIENT = true;
      // }
    }
  }

  go2CaseDetailView(){
    // get case detail
    // go2CaseDetailView();
    console.log('go2CaseDetailView();');

  }

  go2CaseView(PAT: iPatient){
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
  }

}
