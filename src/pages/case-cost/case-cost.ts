import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { iPatient } from '../../interfaces/patient.interface';
import { CrudService } from '../../services/crud.service';
import { LoadingService } from '../../services/loading.service';

@IonicPage()
@Component({
  selector: 'page-case-cost',
  templateUrl: 'case-cost.html',
})
export class CaseCostPage {

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
  COST;
  data: any;
  USER: iUsr;
  PATIENT: iPatient;
  ROLE: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private crudService: CrudService,
    private loadingService: LoadingService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.PATIENT = this.data.PATIENT;
    this.COST = this.DEFAULT_COST;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseCostPage');
    if (typeof (this.PATIENT) == 'undefined' || typeof (this.USER) == 'undefined' ) {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.ROLE = this.USER.U_ROLE;
      if (this.PATIENT.PAT_COST)
        this.COST = this.PATIENT.PAT_COST;
    }
  }

  updateCost() {
    this.loadingService.startLoading();
    console.log(this.COST);
    this.PATIENT['PAT_COST']=this.COST;
    this.crudService.patientUpdate(this.PATIENT)
    .then((res)=>{
      console.log(res);
      this.loadingService.hideLoading();
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
