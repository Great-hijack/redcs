import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { iQuestForm } from '../../interfaces/questform.interface';
import { CrudService } from '../../services/crud.service';
import { LangService } from '../../services/lang.service';
import { BenefQuestLang } from '../../languages/benef-quest.lang';
import { iUsr } from '../../interfaces/usr.interface';
import { AppService } from '../../services/app.service';
@IonicPage()
@Component({
  selector: 'page-benef-quest',
  templateUrl: 'benef-quest.html',
})
export class BenefQuestPage {
  ANSWER: iQuestForm;
  QUESTIONSX;
  USER: iUsr;
  data: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private langService: LangService,
    private appService: AppService
  ) {
    this.data = this.navParams.data;
    console.log(this.data);
    this.ANSWER = this.localService.getQuestionsDefault();
    this.initLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceFeedbackPage');
    if (typeof (this.data.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.USER = this.data.USER;
    }
  }

  addQuestionair() {
    console.log(this.ANSWER);
    this.ANSWER.REF_ID = this.USER.U_ID;
    this.crudService.questionaireNewAdd(this.ANSWER)
      .then((res) => {
        console.log(res);
        this.appService.toastMsg('Successful', 3000);
      })
      .catch(err => console.log(err))
  }

  cancel() {
    this.ANSWER = this.localService.getQuestionsDefault();
    this.navCtrl.canGoBack() ? this.navCtrl.pop() : this.navCtrl.setRoot('HomePage');
  }

  initLang() {
    let lang = new BenefQuestLang();
    let i = this.langService.index;
    this.QUESTIONSX = lang.QUESTIONSX[i];
  }

}
