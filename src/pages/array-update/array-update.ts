import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangService } from '../../services/lang.service';
import { CrudService } from '../../services/crud.service';

@IonicPage()
@Component({
  selector: 'page-array-update',
  templateUrl: 'array-update.html',
})
export class ArrayUpdatePage {
  LANG = 'EN';
  LANGUAGES = [];
  lbItemsUpdate = { EN: 'Items Update', VI: 'Cập nhật' };
  lbNew = { EN: 'New', VI: 'Thêm' };

  BASIC_INFOS: any;
  ITEMS: any[] = [];
  ITEMS_NAME: string = '';
  isEdit: boolean = false;
  isAddNew: boolean = false;
  index: number = null;
  SELECTED_ITEM: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private langService: LangService,
    private crudService: CrudService,
  ) {

    if (typeof (this.navParams.data) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      let data = this.navParams.data;
      console.log(data);
      this.ITEMS = data.ITEMS;
      this.BASIC_INFOS = data.BASIC_INFOS;
      this.ITEMS_NAME = data.ITEMS_NAME;
      // this.removeAndSync();
    }
  }

  removeAndSync() {
    this.BASIC_INFOS.DISABLED_PARTS = this.BASIC_INFOS.AMPUTATION_PARTS;
    this.BASIC_INFOS.DISABLED_REASONS = this.BASIC_INFOS.AMPUTATION_REASONS;
    this.BASIC_INFOS.DISABLED_SPONSORS = this.BASIC_INFOS.AMPUTATION_SPONSORS;
    console.log(this.BASIC_INFOS);
    this.doUpdateBasicData();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ArrayUpdatePage');
    this.initLang();
  }

  initLang() {
    this.LANG = this.langService.LANG;
    this.LANGUAGES = this.langService.LANGUAGES;
  }

  selectItem(ITEM: any, i: number) {
    console.log(ITEM, i);
    this.isEdit = true;
    this.isAddNew = false;
    this.SELECTED_ITEM = ITEM;
    this.index = i;
  }

  cancel() {
    this.isEdit = false;
    this.SELECTED_ITEM = null;
    this.index = null;
    this.isAddNew = false;
  }

  updateItem() {
    console.log(this.SELECTED_ITEM);
    this.ITEMS[this.index] = this.SELECTED_ITEM;
    this.BASIC_INFOS[this.ITEMS_NAME] = this.ITEMS
    console.log(this.BASIC_INFOS);
    this.doUpdateBasicData();
    // this.updateArrayOfObject();
  }

  doUpdateBasicData() {
    this.crudService.updateBasicData(this.BASIC_INFOS)
      .then((res) => {
        console.log(res);
        this.cancel();
      })
      .catch(err => {
        console.log(err);
        this.cancel();
      })

  }

  addNewItem() {
    this.SELECTED_ITEM = {};
    this.LANGUAGES.forEach(L => {
      this.SELECTED_ITEM[L] = null;
    })
    this.isEdit = false;
    this.isAddNew = true;
  }

  doAddNewItem() {
    console.log(this.SELECTED_ITEM);
    this.ITEMS.push(this.SELECTED_ITEM);
    this.BASIC_INFOS[this.ITEMS_NAME] = this.ITEMS;
    this.doUpdateBasicData();
  }
}
