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
  DEFAULT_COST: any;
  COST: any;
  COST_C: any[] = [];
  COST_N: any[] = [];
  COST_P: any[] = [];
  TEMP: any;
  data: any;
  USER: iUser;
  PATIENT: iPatient;
  ROLE: string = '';
  PAT_COST = {};
  isAddNew = false;
  BASIC_INFO: any;
  PRICES = [];
  PRICES_OBJ: any;
  CENTER = 'HCM';
  TOTAL: number = 0;
  tesst = 100000000;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private crudService: CrudService,
    private loadingService: LoadingService,
    public appService: AppService,
    private langService: LangService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.PATIENT = this.data.PATIENT;
    console.log(this.PATIENT);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseCostPage');


    if (typeof (this.PATIENT) == 'undefined' || typeof (this.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.ROLE = this.USER.U_ROLE;
      this.initDefaultCost();
      this.BASIC_INFO = this.localService.BASIC_INFOS;

      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      this.PRICES_OBJ = this.localService.BASIC_INFOS.PRICES;
      let _PRICES = this.appService.convertObj2Array(Object.assign({}, this.localService.BASIC_INFOS.PRICES));
      this.CENTER = this.USER.U_ROLE !== 'Service Provider' ? this.PATIENT.PAT_SVCPRO_ID : this.USER.U_ORG.id;
      this.PRICES = _PRICES.slice().filter(ITEM => ITEM[this.CENTER]);
      console.log(this.PRICES);
      if (this.PATIENT.PAT_COST) {
        this.COST = this.PATIENT.PAT_COST;
        console.log(this.COST);
        this.seperateCost(this.COST);
      }
    }

    // this.testSplit();
  }

  seperateCost(OBJ: Object) {
    let KEYS = Object.keys(OBJ);
    let ARR = [];
    this.TOTAL = 0;
    KEYS.forEach(KEY => {
      let n = OBJ[KEY];
      let ITEM = {
        DATA: n,
        KEY: KEY
      };
      ARR.push(ITEM);
      let price = this.PRICES_OBJ[KEY][this.CENTER];
      let subTotal = price * n;
      this.TOTAL += subTotal;
    })
    console.log(ARR);
    this.COST_C = ARR.filter(ITEM => ITEM.KEY.substr(0, 1) == 'C');
    this.COST_N = ARR.filter(ITEM => ITEM.KEY.substr(0, 1) == 'N');
    this.COST_P = ARR.filter(ITEM => ITEM.KEY.substr(0, 1) == 'P');
    console.log(this.COST_C, this.COST_N, this.COST_P);
  }
  initDefaultCost() {
    let KEYS = Object.keys(this.localService.BASIC_INFOS.PRICES);
    let OBJ = {};
    KEYS.forEach(KEY => {
      OBJ[KEY] = 0;
    })
    this.DEFAULT_COST = OBJ;
    console.log(this.DEFAULT_COST);
    this.COST = this.DEFAULT_COST;
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
            console.log('OK', this.COST);
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

  isPaymentRequestCondition() {
    if (!this.isMilestoneFullFilled()) return false;
    if (
      this.PATIENT.PAT_STATE == 'PAYMENT REQUEST' ||
      this.PATIENT.PAT_STATE == 'PAYMENT APPROVED' ||
      this.PATIENT.PAT_STATE == 'PAID' ||
      this.PATIENT.PAT_STATE == 'CLOSED'
    ) return false;
    return true;
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
        this.navCtrl.pop();
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
  viewDetail(item) {
    console.log(item);
    let n: number = item.DATA;
    let price: number = this.PRICES_OBJ[item.KEY][this.CENTER];
    let total = n * price;
    let _msg = n.toString() + ' x ' + this.appService.convertNumber2CurrenyFormat(price.toString(), 'đ') + ' = ' + this.appService.convertNumber2CurrenyFormat(total.toString(), 'đ');
    this.appService.alertMsg(null, _msg);
  }
}
