import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';



@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  items: any[] = [
    { name: 'Jobs', item_name: 'JOBS' },
    { name: 'Amputation Parts', item_name: 'AMPUTATION_PARTS' },
    { name: 'Amputation Reasons', item_name: 'AMPUTATION_REASONS' },
    { name: 'Amputation Sponsors', item_name: 'AMPUTATION_SPONSORS' },
    { name: 'Disabled Parts', item_name: 'DISABLED_PARTS' },
    { name: 'Disabled Reasons', item_name: 'DISABLED_REASONS' },
    { name: 'Disabled Sponsors', item_name: 'DISABLED_SPONSORS' },
    { name: 'Accessories', item_name: 'ACCESSORIES' },
    { name: 'Some', page: 'SomePage' },
  ]
  BASIC_INFOS: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService
  ) {
    if (localService.BASIC_INFOS) {
      this.BASIC_INFOS = this.localService.BASIC_INFOS;
    } else {
      this.crudService.getBasicData().then((res) => {
        console.log(res);
        this.BASIC_INFOS = this.localService.BASIC_INFOS;

      })
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  itemSelected(item: any) {
    console.log(item);
    // this.navCtrl.push(item.page, { BASIC_INFOS: this.BASIC_INFOS });
    this.navCtrl.push('ArrayUpdatePage',
      {
        ITEMS: this.BASIC_INFOS[item.item_name],
        ITEMS_NAME: item.item_name,
        BASIC_INFOS: this.BASIC_INFOS
      })
  }




}
