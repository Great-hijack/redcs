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
    { pageName: 'Home', pageId: 'HomePage', pageUrl: 'home' },
    { pageName: 'Case Cost', pageId: 'CaseCostPage', pageUrl: 'case-cost' },
    { pageName: 'Case View', pageId: 'CaseViewPage', pageUrl: 'case-view' },
    { pageName: 'New Registration', pageId: 'CaseInformationFillPage', pageUrl: 'case-information-fill' },
    { pageName: 'Case Docs', pageId: 'CaseDocsPage', pageUrl: 'case-docs' },
    { pageName: 'Referral Admin', pageId: 'ReferralAdminPage', pageUrl: 'referral-admin' },
    { pageName: 'Service Provider Admin', pageId: 'SvcproAdminPage', pageUrl: 'svcpro-admin' },
    { pageName: 'Referral Lead Admin', pageId: 'RefleadAdminPage', pageUrl: 'reflead-admin' },
    { pageName: 'MoveAbility Admin', pageId: 'MoveabilityAdminPage', pageUrl: 'moveability-admin' },
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
      TITLE: { EN: 'Home', VI: 'Trang chủ' },
      btnSignUp: { EN: 'Sign up', VI: 'Đăng ký' },
      btnLogin: { EN: 'Login', VI: 'Đăng nhập' },
      btnSignOut: { EN: 'Sign out', VI: 'Đăng xuất' },
      btnContinue: { EN: 'Continue', VI: 'Tiếp tục' },
    };
    let pageId = 'HomePage';
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
