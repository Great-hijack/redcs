import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { AppService } from '../../services/app.service';
import { CaseViewLang } from '../../languages/case-view.lang';
import { LangService } from '../../services/lang.service';
import { MailService } from '../../services/mail.service';
@IonicPage()
@Component({
  selector: 'page-case-view',
  templateUrl: 'case-view.html',
})
export class CaseViewPage {
  data: any;
  USER: iUser;
  PATIENT: iPatient;
  OPTION: string;
  MOVEABILITIES = [];
  SERVICEPROVIDERS = [];
  hidden: boolean = true;
  PRIVACY: any;

  // LANGUAGES SETTING
  TITLE;
  lbPAT_KIND;
  lbPAT_STATE;
  lbPAT_CASENUMBER;
  textBasicInfo;
  lbPAT_FNAME;
  lbPAT_LNAME;
  lbPAT_YoB;
  lbPAT_SEX;
  lbPAT_TEL;
  textMailingAddress;
  lbPROVICE;
  lbDISTRICT;
  lbWARD;
  lbAddress;
  textResidentAddress;

  textNonAmputee;
  lbPAT_DISABLED_YEAR;
  lbPAT_DISABLED_TYPE;
  lbPAT_DISABLED_PARTS;
  lbPAT_DISABLED_REASONS;
  lbPAT_DISABLED_SUPPORT_RECEIVED;
  lbPAT_DISABLED_SUPPORT_TYPE;
  lbPAT_DISABLED_SUPPORT_RECEIVED_YEAR;
  lbPAT_DISABLED_LAST_SUPPORT_YEAR;
  lbPAT_DISABLED_LAST_SUPPORT_SPONSORS;

  textAmputee;
  lbPAT_AMPUTATION_YEAR;
  lbPAT_AMPUTATION_PARTS;
  lbPAT_AMPUTATION_REASONS;
  lbPAT_AMPUTATION_LEGS;
  lbPAT_AMPUTATION_LAST_LEG_YEAR;
  lbPAT_AMPUTATION_LAST_SPONSORS;

  textOTHER;
  lbPAT_JOB;
  lbPAT_DATE_CREATE;


  placeholderSearch;
  placeholderIDSearch;
  btnSearch;

  DoB;
  From;

  LANG = 'EN';
  LANGUAGES = [];

