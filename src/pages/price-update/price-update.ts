import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';


@IonicPage()
@Component({
  selector: 'page-price-update',
  templateUrl: 'price-update.html',
})
export class PriceUpdatePage {
  LANG = 'EN';
  data: any;
  USER: iUser;
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
  ACCESSORIES = {}
  selected_SP: iSP = null;
  PRICES: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private appService: AppService,
    private langService: LangService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.BASIC_INFOS = this.localService.BASIC_INFOS;
    if (typeof (this.USER) === 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.ServiceProviders = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
      console.log(this.ServiceProviders);
      this.getListNamesOfAccessories();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceUpdatePage');
    this.initLang();
  }

  update() {
    console.log(this.PRICES);
    this.BASIC_INFOS['PRICES'][this.selected_SP.id] = this.PRICES;
    console.log(this.BASIC_INFOS);
    this.crudService.updateDocumentAtRefUrl('INFOS/BASIC', this.BASIC_INFOS)
      .then((res) => {
        this.PRICES = this.DEFAULT_PRICES;
        console.log(res);
        this.appService.toastMsg('Database updated successfully', 3000);
        // this.navCtrl.pop();
        this.selected_SP = null;
      })
      .catch(err => console.log(err));
  }

  selectProvider(SP: iSP) {
    this.PRICES = this.DEFAULT_PRICES;
    this.selected_SP = SP;
    console.log(this.selected_SP);
    this.PRICES = this.BASIC_INFOS.PRICES[this.selected_SP.id];
  }

  getListNamesOfAccessories() {
    let ARRAY: any[] = this.BASIC_INFOS.ACCESSORIES;
    let ACCESSORIES = {};
    ARRAY.forEach(item => {
      ACCESSORIES[item.KEY] = item;
    })
    console.log(ACCESSORIES);
    this.ACCESSORIES = ACCESSORIES;
  }

  initLang() {
    this.LANG = this.langService.LANG;
  }

}

export interface iSP {
  Center: string,
  id: string,
  lastNumber: string
}
