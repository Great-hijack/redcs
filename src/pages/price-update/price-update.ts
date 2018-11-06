import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';


@IonicPage()
@Component({
  selector: 'page-price-update',
  templateUrl: 'price-update.html',
})
export class PriceUpdatePage {
  data: any;
  USER: iUsr;
  BASIC_INFOS;
  ServiceProviders = [];
  DEFAULT_PRICES: any = {
    A1: '',
    A2: '',
    A3: '',
    A4: '',
    A5: '',
    A6: '',
    A7: '',
    B1: '',
    B2: '',
    B3: '',
    B4: '',
    B5: '',
    B6: '',
    B7: '',
    C1: '',
    C2: '',
    C3: '',
  }
  PRICES: any ={
    SPID: ''
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private appService: AppService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.BASIC_INFOS = this.localService.BASIC_INFOS;
    if (typeof (this.USER) === 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.ServiceProviders = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
      console.log(this.ServiceProviders);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceUpdatePage');
  }

  update() {
    console.log(this.PRICES);
    // this.BASIC_INFOS = this.localService.BASIC_INFOS;
    // let data = {
    //   [this.PRICES.SPID]: this.PRICES
    // }
    this.BASIC_INFOS['PRICES'][this.PRICES.SPID] = this.PRICES;
    console.log(this.BASIC_INFOS);
    this.crudService.updateData('INFOS/BASIC', this.BASIC_INFOS)
      .then((res) => {
        this.PRICES = this.DEFAULT_PRICES;
        console.log(res);
        this.appService.toastMsg('Database updated successfully', 3000);
        // this.navCtrl.pop();
      })
      .catch(err => console.log(err));
  }

  selectProvider(SP){
    this.PRICES = this.DEFAULT_PRICES;
    console.log(SP);
    let PRICES = this.BASIC_INFOS.PRICES[SP]
    if(typeof(PRICES) !=='undefined'){
      this.PRICES = PRICES;
    }
  }

}