  SVPs = [
    { id: 'HCM', Center: 'HCMC', lastNumber: '00000' },
    { id: 'CTO', Center: 'Can Tho', lastNumber: '00000' },
    { id: 'DNG', Center: 'Da Nang', lastNumber: '00000' },
    { id: 'QNH', Center: 'Qui Nhon', lastNumber: '00000' },
  ];
  updatedSVPs: any[];
  selectedSVP: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private crudService: CrudService,
    private localService: LocalService,
    private appService: AppService,
    private langService: LangService,
    private mailService: MailService
  ) {
    this.data = this.navParams.data;
    this.PATIENT = this.data.PATIENT;
    this.USER = this.data.USER;
    this.OPTION = this.data.OPTION;
    if (typeof (this.data) === 'undefined' || !this.localService.BASIC_INFOS) {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY;
      this.SVPs = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
    }

    console.log(typeof (this.USER))
    if (typeof (this.USER) === 'undefined' || typeof (this.PATIENT) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))

    } else {
      this.hidden = false;
      if (this.localService.BASIC_INFOS) {
        this.MOVEABILITIES = this.localService.BASIC_INFOS.MOVEABILITIES;
        this.SERVICEPROVIDERS = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
      } else {
        this.crudService.getBasicData().then((res) => {
          console.log(res);
          this.MOVEABILITIES = this.localService.BASIC_INFOS.MOVEABILITIES;
          this.SERVICEPROVIDERS = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
        }).catch(err => console.log(err))
      }
      if (this.localService.USR) {
        this.USER = this.localService.USR;
      } else {
        this.crudService.getCurrentUsrProfile()
          .then(() => {
            this.USER = this.localService.USR;
          })
      }
      console.log(this.data);
    }

    this.initLang();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseViewPage');
    // let Case = this.getNumber('HCM', false);
    // console.log(Case);
  }

  go2CaseUpdate() {
    this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, ACTION: 'update' })
  }

  updateCaseByReferralLead(ACTION: string) {
    this.PATIENT.PAT_STATE = ACTION;
    this.PATIENT.PAT_REFLEAD_ID = this.USER.U_ID;
    this.crudService.patientUpdate(this.PATIENT)
      .then((res) => {
        console.log(res);
        this.mailService.sendEmail2NotifyCaseAccepted('tho@enablecode.vn')
          .subscribe((res) => {
            console.log(res);
          });
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  updateCaseByMoveAbility(ACTION: string) {
    switch (ACTION) {
      case 'APPROVED':
        if (this.PATIENT.PAT_SVP) {
          // this.crudService.getDocumentAtRefUrl('INFOS/SVPs').then((docSnap) => {
          //   this.SVPs = <any[]>docSnap.data().ServiceProviders;
          //   console.log(this.SVPs);
          //   // 
          // })
          this.doUpdateCase(ACTION);
        } else {
          this.appService.alertError('Oops', 'Please select service provider');
        }
        break;
      case 'REJECTED':
        this.doUpdateCase(ACTION);
        break;

      default:
        break;
    }

  }

  doUpdateCase(ACTION) {
    if (this.PATIENT.PAT_SVP) {
      this.PATIENT.PAT_STATE = ACTION;
      this.PATIENT.PAT_MVA_ID = this.USER.U_ID;
      this.crudService.patientUpdate(this.PATIENT)
        .then((res) => {
          console.log(res);
          return this.crudService.updateDocumentAtRefUrl('INFOS/SVPs', { ServiceProviders: this.updatedSVPs })

        })
        .then(res => {
          console.log(res);
          this.navCtrl.pop();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this.appService.alertError('Error', 'Please select service provider');
    }
  }

  go2CaseDetail(PAGE: string) {
    this.navCtrl.push(PAGE, { USER: this.USER, PATIENT: this.PATIENT });
  }

  updateDraft() {
    console.log('updateDraft');
    this.navCtrl.canGoBack() ? this.navCtrl.pop() : this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, USER: this.USER });
  }



  initLang() {
    this.LANG = this.langService.LANG;
    this.LANGUAGES = this.langService.LANGUAGES;
    let lang = new CaseViewLang();
    let i = this.langService.index;
    this.TITLE = lang.TITLE[i];
    this.lbPAT_KIND = lang.lbPAT_KIND[i];
    this.lbPAT_STATE = lang.lbPAT_STATE[i];
    this.lbPAT_CASENUMBER = lang.lbPAT_CASENUMBER[i]
    this.textBasicInfo = lang.textBasicInfo[i];
    this.lbPAT_FNAME = lang.lbPAT_FNAME[i];
    this.lbPAT_LNAME = lang.lbPAT_LNAME[i];
    this.lbPAT_YoB = lang.lbPAT_YoB[i];
    this.lbPAT_SEX = lang.lbPAT_SEX[i];
    this.lbPAT_TEL = lang.lbPAT_TEL[i];
    this.textMailingAddress = lang.textMailingAddress[i];
    this.lbPROVICE = lang.lbPROVICE[i];
    this.lbDISTRICT = lang.lbDISTRICT[i];
    this.lbWARD = lang.lbWARD[i];
    this.lbAddress = lang.lbAddress[i];
    this.textResidentAddress = lang.textResidentAddress[i];

    this.textNonAmputee = lang.textNonAmputee[i];
    this.lbPAT_DISABLED_YEAR = lang.lbPAT_DISABLED_YEAR[i];
    this.lbPAT_DISABLED_TYPE = lang.lbPAT_DISABLED_TYPE[i];
    this.lbPAT_DISABLED_PARTS = lang.lbPAT_DISABLED_PARTS[i];
    this.lbPAT_DISABLED_REASONS = lang.lbPAT_DISABLED_REASONS[i];
    this.lbPAT_DISABLED_SUPPORT_RECEIVED = lang.lbPAT_DISABLED_SUPPORT_RECEIVED[i];
    this.lbPAT_DISABLED_SUPPORT_TYPE = lang.lbPAT_DISABLED_SUPPORT_TYPE[i];
    this.lbPAT_DISABLED_SUPPORT_RECEIVED_YEAR = lang.lbPAT_DISABLED_SUPPORT_RECEIVED_YEAR[i];
    this.lbPAT_DISABLED_LAST_SUPPORT_YEAR = lang.lbPAT_DISABLED_LAST_SUPPORT_YEAR[i];
    this.lbPAT_DISABLED_LAST_SUPPORT_SPONSORS = lang.lbPAT_DISABLED_LAST_SUPPORT_SPONSORS[i];

    this.textAmputee = lang.textAmputee[i];
    this.lbPAT_AMPUTATION_YEAR = lang.lbPAT_AMPUTATION_YEAR[i];
    this.lbPAT_AMPUTATION_PARTS = lang.lbPAT_AMPUTATION_PARTS[i];
    this.lbPAT_AMPUTATION_REASONS = lang.lbPAT_AMPUTATION_REASONS[i];
    this.lbPAT_AMPUTATION_LEGS = lang.lbPAT_AMPUTATION_LEGS[i];
    this.lbPAT_AMPUTATION_LAST_LEG_YEAR = lang.lbPAT_AMPUTATION_LAST_LEG_YEAR[i];
    this.lbPAT_AMPUTATION_LAST_SPONSORS = lang.lbPAT_AMPUTATION_LAST_SPONSORS[i];

    this.textOTHER = lang.textOTHER[i];
    this.lbPAT_JOB = lang.lbPAT_JOB[i];
    this.lbPAT_DATE_CREATE = lang.lbPAT_DATE_CREATE[i];


    this.placeholderSearch = lang.placeholderSearch[i];
    this.placeholderIDSearch = lang.placeholderIDSearch[i];
    this.btnSearch = lang.btnSearch[i];

    this.DoB = lang.DoB[i];
    this.From = lang.From[i];
  }

  editByMA() {
    console.log(this.PATIENT);
    this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, ACTION: 'update', USER: this.USER });
  }


  selectServiceProvider() {
    console.log(this.selectedSVP);
    this.PATIENT.PAT_SVP = this.selectedSVP.Center;
    this.PATIENT.PAT_SVCPRO_ID = this.selectedSVP.id;

    this.crudService.getDocumentAtRefUrl('INFOS/SVPs').then((docSnap) => {
      this.updatedSVPs = <any[]>docSnap.data().ServiceProviders;
      console.log(this.updatedSVPs);
      let lastNumber = this.updatedSVPs.filter(svp => svp.id === this.selectedSVP.id)[0].lastNumber;
      let number = this.getNumber1(this.selectedSVP.id, lastNumber);
      this.PATIENT.PAT_CASENUMBER = number;
      let index = this.updatedSVPs.map(svp => svp.id).indexOf(this.selectedSVP.id);
      console.log(index);
      this.updatedSVPs[index].lastNumber = number.substr(number.length - 5);
      console.log(this.PATIENT, this.updatedSVPs);
    })

  }

  getSVPinfo() {
    this.crudService.getDocumentAtRefUrl('INFOS/SVPs')
      .then((docSnap) => {
        let DATA = docSnap.data();
        console.log(DATA);
      })
  }

  getNumber(CenterCode: string, isAmputee: boolean) {
    let CODES = {
      HCM: { Center: 'HCMC', lastNumber: '00300' },
      CTO: { Center: 'Can Tho', lastNumber: '00020' },
      DNG: { Center: 'Da Nang', lastNumber: '00340' },
      QNH: { Center: 'Qui Nhon', lastNumber: '00004' },
    };

    let number = (Number(CODES[CenterCode].lastNumber) + 1);
    let numberStr = number.toString();
    let strNumber = '00000'.substring(0, 5 - numberStr.length) + numberStr;
    CODES[CenterCode].lastNumber = strNumber;
    return this.assignICRCNumber(CenterCode, strNumber);
  }

  getNumber1(CenterCode: string, numberString: string) {

    let number = (Number(numberString) + 1);
    let numberStr = number.toString();
    let strNumber = '00000'.substring(0, 5 - numberStr.length) + numberStr;
    // TOTO: update new number to db
    // let index = this.SVPs.map(svp => svp.id).indexOf(this.selectedSVP.id);
    // this.SVPs[index].lastNumber = number.substr(number.length-5,5);
    return this.assignICRCNumber(CenterCode, strNumber);
  }

  assignICRCNumber(CenterCode: string, numberStr: string) {
    let isAmputee = this.PATIENT.PAT_KIND == 'AMPUTEE' ? true : false;
    switch (CenterCode) {
      case 'HCM':
        return isAmputee ? 'M' + numberStr : 'M8' + numberStr;
      case 'CTO':
        return isAmputee ? 'M71' + numberStr : 'M72' + numberStr;
      case 'DNG':
        return isAmputee ? 'M511' + numberStr : 'M512' + numberStr;
      case 'QNH':
        return isAmputee ? 'M56' + numberStr : 'M56' + numberStr;
      default:
        break;
    }
  }

  checkExistance() {
    console.log(this.PATIENT);
    this.navCtrl.push('CasePrecheckPage', { USER: this.USER, ResidentID: this.PATIENT.PAT_RES_ID, FName: this.PATIENT.PAT_FNAME, LName: this.PATIENT.PAT_LNAME })
  }

  submitCase2ReferralLead(){
    console.log(this.PATIENT);
  }




}