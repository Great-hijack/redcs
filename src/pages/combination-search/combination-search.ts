import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';

import { CombineSearchLang } from '../../languages/combine-search.lang';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-combination-search',
  templateUrl: 'combination-search.html',
})
export class CombinationSearchPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE : { EN: 'Combination Search', VI : 'Tiềm kiếm'},
    lbDoB : { EN: 'Date of Birth', VI : 'Ngày sinh'},
    lbAmpDate : { EN: 'Amputation Date', VI : 'Ngày cắt cụt'},
    lbSP : { EN: 'Service Provider', VI : 'Service Provider'},
    btnSearch : { EN: 'SEARCH', VI : 'TÌM'},
    btnMoveAbility : { EN: 'MoveAbility', VI : 'MoveAbility'},
  };
  pageId = 'CombinationSearchPage';

  COMBINATION = {
    PAT_YoB: '',
    PAT_AMP_DATE: '',
    PAT_SP: ''
  }

  SERVICEPROVIDERS = ['SP1', 'SP2', 'SP3'];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private langService: LangService,
    private localService: LocalService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CombinationSearchPage');
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

  searchCombination() {
    console.log(this.COMBINATION);
    this.crudService.getPatientsWithCombination(this.COMBINATION.PAT_YoB, this.COMBINATION.PAT_AMP_DATE, this.COMBINATION.PAT_SP)
      .then(res => {
        console.log(res);
      })
  }

}
