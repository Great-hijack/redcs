import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { LangService } from '../../services/lang.service';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';

@IonicPage()
@Component({
  selector: 'page-language-update',
  templateUrl: 'language-update.html',
})
export class LanguageUpdatePage {
  data: any;
  pageId: string = 'temp';
  LANG = 'EN';
  LANGUAGES: string[] = [];

  LANGSObj = {};

  BASIC_INFOS: any;
  ITEMS_NAME: string = '';
  isEdit: boolean = false;
  isAddNew: boolean = false;
  index: number = null;
  SELECTED_ITEM: any;
  ITEMS: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private langService: LangService,
    private crudService: CrudService,
    private appService: AppService
  ) {


  }

  ionViewDidLoad() {
    this.initLang();
    console.log('ionViewDidLoad LanguageUpdatePage');
    if (typeof (this.navParams.data) == 'undefined' || !this.localService.BASIC_INFOS) {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.data = this.navParams.data;
      console.log(this.data);
      this.pageId = this.data.Page.pageId;
      this.ITEMS = this.data.ITEMS;
      this.BASIC_INFOS = this.localService.BASIC_INFOS;
      this.ITEMS_NAME = this.data.ITEMS_NAME;
      // this.removeAndSync();
      this.LANGSObj = this.localService.BASIC_INFOS.LANGUAGES;
      console.log(this.LANGSObj)
      console.log(this.LANGUAGES);
      this.ITEMS = this.LANGSObj[this.data.Page.pageId];
      // console.log(LANGS);
      // // this.ITEMS = this.convertObject2Array(LANGS);
      // console.log(this.ITEMS)
    }

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
    console.log(this.ITEMS);
    this.BASIC_INFOS.LANGUAGES[this.pageId] = this.ITEMS;
    // this.BASIC_INFOS[this.ITEMS_NAME] = this.ITEMS
    console.log(this.BASIC_INFOS);
    this.doUpdateBasicData();
    // // this.updateArrayOfObject();
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
    let ind = this.ITEMS.map(item => item.KEY).indexOf(this.SELECTED_ITEM.KEY);
    if (ind >= 0) {
      this.appService.alertError('Error', 'the KEY "' + this.SELECTED_ITEM.KEY + '" is existing. Choose another KEY');
      return;
    }
    this.ITEMS.push(this.SELECTED_ITEM);
    this.BASIC_INFOS.LANGUAGES[this.pageId] = this.ITEMS;
    this.doUpdateBasicData();
  }


  // convertObject2Array(OBJ: any) {
  //   let KEYS = Object.keys(OBJ);
  //   let ARR = [];
  //   KEYS.forEach(KEY => {
  //     let ITEM = OBJ[KEY];
  //     ITEM['KEY'] = KEY;
  //     ARR.push(ITEM);
  //   });
  //   return ARR;
  // }

}
