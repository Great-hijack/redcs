import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../services/account.service';
import { AppService } from '../../services/app.service';
import { iUsr } from '../../interfaces/usr.interface';
import { LangService } from '../../services/lang.service';
import { RefleadAdminLang } from '../../languages/reflead-admin.lang';
@IonicPage()
@Component({
  selector: 'page-reflead-admin',
  templateUrl: 'reflead-admin.html',
})
export class RefleadAdminPage {
  data: any;
  USER: iUsr
  userExpired: boolean = true;

  TITLE: any;
  txtCASES: any;
  txtADDNEW: any;
  txtAPPOINTMENT: any;
  txtBENEFICIARY_QUESTIONAIRE: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountService: AccountService,
    private appService: AppService,
    private langService: LangService
  ) {
    this.initLang();
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    if (typeof (this.USER) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))
    } else {
      this.userExpired = this.accountService.isUserExpired(this.USER);
      if (this.userExpired) this.navCtrl.setRoot('HomePage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefleadAdminPage');

  }

  getCases() {
    // this.navCtrl.push('CasesRefleadPage', { USER: this.USER });
    this.navCtrl.push('CasesViewPage', { USER: this.USER });
  }

  go2Appointment() {
    this.navCtrl.push('AppointmentsPage', { USER: this.USER })
  }

  initLang() {
    let i = this.langService.index;
    let lang = new RefleadAdminLang();
    this.TITLE = lang.TITLE[i];
    this.txtCASES = lang.txtCASES[i];
    this.txtADDNEW = lang.txtADDNEW[i];
    this.txtAPPOINTMENT = lang.txtAPPOINTMENT[i];
    this.txtBENEFICIARY_QUESTIONAIRE = lang.txtBENEFICIARY_QUESTIONAIRE[i];
  }

}

