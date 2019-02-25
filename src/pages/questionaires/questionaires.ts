import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

/**
 * Generated class for the QuestionairesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionaires',
  templateUrl: 'questionaires.html',
})
export class QuestionairesPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Questionaires', VI: 'Bảng câu hỏi' },
    txtNew: { EN: 'NEW', VI: 'THÊM' },
    txtResults: { EN: 'RESULTS', VI: 'KẾT QUẢ' },
  };
  pageId = 'QuestionairesPage';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private langService: LangService,
    private localService: LocalService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionairesPage');
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.convertArray2Object();
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
  go2QuestionaireAddPage(){
    this.navCtrl.push('QuestionaireAddPage');
  }

}
