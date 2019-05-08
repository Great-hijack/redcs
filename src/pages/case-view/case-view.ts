import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
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
    lbPAT_RES_ID: { EN: 'Res ID', VI: 'Số CMT' },
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
    private modalCtrl: ModalController,
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
    this.init();

    console.log('constructor')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseViewPage');

    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      // this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
    } else {
      this.navCtrl.setRoot('HomePage')
    }
  }

  init() {
    if (this.isEnoughInfo()) {
      this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY;
      this.SVPs = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
      this.MOVEABILITIES = this.localService.BASIC_INFOS.MOVEABILITIES;
      this.SERVICEPROVIDERS = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
      this.USER = this.localService.USER;
    } else {
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('go Home'))
    }
  }

  isEnoughInfo() {
    if (typeof (this.data) === 'undefined') return false;
    if (!this.localService.BASIC_INFOS) return false;
    if (typeof (this.USER) === 'undefined') return false;
    if (typeof (this.PATIENT) === 'undefined') return false;
    return true;
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

  // editByMA() {
  //   console.log(this.PATIENT);
  //   this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, ACTION: 'update', USER: this.USER });
  // }

  isRefAboutDeleteCaseDraft() {
    if (!this.PATIENT) return false;
    if (!this.USER) return false;
    if (this.PATIENT.PAT_STATE == 'DRAFT' && this.USER.U_ROLE == 'Referral') return true;
    if (this.PATIENT.PAT_STATE == 'REJECTED' && this.USER.U_ROLE == 'Referral') return true;
    return false;
  }

  deleteByRef() {
    console.log(this.PATIENT);
    const confirm = this.alertCtrl.create({
      title: 'Delete ?',
      message: null,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
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

  // getSVPinfo() {
  //   this.crudService.getDocumentAtRefUrl('INFOS/SVPs')
  //     .then((docSnap) => {
  //       let DATA = docSnap.data();
  //       console.log(DATA);
  //     })
  // }


  // CONDITIONS
  isReferralUpdateDraftCase() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
    if (this.USER.U_ROLE == 'Referral' && this.PATIENT.PAT_STATE == 'DRAFT') return true;
    return false;
  }

  updatePatient() {
    console.log('updateDraft', this.PATIENT);
    this.navCtrl.push('CaseInformationFillPage', { PATIENT: this.PATIENT, USER: this.USER, ACTION: 'update' });
  }

  isRefLead2AcceptDenySubmittedCase() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
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

  isMoveAbilityAbout2CheckExisting() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
    if (this.USER.U_ROLE == 'MoveAbility' && this.PATIENT.PAT_STATE == 'ACCEPTED') return true;
    return false;
  }
  // checkExistance() {
  //   console.log(this.PATIENT);
  //   // this.navCtrl.push('CasePrecheckPage', { USER: this.USER, ResidentID: this.PATIENT.PAT_RES_ID, FName: this.PATIENT.PAT_FNAME, LName: this.PATIENT.PAT_LNAME })
  //   this.navCtrl.push('CasePrecheckPage', { USER: this.USER, PAT: this.PATIENT})
  // }

  checkExistance(){
    let existanceModal = this.modalCtrl.create('CasePrecheckPage', { USER: this.USER, PAT: this.PATIENT});
    existanceModal.onDidDismiss((data) => {
      console.log(data);
      this.PATIENT.PAT_CASENUMBER = data.CASENUMBER;
    });
    existanceModal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }



  isMoveabilityUpdateCase() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
    if (this.USER.U_ROLE == 'MoveAbility') return true;
    return false;
  }

  isMoveAbility2ApproveRejectAcceptedCase() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
    if (this.USER.U_ROLE == 'MoveAbility' && this.PATIENT.PAT_STATE == 'ACCEPTED') return true;
    return false;
  }

  isMoveAbility2ApprovePaymentRequest() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
    if (this.USER.U_ROLE == 'MoveAbility' && this.PATIENT.PAT_STATE == 'PAYMENT REQUEST') return true;
  }

  isMoveAbility2SetCasePaid() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
    if (this.USER.U_ROLE == 'MoveAbility' && this.PATIENT.PAT_STATE == 'PAYMENT APPROVED') return true;
  }

  isMoveAbility2SetCaseClosed() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
    if (this.USER.U_ROLE == 'MoveAbility' && this.PATIENT.PAT_STATE == 'PAID') return true;
  }

  // for MA selecting SP
  selectServiceProvider() {
    console.log(this.selectedSVP);
    this.PATIENT.PAT_SVP = this.selectedSVP.Center;
    this.PATIENT.PAT_SVCPRO_ID = this.selectedSVP.id;
    // this.updateICRCNumber();
  }

  updatePatientWithNewICRCNumber(ACTION: string) {
    let lastNo: number;
    // 1: get current No
    this.crudService.getDocumentAtRefUrl('INFOS/SVPs')
      .then(res => {
        let Providers = res.data().Providers;
        let selectedProd = Providers[this.selectedSVP.id];
        selectedProd.lastNo = selectedProd.lastNo + 1;
        lastNo = selectedProd.lastNo;
        console.log(Providers);
        // 2: update new No
        return res.ref.update({ Providers: Providers })
      })
      .then((res) => {
        console.log(res);
        // this.PATIENT.PAT_STATE = ACTION;
        this.PATIENT.PAT_MVA_ID = this.USER.U_ID;
        this.PATIENT.PAT_CASENUMBER = this.getICRCNumberx(this.selectedSVP.id, lastNo)
        // 3: update patient
        this.doUpdateCase(ACTION);
      })
      .catch(err => {
        console.log(err);
      })


    this.crudService.getDocumentAtRefUrl('INFOS/SVPs')
      .then((docSnap) => {
        this.updatedSVPs = <any[]>docSnap.data().ServiceProviders;
        console.log(this.updatedSVPs);
        let lastNumber = this.updatedSVPs.filter(svp => svp.id === this.selectedSVP.id)[0].lastNumber;
        let number = this.getICRCNumber(this.selectedSVP.id, lastNumber);
        this.PATIENT.PAT_CASENUMBER = number;
        let index = this.updatedSVPs.map(svp => svp.id).indexOf(this.selectedSVP.id);
        console.log(index);
        this.updatedSVPs[index].lastNumber = number.substr(number.length - 5);
        console.log(this.PATIENT, this.updatedSVPs);
        console.log(number);
      })
      .catch(err => {
        console.log(err);
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

  getICRCNumberx(CenterCode: string, number: number) {
    // let number = (Number(numberString) + 1);
    let numberStr = number.toString();
    let strNumber = '00000'.substring(0, 5 - numberStr.length) + numberStr;
    return this.getAssignedICRCNumberx(CenterCode, strNumber);
  }

  getAssignedICRCNumberx(CenterCode: string, numberStr: string) {
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
    console.log(this.PATIENT);
    // if (ACTION == 'APPROVED') {
    //   if (this.PATIENT.PAT_SVP) {
    //     this.PATIENT.PAT_STATE = ACTION;
    //     this.PATIENT.PAT_MVA_ID = this.USER.U_ID;
    //     if(this.PATIENT.PAT_CASENUMBER){
    //       this.doUpdateCase(ACTION);
    //     }else{
    //       this.updatePatientWithNewICRCNumber('APPROVED');
    //     }
    //   } else {
    //     this.appService.alertError('Error', 'Please select service provider');
    //   }
    // } else {
    //   this.doUpdateCase(ACTION);
    // }

  }

  doUpdateCase(ACTION: string) {
    this.PATIENT.PAT_STATE = ACTION;
    this.crudService.patientUpdate(this.PATIENT)
      .then(res => {
        console.log(res);
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
      })
  }


  // convertArray2Object() {
  //   let LANGUAGES: any[] = this.localService.BASIC_INFOS.LANGUAGES[this.pageId];
  //   let OBJ: any = {}
  //   LANGUAGES.forEach(L => {
  //     OBJ[L.KEY] = L
  //   })
  //   console.log(OBJ);
  //   return OBJ;
  // }


}


/**
 *
 *
 */