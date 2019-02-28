import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { LangService } from '../../services/lang.service';

@IonicPage()
@Component({
  selector: 'page-languages',
  templateUrl: 'languages.html',
})
export class LanguagesPage {

  PAGES = [
    { pageName: '1 Side Menu', pageId: 'MyApp', pageUrl: 'myapp' },
    { pageName: 'Account Login', pageId: 'AccountLoginPage', pageUrl: 'account-login' },
    { pageName: 'Account Register', pageId: 'AccountRegisterPage', pageUrl: 'account-register' },
    { pageName: 'Appointments', pageId: 'AppointmentsPage', pageUrl: 'appointments' },
    { pageName: 'Array Update', pageId: 'ArrayUpdatePage', pageUrl: 'array-update' },
    { pageName: 'Case Cost', pageId: 'CaseCostPage', pageUrl: 'case-cost' },
    { pageName: 'Case Docs', pageId: 'CaseDocsPage', pageUrl: 'case-docs' },
    { pageName: 'Case Images', pageId: 'CaseImagesPage', pageUrl: 'case-images' },
    { pageName: 'New Registration', pageId: 'CaseInformationFillPage', pageUrl: 'case-information-fill' },
    { pageName: 'Case Milestones', pageId: 'CaseMilestonesPage', pageUrl: 'case-milestones' },
    { pageName: 'Case Notes', pageId: 'CaseNotesPage', pageUrl: 'case-notes' },
    { pageName: 'Case Precheck', pageId: 'CasePrecheckPage', pageUrl: 'case-precheck' },
    { pageName: 'Case Questions', pageId: 'CaseQuestionsPage', pageUrl: 'case-questions' },
    { pageName: 'Case-Search', pageId: 'CaseSearchPage', pageUrl: 'case-search' },
    { pageName: 'Cases View', pageId: 'CasesViewPage', pageUrl: 'cases-view' },
    { pageName: 'Combination Search', pageId: 'CombinationSearchPage', pageUrl: 'combination-search' },
    { pageName: 'Home', pageId: 'HomePage', pageUrl: 'home' },
    { pageName: 'MoveAbility Admin', pageId: 'MoveabilityAdminPage', pageUrl: 'moveability-admin' },
    { pageName: 'Price Update', pageId: 'PriceUpdatePage', pageUrl: 'price-update' },
    { pageName: 'Privacy Update', pageId: 'PrivacyUpdatePage', pageUrl: 'privacy-update' },
    { pageName: 'Profile', pageId: 'ProfilePage', pageUrl: 'profile' },
    { pageName: 'Questionaires', pageId: 'QuestionairesPage', pageUrl: 'questionaires' },
    { pageName: 'Questionaire Add', pageId: 'QuestionaireAddPage', pageUrl: 'questionaire-add' },
    { pageName: 'Referral Admin', pageId: 'ReferralAdminPage', pageUrl: 'referral-admin' },
    { pageName: 'Referral Lead Admin', pageId: 'RefleadAdminPage', pageUrl: 'reflead-admin' },
    { pageName: 'Reports', pageId: 'ReportsPage', pageUrl: 'reports' },
    { pageName: 'Setting', pageId: 'SettingPage', pageUrl: 'setting' },
    { pageName: 'Service Provider Admin', pageId: 'SvcproAdminPage', pageUrl: 'svcpro-admin' },
    { pageName: 'Technical Assessment Add', pageId: 'TechnicalAssessmentAddPage', pageUrl: 'technical-assessment-add' },
    { pageName: 'Technical Assessment', pageId: 'TechnicalAssessmentPage', pageUrl: 'technical-assessment' },
    { pageName: 'User Detail View', pageId: 'UserDetailViewPage', pageUrl: 'user-detail-view' },
    { pageName: 'User Manage', pageId: 'UserManagePage', pageUrl: 'user-manage' },
    

  ]
  BASIC_INFOS: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private langService: LangService
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
    let pageId = 'temp';
    let LANGUAGES = {};
    // COPY from page.ts and PASTE here
    LANGUAGES = {
      TITLE: { EN: 'Reports', VI: 'Báo cáo' },
      txtUserReport: { EN: 'Users report', VI: 'Báo cáo người dùng' },
      txtDownload: { EN: 'Download', VI: 'Tải về' },

    };
    pageId = 'ReportsPage';
    let ARR: any[] = this.langService.convertObject2Array(LANGUAGES);
    this.BASIC_INFOS.LANGUAGES[pageId] = ARR;
    console.log(this.BASIC_INFOS);
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
