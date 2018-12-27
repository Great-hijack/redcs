import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { LoadingService } from '../../services/loading.service';
import { LangService } from '../../services/lang.service';
import { PrivacyUpdateLang } from '../../languages/privacy-update.lang';
@IonicPage()
@Component({
  selector: 'page-privacy-update',
  templateUrl: 'privacy-update.html',
})
export class PrivacyUpdatePage {
  PRIVACY: any;

  // LANGUAGESE SETTING
  TITLE;
  headerBasicInfo;
  lbFName;
  lbLName;
  lbDoB;
  lbGender;
  lbTel;
  headerMAILADDRESS;
  headerRESADDRESS;
  lbPROVINCE;
  lbDISTRICT;
  lbWARD;
  lbAddress;
  headerNON_AMPUTEE;
  lbYoDisability;
  lbToDisability;
  lbDisabledParts;
  lbDisbaledReasons;
  lbReceivedSupportBefore;
  lbWhatSupport;
  lbYoReceivedSupport;
  lbYoLastSupport;
  lbDisabledLastSponsors;
  headerAMPUTEE;
  lbAMPUTATIONDATE;
  lbAMPUTATIONLEVELs;
  lbAMPUTATIONCAUSE;
  lbHowManyAmputations;
  lbLASTFITTINGDATE;
  lbAMPUTATIONSPONSOR;
  headerOTHER;
  lbCURRENTJOB;
  lbCreatedOn;
  btnCancel;
  btnUpdate;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private loadingService: LoadingService,
    private langService: LangService
  ) {
    this.PRIVACY = this.localService.PRIVACY_DEFAULT;
    this.initLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyUpdatePage');
    if (this.localService.BASIC_INFOS) {
      this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY;
    } else {
      this.crudService.getBasicData()
        .then(() => {
          this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY;
        })
    }
  }

  updatePrivacy() {
    console.log(this.PRIVACY);
    this.loadingService.startLoading();
    if (this.localService.BASIC_INFOS_GOT) {
      let BASIC_DATA = this.localService.BASIC_INFOS;
      BASIC_DATA['PRIVACY'] = this.PRIVACY;
      console.log(BASIC_DATA);
      this.updateBasicData(BASIC_DATA);
    } else {
      this.crudService.getBasicData().then(res => {
        let BASIC_DATA = this.localService.BASIC_INFOS;
        BASIC_DATA['PRIVACY'] = this.PRIVACY;
        console.log(BASIC_DATA);
        this.updateBasicData(BASIC_DATA);
      })
    }
  }

  updateBasicData(DATA) {
    this.crudService.updateBasicData(DATA)
      .then(res => {
        console.log(res);
        this.loadingService.hideLoading();
        this.navCtrl.pop();
      })
      .catch(err => {
        console.log(err);
        this.loadingService.hideLoading();
      })
  }

  cancel() {
    this.navCtrl.pop();
  }

  initLang() {
    let lang = new PrivacyUpdateLang();
    let i = this.langService.index;
    this.TITLE = lang.TITLE[i];
    this.headerBasicInfo = lang.headerBasicInfo[i];
    this.lbFName = lang.lbFName[i];
    this.lbLName = lang.lbLName[i];
    this.lbDoB = lang.lbDoB[i];
    this.lbGender = lang.lbGender[i];
    this.lbTel = lang.lbTel[i];
    this.headerMAILADDRESS = lang.headerMAILADDRESS[i];
    this.headerRESADDRESS = lang.headerRESADDRESS[i];
    this.lbPROVINCE = lang.lbPROVINCE[i];
    this.lbDISTRICT = lang.lbDISTRICT[i];
    this.lbWARD = lang.lbWARD[i];
    this.lbAddress = lang.lbAddress[i];
    this.headerNON_AMPUTEE = lang.headerNON_AMPUTEE[i];
    this.lbYoDisability = lang.lbYoDisability[i];
    this.lbToDisability = lang.lbToDisability[i];
    this.lbDisabledParts = lang.lbDisabledParts[i];
    this.lbDisbaledReasons = lang.lbDisbaledReasons[i];
    this.lbReceivedSupportBefore = lang.lbReceivedSupportBefore[i];
    this.lbWhatSupport = lang.lbWhatSupport[i];
    this.lbYoReceivedSupport = lang.lbYoReceivedSupport[i];
    this.lbYoLastSupport = lang.lbYoLastSupport[i];
    this.lbDisabledLastSponsors = lang.lbDisabledLastSponsors[i];
    this.headerAMPUTEE = lang.headerAMPUTEE[i];
    this.lbAMPUTATIONDATE = lang.lbAMPUTATIONDATE[i];
    this.lbAMPUTATIONLEVELs = lang.lbAMPUTATIONLEVELs[i];
    this.lbAMPUTATIONCAUSE = lang.lbAMPUTATIONCAUSE[i];
    this.lbHowManyAmputations = lang.lbHowManyAmputations[i];
    this.lbLASTFITTINGDATE = lang.lbLASTFITTINGDATE[i];
    this.lbAMPUTATIONSPONSOR = lang.lbAMPUTATIONSPONSOR[i];
    this.headerOTHER = lang.headerOTHER[i];
    this.lbCURRENTJOB = lang.lbCURRENTJOB[i];
    this.lbCreatedOn = lang.lbCreatedOn[i];
    this.btnCancel = lang.btnCancel[i];
    this.btnUpdate = lang.btnUpdate[i];

  }

}
