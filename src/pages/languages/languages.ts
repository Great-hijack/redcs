import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';

@IonicPage()
@Component({
  selector: 'page-languages',
  templateUrl: 'languages.html',
})
export class LanguagesPage {

  PAGES = [
    { pageName: 'Case Cost', pageId: 'CaseCostPage', pageUrl: 'case-cost' },
    { pageName: 'Case View', pageId: 'CaseViewPage', pageUrl: 'case-view' },
    { pageName: 'New Registration', pageId: 'CaseInformationFillPage', pageUrl: 'case-information-fill' },
    { pageName: 'Case Docs', pageId: 'CaseDocsPage', pageUrl: 'case-docs' },
    { pageName: '', pageId: '', pageUrl: '' },
    { pageName: '', pageId: '', pageUrl: '' },
  ]
  BASIC_INFOS: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagesPage');
    if (!this.localService.BASIC_INFOS) {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.BASIC_INFOS = this.localService.BASIC_INFOS;
      this.updateDB();
    }
  }

  pageSelected(page) {
    console.log(page);
    this.navCtrl.push('LanguageUpdatePage', { Page: page })
  }

  updateDB() {
    let LANGUAGES = {
      lbDocuments: { EN: 'Documents', VI: 'Tài liệu' },
      lbUpload: { EN: 'Upload', VI: 'Tải lên' },
      lbBy: { EN: 'By', VI: 'Bởi' },
      lbOn: { EN: 'On', VI: 'Lúc' }
    }
    let pageId = 'CaseDocsPage';
    let ARR: any[] = this.convertObject2Array(LANGUAGES);
    this.BASIC_INFOS.LANGUAGES[pageId] = ARR;
    console.log(this.BASIC_INFOS);
    this.doUpdateBasicData();
  }


  convertObject2Array(OBJ: any) {
    let KEYS = Object.keys(OBJ);
    let ARR = [];
    KEYS.forEach(KEY => {
      let ITEM = OBJ[KEY];
      ITEM['KEY'] = KEY;
      ARR.push(ITEM);
    });
    return ARR;
  }

  doUpdateBasicData() {
    this.crudService.updateBasicData(this.BASIC_INFOS)
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

  }
}
