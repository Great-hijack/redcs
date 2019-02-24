import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { MailService } from '../../services/mail.service';
import { iUser } from '../../interfaces/user.interface';
@IonicPage()
@Component({
  selector: 'page-case-view',
  templateUrl: 'case-view.html',
})
export class CaseViewPage {
  pageId = 'CaseViewPage';
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'CASE VIEW' },
    lbPAT_KIND: { EN: 'Kind of Patient' },
    lbPAT_STATE: { EN: 'Status' },
    lbPAT_CASENUMBER: { EN: 'Case Number' },
    textBasicInfo: { EN: 'BASIC INFORMATION' },
    lbPAT_FNAME: { EN: 'First Name' },
    lbPAT_LNAME: { EN: 'Last Name' },
    lbPAT_YoB: { EN: 'Date of Birth' },
    lbPAT_SEX: { EN: 'Gender' },
    lbPAT_TEL: { EN: 'Tel' },
    textMailingAddress: { EN: 'MAILING ADDRESS' },
    lbPROVICE: { EN: 'PROVINCE' },
    lbDISTRICT: { EN: 'DISTRICT' },
    lbWARD: { EN: 'WARD' },
    lbAddress: { EN: 'Address' },
    textResidentAddress: { EN: 'RESIDENCE ADDRESS' },

    textNonAmputee: { EN: 'NON AMPUTEE' },
    lbPAT_DISABLED_YEAR: { EN: 'Year of Disability' },
    lbPAT_DISABLED_TYPE: { EN: 'Type of Disability' },
    lbPAT_DISABLED_PARTS: { EN: 'Disabled Parts' },
    lbPAT_DISABLED_REASONS: { EN: 'Disabled Reasons' },
    lbPAT_DISABLED_SUPPORT_RECEIVED: { EN: 'Received support before?' },
    lbPAT_DISABLED_SUPPORT_TYPE: { EN: 'What support?' },
    lbPAT_DISABLED_SUPPORT_RECEIVED_YEAR: { EN: 'Year of Received Support' },
    lbPAT_DISABLED_LAST_SUPPORT_YEAR: { EN: 'Year of Last Support' },
    lbPAT_DISABLED_LAST_SUPPORT_SPONSORS: { EN: 'Disabled Last Sponsors' },

    textAmputee: { EN: 'AMPUTEE' },
    lbPAT_AMPUTATION_YEAR: { EN: 'AMPUTATION DATE' },
    lbPAT_AMPUTATION_PARTS: { EN: 'AMPUTATION LEVELs' },
    lbPAT_AMPUTATION_REASONS: { EN: 'AMPUTATION CAUSE' },
    lbPAT_AMPUTATION_LEGS: { EN: 'How many amputations' },
    lbPAT_AMPUTATION_LAST_LEG_YEAR: { EN: 'LAST FITTING DATE' },
    lbPAT_AMPUTATION_LAST_SPONSORS: { EN: 'AMPUTATION SPONSOR' },

    textOTHER: { EN: 'OTHER' },
    lbPAT_JOB: { EN: 'YOUR CURRENT JOB' },
    lbPAT_DATE_CREATE: { EN: 'Created on' },


    placeholderSearch: { EN: 'Enter name to search' },
    placeholderIDSearch: { EN: 'Enter Resident ID to search' },
    btnSearch: { EN: 'SEARCH' },
    btnDeny: { EN: 'DENY' },
    btnAccept: { EN: 'ACCEPT' },
    btnReject: { EN: 'REJECT' },
    btnCancel: { EN: 'CANCEL' },
    btnUpdate: { EN: 'UPDATE' },
    btnApprove: { EN: 'APPROVE' },


    DoB: { EN: 'DoB' },
    From: { EN: 'From' },
    lbCheckExistance: { EN: 'Check existance' },
    lbServiceProvider: { EN: 'Service Provider' },
  }

  data: any;
  USER: iUser;
  PATIENT: iPatient;
  OPTION: string;
  MOVEABILITIES = [];
  SERVICEPROVIDERS = [];
  hidden: boolean = true;
  PRIVACY: any;

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
      if (this.localService.USER) {
        this.USER = this.localService.USER;
      } else {
        this.crudService.getCurrentUserProfile()
          .then(() => {
            this.USER = this.localService.USER;
          })
      }
      console.log(this.data);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseViewPage');
    
    if(this.localService.BASIC_INFOS){
      // 3. Get selected EN/VI
    this.LANG = this.langService.LANG;
    // 4. Get LANGUAGES from DB
    this.LANGUAGES = this.convertArray2Object();
    }else{
      this.navCtrl.setRoot('HomePage')
    }
  }

  go2CaseUpdate() {
    this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, ACTION: 'update' })
  }

  go2CaseDetail(PAGE: string) {
    this.navCtrl.push(PAGE, { USER: this.USER, PATIENT: this.PATIENT });
  }

  cancel() {
    this.navCtrl.canGoBack() ? this.navCtrl.pop() : this.navCtrl.setRoot('HomePage');
  }

  editByMA() {
    console.log(this.PATIENT);
    this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, ACTION: 'update', USER: this.USER });
  }

  deleteByRef() {
    console.log(this.PATIENT);
    const confirm = this.alertCtrl.create({
      title: 'Delete ?',
      message: null,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Agree clicked');
            this.crudService.patientDelete(this.PATIENT.PAT_ID)
              .then(() => {
                this.navCtrl.pop();
              })
              .catch((err) => {
                this.navCtrl.pop();
                console.log(err);
              })
          }
        }
      ]
    });
    confirm.present();
  }

  getSVPinfo() {
    this.crudService.getDocumentAtRefUrl('INFOS/SVPs')
      .then((docSnap) => {
        let DATA = docSnap.data();
        console.log(DATA);
      })
  }

  checkExistance() {
    console.log(this.PATIENT);
    this.navCtrl.push('CasePrecheckPage', { USER: this.USER, ResidentID: this.PATIENT.PAT_RES_ID, FName: this.PATIENT.PAT_FNAME, LName: this.PATIENT.PAT_LNAME })
  }

  // CONDITIONS
  isReferralUpdateDraft() {
    if (this.USER.U_ROLE == 'Referral' && this.PATIENT.PAT_STATE == 'DRAFT') return true;
    return false;
  }

  updateDraft() {
    console.log('updateDraft', this.PATIENT);
    this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, USER: this.USER });
  }

  isRefLead2AcceptDeny() {
    if (this.USER.U_ROLE == 'Referral Lead' && this.PATIENT.PAT_STATE == 'SUBMITTED') return true;
    return false;
  }

  updateCaseByReferralLead(ACTION: string) {
    this.PATIENT.PAT_STATE = ACTION;
    this.PATIENT.PAT_REFLEAD_ID = this.USER.U_ID;
    this.crudService.patientUpdate(this.PATIENT)
      .then((res) => {
        console.log(res);
        let sub = this.mailService.sendEmail2NotifyCaseAccepted('tho@enablecode.vn')
          .subscribe((res) => {
            console.log(res);
            sub.unsubscribe();
          });
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  isMoveAbility2ApproveReject() {
    if (this.USER.U_ROLE == 'MoveAbility' && this.PATIENT.PAT_STATE == 'ACCEPTED') return true;
    return false;
  }

  // for MA selecting SP
  selectServiceProvider() {
    console.log(this.selectedSVP);
    this.PATIENT.PAT_SVP = this.selectedSVP.Center;
    this.PATIENT.PAT_SVCPRO_ID = this.selectedSVP.id;

    this.crudService.getDocumentAtRefUrl('INFOS/SVPs').then((docSnap) => {
      this.updatedSVPs = <any[]>docSnap.data().ServiceProviders;
      console.log(this.updatedSVPs);
      let lastNumber = this.updatedSVPs.filter(svp => svp.id === this.selectedSVP.id)[0].lastNumber;
      let number = this.getICRCNumber(this.selectedSVP.id, lastNumber);
      this.PATIENT.PAT_CASENUMBER = number;
      let index = this.updatedSVPs.map(svp => svp.id).indexOf(this.selectedSVP.id);
      console.log(index);
      this.updatedSVPs[index].lastNumber = number.substr(number.length - 5);
      console.log(this.PATIENT, this.updatedSVPs);
    })

  }

  getICRCNumber(CenterCode: string, numberString: string) {
    let number = (Number(numberString) + 1);
    let numberStr = number.toString();
    let strNumber = '00000'.substring(0, 5 - numberStr.length) + numberStr;
    return this.getAssignedICRCNumber(CenterCode, strNumber);
  }

  getAssignedICRCNumber(CenterCode: string, numberStr: string) {
    let isAmputee = this.PATIENT.PAT_KIND == 'AMPUTEE';
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

  updateCaseByMoveAbility(ACTION: string) {
    switch (ACTION) {
      case 'APPROVED':
        if (this.PATIENT.PAT_SVP) {
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

  doUpdateCase(ACTION: string) {
    if (this.PATIENT.PAT_SVP) {
      this.PATIENT.PAT_STATE = ACTION;
      this.PATIENT.PAT_MVA_ID = this.USER.U_ID;
      this.crudService.patientUpdate(this.PATIENT)
        .then((res) => {
          console.log(res);
          return this.crudService.updateDocumentAtRefUrl('INFOS/SVPs', { ServiceProviders: this.updatedSVPs })
        })
        .then(res1 => {
          console.log(res1);
          this.navCtrl.pop();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this.appService.alertError('Error', 'Please select service provider');
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


}