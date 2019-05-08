import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { iUser } from '../../interfaces/user.interface';
import { LangService } from '../../services/lang.service';
import { CasePrecheckLang } from '../../languages/case-precheck.lang';
import { stringify } from '@angular/compiler/src/util';
import { ViewController } from 'ionic-angular/navigation/view-controller';
@IonicPage()
@Component({
  selector: 'page-case-precheck',
  templateUrl: 'case-precheck.html',
})
export class CasePrecheckPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Existance', VI: 'KT Tồn tại' },
    btnCheckExistance: { EN: 'Check Existance', VI: 'Kiểm tra tồn tại' },
    textAlert: { EN: 'This patient is already existing.', VI: 'Dữ liệu bệnh nhân đang tồn tại' },
    alertNotExist: { EN: 'Not exist', VI: 'Không tồn tại' },
    alertThere_is_no_record_of_this_patient: { EN: 'There is no record of this patient', VI: 'Không có dữ liệu về người này' },
    txtPlaceholder: { EN: 'Enter resident ID', VI: 'Nhập ID để tìm' },
    txtPlaceholderResidentID: { EN: 'Enter Resident ID to search', VI: 'Nhập số CMND để tìm' },
    txtLName: { EN: 'Enter lname to search', VI: 'Nhập họ để tìm' },
    txtFName: { EN: 'Enter fname to search', VI: 'Nhập tên để tìm' },
  };
  pageId = 'CasePrecheckPage';

  data: any;
  USER: iUser;
  PATIENT: iPatient;
  PATIENTS: iPatient[] = [];
  // SEARCHSTR: string = '';
  ResidentID: string = '';
  LName: string = '';
  FName: string = '';
  EXISTING_PATIENT: boolean = false;
  CASENUMBER: string = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private appService: AppService,
    private localService: LocalService,
    private crudService: CrudService,
    private langService: LangService
  ) {

    this.data = this.navParams.data;
    console.log(this.data);
    if (Object.keys(this.data).length < 1) {
      console.log(Object.keys(this.data).length);
      this.navCtrl.setRoot('HomePage')
    } else {
      this.PATIENT = this.data.PAT;
      this.USER = this.data.USER;
      this.ResidentID = this.PATIENT.PAT_RES_ID;
      this.LName = this.PATIENT.PAT_LNAME;
      this.FName = this.PATIENT.PAT_FNAME;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasePrecheckPage');
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    } else {
      console.log(this.localService.BASIC_INFOS)
      this.navCtrl.setRoot('HomePage');
    }
  }
  convertArray2Object() {
    let LANGUAGES: any[] = this.localService.BASIC_INFOS.LANGUAGES[this.pageId];
    let OBJ: any = {}
    LANGUAGES.forEach(L => {
      OBJ[L.KEY] = L
    })
    console.log(OBJ);
    return OBJ;
  }

  // checkExistance() {
  //   console.log(this.ResidentID);
  //   if (this.ResidentID.trim() !== '') {
  //     this.crudService.patientGetByResidentID(this.ResidentID)
  //       .then((res) => {
  //         if (res.empty) {
  //           this.appService.alertMsg(this.LANGUAGES.alertNotExist[this.LANG], this.LANGUAGES.alertThere_is_no_record_of_this_patient[this.LANG]);
  //           this.PATIENT.PAT_RES_ID = this.ResidentID;
  //           this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, USER: this.USER })
  //         } else {
  //           this.PATIENTS = [];
  //           res.forEach(doc => {
  //             let PAT = <iPatient>doc.data();
  //             this.PATIENTS.push(PAT);
  //           })
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //     // // check db then return result
  //     // this.EXISTING_PATIENT = false;
  //     // if(!this.EXISTING_PATIENT){
  //     //   this.PATIENT.PAT_RES_ID = this.SEARCHSTR;
  //     //   this.navCtrl.push('CaseInformationFillPage', {PATIENT: this.PATIENT})
  //     // }else{
  //     //   this.EXISTING_PATIENT = true;
  //     // }
  //   }
  // }

  go2CaseDetailView() {
    // get case detail
    // go2CaseDetailView();
    console.log('go2CaseDetailView();');

  }

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
  }

  searchResidentID() {
    this.PATIENTS = [];
    console.log(this.ResidentID);
    this.crudService.patientGetByResidentID(this.ResidentID)
      .then((qSnap) => {
        if (qSnap.empty) {
          this.appService.alertMsg(this.LANGUAGES.alertNotExist[this.LANG], this.LANGUAGES.alertThere_is_no_record_of_this_patient[this.LANG]);
          // this.PATIENT.PAT_RES_ID = this.SEARCHSTR;
          // this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, USER: this.USER })
        } else {
          qSnap.forEach(doc => {
            let PAT = <iPatient>doc.data();
            if(PAT.PAT_CASENUMBER){
              this.PATIENTS.push(PAT);
            }
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  searchName() {
    console.log(this.LName, this.FName);
    this.PATIENTS = [];
    this.crudService.patientGetByLNameFName(this.LName, this.FName)
      .then((qSnap) => {
        if (qSnap.empty) {
          this.appService.alertMsg(this.LANGUAGES.alertNotExist[this.LANG], this.LANGUAGES.alertThere_is_no_record_of_this_patient[this.LANG]);
          // this.PATIENT.PAT_RES_ID = this.SEARCHSTR;
          // this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, USER: this.USER })
        } else {
          qSnap.forEach(doc => {
            let PAT = <iPatient>doc.data();
            if(PAT.PAT_CASENUMBER){
              this.PATIENTS.push(PAT);
            }
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  issearchResidentIDDisabled() {
    if (typeof (this.ResidentID) == 'undefined') {
      return true;
    } else {
      if (this.ResidentID.length < 1) {
        return true;
      } else {
        return false;
      }
    }
  }

  issearchNameDisabled() {
    if (typeof (this.FName) == 'undefined' || typeof (this.LName) == 'undefined') return true;
    if (this.FName.length < 1 || this.LName.length < 1) return true;
    return false;
  }

  selectPat(PAT: iPatient){
    console.log(PAT);
    this.CASENUMBER = PAT.PAT_CASENUMBER;
    this.doCancel()
  }

  doCancel() {
    this.viewCtrl.dismiss({ isCancel: true, CASENUMBER: this.CASENUMBER })
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

}
