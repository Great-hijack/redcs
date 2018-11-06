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
    { name: 'Jobs', page: 'JobUpdatePage' },
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

  itemSelected(item) {
    console.log(item);
    this.navCtrl.push(item.page, { BASIC_INFOS: this.BASIC_INFOS });
  }

}
