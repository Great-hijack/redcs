import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

/**
 * Generated class for the PaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  data: any;
  USER: iUser
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private langService: LangService,
    private localService: LocalService
    ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsPage');
    if (this.localService.BASIC_INFOS) {
      // // 3. Get selected EN/VI
      // this.LANG = this.langService.LANG;
      // // 4. Get LANGUAGES from DB
      // this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      // console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  go2PaymentRequest(){
    this.navCtrl.push('CasesViewPage', { USER: this.USER, OPTION: 'OPTION', STATES: ['PAYMENT REQUEST'] });
  }

  go2PaymentAccepted(){
    this.navCtrl.push('CasesViewPage', { USER: this.USER, OPTION: 'OPTION', STATES: ['PAYMENT APPROVED'] });
  }

}
