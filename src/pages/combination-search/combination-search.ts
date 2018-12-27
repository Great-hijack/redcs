import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';

import { CombineSearchLang } from '../../languages/combine-search.lang';
import { LangService } from '../../services/lang.service';

@IonicPage()
@Component({
  selector: 'page-combination-search',
  templateUrl: 'combination-search.html',
})
export class CombinationSearchPage {
  COMBINATION = {
    PAT_YoB: '',
    PAT_AMP_DATE: '',
    PAT_SP: ''
  }

  SERVICEPROVIDERS = ['SP1', 'SP2', 'SP3'];
  TITLE;
  lbDoB;
  lbAmpDate;
  lbSP;
  btnSearch;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private langService: LangService
  ) {
    this.initLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CombinationSearchPage');
  }

  initLang() {
    let lang = new CombineSearchLang();
    let i = this.langService.index;
    this.TITLE = lang.TITLE[i];
    this.lbAmpDate = lang.lbAmpDate[i];
    this.lbDoB = lang.lbDoB[i];
    this.lbSP = lang.lbSP[i];
    this.btnSearch = lang.btnSearch[i];
  }

  searchCombination() {
    console.log(this.COMBINATION);
    this.crudService.getPatientsWithCombination(this.COMBINATION.PAT_YoB, this.COMBINATION.PAT_AMP_DATE, this.COMBINATION.PAT_SP)
      .then(res => {
        console.log(res);
      })
  }

}
