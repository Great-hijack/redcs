import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

/**
 * Generated class for the TechnicalAssessmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technical-assessment',
  templateUrl: 'technical-assessment.html',
})
export class TechnicalAssessmentPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Assessment', VI: 'Thẩm định' },
    txtNew: { EN: 'NEW', VI: 'Thêm' },
    txtReports: { EN: 'REPORTS', VI: 'Báo cáo' },
    
  };
  pageId = 'TechnicalAssessmentPage';

  w: number;
  h: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private platform: Platform,
    private langService: LangService,
    private localService: LocalService
    ) {
    platform.ready().then((readySource) => {
      this.w = platform.width();
      this.h = platform.height();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicalAssessmentPage');
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }
  

  go2AddTAPage() {
    this.navCtrl.push('TechnicalAssessmentAddPage');
  }

  go2Report(){}

}
