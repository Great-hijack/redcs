import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { LangService } from '../../services/lang.service';

@IonicPage()
@Component({
  selector: 'page-cases-list',
  templateUrl: 'cases-list.html',
})
export class CasesListPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE : { EN: 'Case Lists', VI : 'Danh Sách'},
  };
  pageId = 'CasesListPage';

  data;
  DATA;
  USER: iUser;
  PATIENTS: iPatient[] = []


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private langService: LangService
  ) {

    this.USER = this.navParams.data.USER;
    this.data = this.navParams.data;
    this.DATA = this.data.DATA;

    if (typeof (this.USER) === 'undefined' || typeof (this.DATA) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))
    } else {
      this.PATIENTS = this.data.DATA.PATIENTS;
    }
    console.log(this.USER, this.PATIENTS);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasesListPage');
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    } else {
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

  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
  }

}
