import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangService } from '../../services/lang.service';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-array-update',
  templateUrl: 'array-update.html',
})
export class ArrayUpdatePage {

  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    lbItemsUpdate : { EN: 'Items Update', VI: 'Cập nhật' },
    lbNew : { EN: 'New', VI: 'Thêm' },
    lbCancel : { EN: 'Cancel', VI: 'Huỷ bỏ' },
    lbUpdate : { EN: 'Update', VI: 'Cập nhật' },
    lbAdd : { EN: 'Add', VI: 'Thêm' },
    lbAddNewHere : { EN: 'Add new here', VI: 'Thêm mới tại đây' },
  };
  pageId = 'ArrayUpdatePage';

  LANGS=['EN','VI'];

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
    private localService: LocalService
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
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      //this.LANGUAGES = this.convertArray2Object();
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
    this.LANGS.forEach(L => {
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
