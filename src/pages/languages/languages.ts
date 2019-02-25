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
    { pageName: 'Case Images', pageId: 'CaseImagesPage', pageUrl: 'case-images' },
    { pageName: 'Case Questions', pageId: 'CaseQuestionsPage', pageUrl: 'case-questions' },
    { pageName: 'Case Notes', pageId: 'CaseNotesPage', pageUrl: 'case-notes' },
    { pageName: 'Case Milestones', pageId: 'CaseMilestonesPage', pageUrl: 'case-milestones' },
    { pageName: 'Appointments', pageId: 'AppointmentsPage', pageUrl: 'appointments' },
    { pageName: 'Questionaires', pageId: 'QuestionairesPage', pageUrl: 'questionaires' },
    { pageName: 'Questionaire Add', pageId: 'QuestionaireAddPage', pageUrl: 'questionaire-add' },
    { pageName: 'Cases View', pageId: 'CasesViewPage', pageUrl: 'cases-view' },
    { pageName: 'Home', pageId: 'HomePage', pageUrl: 'home' },
    { pageName: 'Home', pageId: 'HomePage', pageUrl: 'home' },
    { pageName: 'Home', pageId: 'HomePage', pageUrl: 'home' },
    { pageName: 'Home', pageId: 'HomePage', pageUrl: 'home' },

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
    let pageId = 'temp';
    let LANGUAGES = {};
    // COPY from page.ts and PASTE here
    LANGUAGES = {
      TITLE: { EN: 'Appointments', VI: 'Danh sách cuộc hẹn' },
      txtPreWeek: { EN: 'Pre Week', VI: 'Tuần trước' },
      txtNextWeek: { EN: 'Next Week', VI: 'Tuần sau' },
      txtAppointments: { EN: 'Appointments', VI: 'Cuộc hẹn' },
      txtDate: { EN: 'Date', VI: 'Thứ' },
      txtPatient: { EN: 'patient(s)', VI: 'BN' },
    };
    pageId = 'AppointmentsPage';
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
