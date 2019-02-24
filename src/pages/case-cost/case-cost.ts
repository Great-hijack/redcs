import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { iPatient } from '../../interfaces/patient.interface';
import { CrudService } from '../../services/crud.service';
import { LoadingService } from '../../services/loading.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-case-cost',
  templateUrl: 'case-cost.html',
})
export class CaseCostPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    lbCostInTotal: { EN: 'Cost in Total' },
    lbAddNewCost: { EN: 'Add New Cost' },
    lbProstheses: { EN: 'PROSTHESES' },
    lbAboveKneeProsthese: { EN: 'Above knee prosthese' },
    lbBelowKneeProsthese: { EN: 'Below knee prosthese' },
    lbBelowKneeProstheseWithHighCorset: { EN: 'Below knee prosthese with high corset' },
    lbTransTibalShortStumpWithHight: { EN: 'Trans-Tibal, short stump with hight' },
    lbKneeDisarticulaationProsthese: { EN: 'Knee disarticulaation prosthese' },
    lbKMC: { EN: 'KMC' },
    lbMangNhuaCang: { EN: 'Mang nhua cang' },
    lbAccessories: { EN: 'ACCESSORIES' },
    lbSubsidies: { EN: 'SUBSIDIES' },
    lbUpdate: { EN: 'Update' },
    lbPaymentRequest: { EN: 'PaymentRequest' },
  };

  pageId = 'CaseCostPage';
  DEFAULT_COST: any = {
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    A5: 0,
    A6: 0,
    A7: 0,
    B1: 0,
    B2: 0,
    B3: 0,
    B4: 0,
    B5: 0,
    B6: 0,
    B7: 0,
    C1: 0,
    C2: 0,
    C3: 0,
  };
  COST: any;
  TEMP: any;
  data: any;
  USER: iUser;
  PATIENT: iPatient;
  ROLE: string = '';
  PAT_COST = {};
  isAddNew = false;
  BASIC_INFO: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private crudService: CrudService,
    private loadingService: LoadingService,
    private appService: AppService,
    private langService: LangService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.PATIENT = this.data.PATIENT;
    this.COST = this.DEFAULT_COST;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseCostPage');


    if (typeof (this.PATIENT) == 'undefined' || typeof (this.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.ROLE = this.USER.U_ROLE;
      if (this.PATIENT.PAT_COST)
        this.COST = this.PATIENT.PAT_COST;
      this.BASIC_INFO = this.localService.BASIC_INFOS;

      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.convertArray2Object();
    }
  }

  addNewCost() {
    this.isAddNew = true;
    console.log('Add new cost');
    this.TEMP = Object.assign({}, this.COST);
    this.COST = Object.assign({}, this.DEFAULT_COST);
  }

  confirmUpdateCost() {
    const confirm = this.alertCtrl.create({
      message: 'Are you sure?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('NO');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('OK');
            this.updateCost();
          }
        }
      ]
    });
    confirm.present();
  }

  updateCost() {
    console.log(this.COST);
    let TIMEStr = this.appService.getCurrentDateAndTimeString();
    this.PATIENT.PAT_COST_LIST[TIMEStr] = this.COST;
    // this.PATIENT.PAT_COST_LIST=Object.assign(this.PATIENT.PAT_COST_LIST, {TIMEStr: this.COST});
    let COST = this.merge2ObjectsWithValueCounted(this.COST, this.TEMP);
    this.PATIENT['PAT_COST'] = COST;
    console.log(COST);
    console.log(this.PATIENT);
    this.COST = COST;
    this.updatePatient();
  }


  merge2ObjectsWithValueCounted(Obj1, Obj2) {
    let keys1 = Object.keys(Obj1);
    let keys2 = Object.keys(Obj2);
    let newObj = Object.assign({}, Obj1);
    console.log(keys1, keys2, newObj);
    keys1.forEach(key => {
      let index = keys2.indexOf(key);
      if (index >= 0) {
        newObj[key] = Number(Obj1[key]) + Number((Obj2[key]));
      }
    })
    let finalObject = Object.assign(Obj2, newObj);
    console.log(finalObject);
    // { A1: 5, B1: 2, B2: 5, C2: 3 }
    return finalObject;
  }

  isMilestoneFullFilled() {
    let isFullFilled = false;
    let Milestone = this.PATIENT.PAT_MILESTONE.filter(m => m.length > 0);
    if (Milestone.length > 12) isFullFilled = true;
    return isFullFilled;
  }


  confirmPaymentRequest() {
    const confirm = this.alertCtrl.create({
      message: 'Are you sure?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('NO');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('OK');
            this.updatePaymentRequest();
          }
        }
      ]
    });
    confirm.present();
  }

  updatePaymentRequest() {
    this.PATIENT.PAT_STATE = 'PAYMENT REQUEST';
    this.updatePatient();
  }

  updatePatient() {
    this.loadingService.startLoading();
    this.crudService.patientUpdate(this.PATIENT)
      .then((res) => {
        console.log(res);
        this.isAddNew = false;
        this.loadingService.hideLoading();
      })
      .catch(err => {
        console.log(err);
        this.isAddNew = false;
        this.loadingService.hideLoading();
      })
  }

  justForUpdateLanguages() {
    let DATA = this.localService.BASIC_INFOS;
    console.log(this.LANGUAGES);
    DATA.LANGUAGES['CaseCostPage'] = this.LANGUAGES;
    console.log(DATA);
    this.crudService.updateBasicData(DATA)
      // this.crudService.updateDocumentAtRefUrl('INFOS/BASIC/LANGUAGES/caseCostPage',this.LANGUAGES)
      .then(res => { console.log(res) })
      .catch(err => { console.log(err) });
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
}
