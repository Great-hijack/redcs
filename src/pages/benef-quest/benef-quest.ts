import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { iQuestForm } from '../../interfaces/questform.interface';
import { CrudService } from '../../services/crud.service';
import { LangService } from '../../services/lang.service';
import { BenefQuestLang } from '../../languages/benef-quest.lang';
import { clone } from '@firebase/util';
@IonicPage()
@Component({
  selector: 'page-benef-quest',
  templateUrl: 'benef-quest.html',
})
export class BenefQuestPage {
  ANSWER: iQuestForm;
  QUESTIONSX;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private langService: LangService
  ) {

    this.ANSWER = this.localService.getQuestionsDefault();
    this.initLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceFeedbackPage');
  }

  addFeedback() {
    console.log(this.ANSWER);
    // this.crudService.feedbackNewAdd(this.ANSWER)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch(err => console.log(err))
  }

  cancel(){
    this.ANSWER = this.localService.getQuestionsDefault();
    this.navCtrl.canGoBack()? this.navCtrl.pop(): this.navCtrl.setRoot('HomePage');
  }

  initLang() {
    let lang = new BenefQuestLang();
    let i = this.langService.index;
    this.QUESTIONSX = lang.QUESTIONSX[i];
  }

}
