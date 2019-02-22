import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { iPatient } from '../../interfaces/patient.interface';
import { CrudService } from '../../services/crud.service';
import { LoadingService } from '../../services/loading.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';

@IonicPage()
@Component({
  selector: 'page-case-cost',
  templateUrl: 'case-cost.html',
})
export class CaseCostPage {
  LANG = 'EN';
  LANGUAGES = [];
  lbCostInTotal = { EN: 'Cost in Total', VI: 'Tổng tiền' };
  lbAddNewCost = { EN: 'Add New Cost', VI: 'Thêm chi phí mới' };
  lbProstheses = { EN: 'PROSTHESES', VI: 'Chân giả' };
  lbAboveKneeProsthese = { EN: 'Above knee prosthese', VI: 'Chân giả trên đầu gối' };
  lbBelowKneeProsthese = { EN: 'Below knee prosthese', VI: 'Chân giả dưới đầu gối' };
  lbBelowKneeProstheseWithHighCorset = { EN: 'Below knee prosthese with high corset', VI: 'Chân giả dưới đầu gối với đai nịch' };
  lbTransTibalShortStumpWithHight = { EN: 'Trans-Tibal, short stump with hight', VI: 'Trans-Tibal, short stump with hight' };
  lbKneeDisarticulaationProsthese = { EN: 'Knee disarticulaation prosthese', VI: 'Khóp gối giả' };
  lbKMC = { EN: 'KMC', VI: 'KMC' };
  lbMangNhuaCang = { EN: 'Mang nhua cang', VI: 'Mang nhua cang' };
  lbAccessories = { EN: 'ACCESSORIES', VI: 'Phụ kiện' };
  lbSubsidies = { EN: 'SUBSIDIES', VI: 'Đối tượng' };

  lbUpdate = { EN: 'Update', VI: 'Cập nhật' };
  lbPaymentRequest = { EN: 'PaymentRequest', VI: 'Đề nghị thanh toán' };
  
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
  USER: iUsr;
  PATIENT: iPatient;
  ROLE: string = '';
  PAT_COST = {};
  isAddNew = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private crudService: CrudService,
    private loadingService: LoadingService,
    private appService: AppService,
    private langService: LangService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.PATIENT = this.data.PATIENT;
    this.COST = this.DEFAULT_COST;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseCostPage');
    this.LANG = this.langService.LANG;

    if (typeof (this.PATIENT) == 'undefined' || typeof (this.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.ROLE = this.USER.U_ROLE;
      if (this.PATIENT.PAT_COST)
        this.COST = this.PATIENT.PAT_COST;
    }

    // let Obj1 = {
    //   A1: 8,
    //   B1: 2,
    //   C2: 4
    // };
    // this.COST = this.merge2ObjectsWithValueCounted(this.DEFAULT_COST, Obj1);
  }

  addNewCost() {
    this.isAddNew = true;
    console.log('Add new cost');
    this.TEMP = Object.assign({}, this.COST);
    this.COST = Object.assign({}, this.DEFAULT_COST);
  }

  confirmUpdateCost() {
    const confirm = this.alertCtrl.create({
      // title: 'Confirme',
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


  merge2ObjectsWithValueCounted(Object1, Object2) {
    // let Obj1 = {
    //   A1: 'a',
    //   B1: 2,
    //   C2: 4
    // };
    // let Obj2 = {
    //   A1: 4,
    //   B2: 5
    // }
    let Obj1 = Object1;
    let Obj2 = Object2;
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


  confirmPaymentRequest(){
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

  updatePaymentRequest(){
    this.PATIENT.PAT_STATE = 'PAYMENT REQUEST';
    this.updatePatient();
  }

  updatePatient(){
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
}
