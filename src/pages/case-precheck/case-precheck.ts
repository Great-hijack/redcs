import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { iUsr } from '../../interfaces/usr.interface';
import { LangService } from '../../services/lang.service';
import { CasePrecheckLang } from '../../languages/case-precheck.lang';
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

  // Language setting
  TITLE;
  btnCheckExistance;
  textAlert;
  alertNotExist;
  alertThere_is_no_record_of_this_patient;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appService: AppService,
    private localService: LocalService,
    private crudService: CrudService,
    private langService: LangService
  ) {
    this.PATIENT = this.localService.PATIENT_DEFAULT;
    console.log(this.PATIENT);
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    if (typeof (this.USER) === 'undefined') {
      this.navCtrl.setRoot('HomePage')
    }
    this.initLang();
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
          this.appService.alertMsg(this.alertNotExist, this.alertThere_is_no_record_of_this_patient);
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

  initLang(){
    let lang = new CasePrecheckLang();
    let i = this.langService.index;

    this.TITLE = lang.TITLE[i];
    this.btnCheckExistance = lang.btnCheckExistance[i];
    this.textAlert = lang.textAlert[i];
    this.alertNotExist = lang.alertNotExist[i];
    this.alertThere_is_no_record_of_this_patient = lang.alertThere_is_no_record_of_this_patient[i];
  }

}
