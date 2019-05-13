import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { iLoc } from '../../interfaces/loc.interface';
import { LocalService } from '../../services/local.service';
import { iUser } from '../../interfaces/user.interface';
import { LangService } from '../../services/lang.service';

@IonicPage()
@Component({
  selector: 'page-case-information-fill',
  templateUrl: 'case-information-fill.html',
})
export class CaseInformationFillPage {
  pageId = 'CaseInformationFillPage';
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    lbCaseCreation: { EN: 'CASE CREATION' },
    lbKindOfPatient: { EN: 'Kind of Patient' },
    lbNonAmputee: { EN: 'NON AMPUTEE' },
    lbAmputee: { EN: 'AMPUTEE' },
    lbAmputeeInformation: { EN: 'AMPUTEE INFORMATION' },
    lbNonAmputeeInformation: { EN: 'NON AMPUTEE INFORMATION' },
    lbBasicInformation: { EN: 'BASIC INFORMATION' },
    lbLastName: { EN: 'Last Name' },
    lbFirstName: { EN: 'First Name' },
    lbDateOfBirth: { EN: 'Date of Birth' },
    lbGender: { EN: 'Gender' },
    lbMale: { EN: 'Male' },
    lbFeMale: { EN: 'Female' },
    lbOther: { EN: 'Other' },
    lbTel: { EN: 'Tel' },
    lbResidentId: { EN: 'Resident ID' },
    lbMailingAddress: { EN: 'MAILING ADDRESS' },
    lbProvince: { EN: 'PROVINCE' },
    lbDistrict: { EN: 'DISTRICT' },
    lbWard: { EN: 'WARD' },
    lbAddress: { EN: 'Street' },
    lbSameToAboveContact: { EN: 'Same to above contact' },
    lbResidenceAddress: { EN: 'RESIDENCE ADDRESS' },
    lbYearOfDisability: { EN: 'Year of Disability' },
    lbTypeOfDisability: { EN: 'Type of Disability' },
    lbDisabledParts: { EN: 'Disabled Parts' },
    lbDisabledReasons: { EN: 'Disabled Reasons' },
    lbReceivedSupportBefore: { EN: 'Received support before?' },
    lbTypeSupportBefore: { EN: 'Type support before?' },
    lbYearOfReceivedSupport: { EN: 'Year of Received Support' },
    lbYearOfLastSupport: { EN: 'Year of Last Support' },
    lbDisabledLastSponsers: { EN: 'Disabled Last Sponsors' },
    lbAmputationDate: { EN: 'AMPUTATION DATE' },
    lbAmputationLevel: { EN: 'AMPUTATION LEVEL' },
    lbAmputationCauses: { EN: 'AMPUTATION CAUSES' },
    lbHowManyProsthesesYouGot: { EN: 'How many prostheses you got?' },
    lbLastFittingDate: { EN: 'LAST FITTING DATE' },
    lbWhoPaidForThatFitting: { EN: 'WHO PAID FOR THAT FITTING?' },
    lbYouCurrentJob: { EN: 'YOUR CURRENT JOB' },
    lbSubmitToReferralLead: { EN: 'Submit to Referral Lead' },
    lbUpdatePatient: { EN: 'Update Patient' },
    lbStateOfPatient: { EN: 'STATE' },
    lbPAT_CASENUMBER: { EN: 'ICRC Number' },
    lbJobOther: { EN: 'Please specify' }
  }

  data: any;
  PATIENT: iPatient;
  USER: iUser;
  ACTION: string = 'add-new';
  CITIES: iLoc[];
  LOCATIONS1: iLoc[] = [];
  DIST_IN_CITY1: iLoc[] = [];
  WARDS_IN_DIST1: iLoc[] = [];
  SELECTED_DISTRICTS1: iLoc[];
  SELECTED_WARDS1: iLoc[];
  LOCATIONS2: iLoc[] = [];
  DIST_IN_CITY2: iLoc[] = [];
  WARDS_IN_DIST2: iLoc[] = [];
  SELECTED_DISTRICTS2: iLoc[];
  SELECTED_WARDS2: iLoc[];
  DISABLED_SPONSORS: iPart[] = [];
  DISABLED_PARTS: iPart[] = [];
  DISABLED_REASONS: iPart[] = [];
  AMPUTATION_SPONSORS: iPart[] = [];
  AMPUTATION_PARTS: iPart[] = [];
  AMPUTATION_REASONS: iPart[] = [];
  JOBS: iPart[] = [];
  toggleValue: boolean = false;
  incorrectYearMsg = '';
  STATES = ['DRAFT', 'SUBMITTED', 'ACCEPTED', 'DENIED', 'APPROVED', 'REJECTED', 'INVITED', 'UNDER TREATMENT', 'PAYMENT REQUEST', 'PAYMENT APPROVED', 'PAID', 'CLOSED'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private crudService: CrudService,
    private appService: AppService,
    private localService: LocalService,
    private langService: LangService
  ) {
    this.data = this.navParams.data;
    console.log(this.data);
    this.PATIENT = this.data.PATIENT;
    if (typeof (this.data.ACTION) !== 'undefined') {
      this.ACTION = this.data.ACTION;
    }
    this.USER = this.data.USER;
    // this.ACTION = this.data.ACTION;
    let basicinfos = this.localService.BASIC_INFOS;
    if (typeof (this.PATIENT) == 'undefined') this.PATIENT = Object.assign({}, this.localService.PATIENT_DEFAULT);
    // console.log(res.data());
    if (basicinfos) {
      this.CITIES = basicinfos.CITIES;
      this.DISABLED_PARTS = basicinfos.DISABLED_PARTS;
      this.DISABLED_REASONS = basicinfos.DISABLED_REASONS;
      this.DISABLED_SPONSORS = basicinfos.DISABLED_SPONSORS;
      this.AMPUTATION_PARTS = basicinfos.AMPUTATION_PARTS;
      this.AMPUTATION_REASONS = basicinfos.AMPUTATION_REASONS;
      this.AMPUTATION_SPONSORS = basicinfos.AMPUTATION_SPONSORS;
      this.JOBS = basicinfos.JOBS;
    }
    console.log(this.CITIES);
    if (typeof (this.PATIENT) == 'undefined' || typeof (this.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseInformationFillPage');
    this.getData();
    // 3. Get selected EN/VI
    this.LANG = this.langService.LANG;
    // 4. Get LANGUAGES from DB
    this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
  }

  addPatient() {
    console.log(this.PATIENT, this.isInfoFullFilled());
    if (this.isInfoFullFilled()) {
      this.PATIENT.PAT_STATE = 'SUBMITTED';
      this.PATIENT.PAT_REFERRAL_ID = this.localService.USER.U_ID;
      this.PATIENT.PAT_REFORG = this.localService.USER.U_ID;
      this.PATIENT.PAT_REFORG = this.localService.USER.U_ORG;
      this.PATIENT.PAT_DATE_CREATE = this.appService.getCurrentDate();
      if (this.PATIENT.PAT_ID) {
        this.updatePatient();
      } else {
        let _HEADER = this.LANG == 'EN' ? 'Success' : 'Thành công';
        let _MSG = this.LANG == 'EN' ? 'Submitted successfully...' : 'Gửi thành công...';
        this.createNewPatient(_HEADER, _MSG);
      }
    } else {
      // let _title = this.LANG == 'EN' ? 'Success' : 'Thành công';
      let _msg = this.LANG == 'EN' ? 'Fill all requirements' : 'Vui lòng nhập đầy đủ thông tin...';
      this.appService.alertMsg(null, _msg);
      // return;
    }

  }

  createNewPatient(_HEADER, _MSG) {
    this.crudService.patientCreate(this.PATIENT)
      .then((res) => {
        console.log(res);
        // this.appService.toastMsg('Save as draft...', 5000);
        this.PATIENT = Object.assign({}, this.localService.PATIENT_DEFAULT);
        this.navCtrl.pop();
        this.appService.alertMsg(_HEADER, _MSG);
      })
      .catch(err => console.log(err))
  }

  saveDraft() {
    this.PATIENT.PAT_REFERRAL_ID = this.localService.USER.U_ID;
    this.PATIENT.PAT_REFORG = this.localService.USER.U_ID;
    this.PATIENT.PAT_REFORG = this.localService.USER.U_ORG;
    this.PATIENT.PAT_DATE_CREATE = this.appService.getCurrentDate();
    this.PATIENT.PAT_STATE = 'DRAFT';
    console.log(this.PATIENT);
    if (this.PATIENT.PAT_ID && this.PATIENT.PAT_STATE == 'DRAFT') {
      this.updatePatient();
    } else {
      let _HEADER = this.LANG == 'EN' ? 'Success' : 'Thành công';
      let _MSG = this.LANG = 'EN' ? 'Saved as draft successfully...' : 'Lưu tạm thành công...';
      this.createNewPatient(_HEADER, _MSG);
    }
  }

  updatePatient() {
    console.log(this.PATIENT);
    this.crudService.patientUpdate(this.PATIENT)
      .then((res) => {
        console.log(res);
        if (this.PATIENT.PAT_STATE == 'DRAFT') {
          let _HEADER = this.LANG == 'EN' ? 'Success' : 'Thành công';
          let _MSG = this.LANG == 'EN' ? 'Saved as draft successfully...' : 'Lưu tạm thành công...';
          this.appService.alertMsg(_HEADER, _MSG);
          // this.appService.toastMsg('Update as draft...', 5000);
        };
        if (this.PATIENT.PAT_STATE == 'SUBMITTED') {
          let _HEADER = this.LANG == 'EN' ? 'Success' : 'Thành công';
          let _MSG = this.LANG == 'EN' ? 'Submitted successfully...' : 'Gửi thành công...';
          this.appService.alertMsg(_HEADER, _MSG);
          // this.appService.toastMsg('Submitted...', 5000);
        }
        // this.navCtrl.setRoot('HomePage');
        this.PATIENT = Object.assign({}, this.localService.PATIENT_DEFAULT);
        this.navCtrl.pop();

      })
      .catch(err => console.log(err))
  }

  getData() {
    this.crudService.getBasicData()
      .then(() => {
        let basicinfos = this.localService.BASIC_INFOS;
        // console.log(res.data());
        this.CITIES = basicinfos.CITIES;
        this.DISABLED_PARTS = basicinfos.DISABLED_PARTS;
        this.DISABLED_REASONS = basicinfos.DISABLED_REASONS;
        this.DISABLED_SPONSORS = basicinfos.DISABLED_SPONSORS;
        this.AMPUTATION_PARTS = basicinfos.AMPUTATION_PARTS;
        this.AMPUTATION_REASONS = basicinfos.AMPUTATION_REASONS;
        this.AMPUTATION_SPONSORS = basicinfos.AMPUTATION_SPONSORS;
        this.JOBS = basicinfos.JOBS;
        console.log(this.CITIES);
      })
      .catch((err) => { console.log(err) })
  }
  updateToggleValue() {
    console.log(this.toggleValue);
    if (this.toggleValue) {
      this.PATIENT.PAT_CONTACT_LOC = this.PATIENT.PAT_HOME_LOC;
      this.PATIENT.PAT_CONTACT_ADDRESS = this.PATIENT.PAT_HOME_ADDRESS;
    } else {
      this.PATIENT.PAT_CONTACT_LOC = { CCODE: '', CITY: '', DCODE: '', DIST: '', WARD: '', WCODE: '' };
      this.PATIENT.PAT_CONTACT_ADDRESS = '';
    }
  }

  isSaveDraft() {
    if (!this.PATIENT.PAT_ID) return true;
    if (this.PATIENT.PAT_ID && this.PATIENT.PAT_STATE == 'DRAFT') return true;
    return false;
  }


  isRuleOfYearValid() {
    let YoB = this.PATIENT.PAT_YoB;

    let YoAM = this.PATIENT.PAT_AMPUTATION_YEAR;
    let YoARS = this.PATIENT.PAT_AMPUTATION_LAST_LEG_YEAR;

    let YoNA = this.PATIENT.PAT_DISABLED_YEAR;
    let YoNARS = this.PATIENT.PAT_DISABLED_SUPPORT_RECEIVED_YEAR;
    let YoNALRS = this.PATIENT.PAT_DISABLED_LAST_SUPPORT_YEAR;
    console.log(this.PATIENT.PAT_KIND, 'YoB=', YoB, 'YoAM=', YoAM, 'YoNA=', YoNA, 'YoARS=', YoARS, 'YoNARS=', YoNARS);
    if (this.PATIENT.PAT_KIND == 'AMPUTEE') {
      if (!YoAM) {
        this.incorrectYearMsg = 'Year of Amputee missing';
        return false;
      }
      if (YoB > YoAM) {
        console.log('YoB > YoAM');
        this.incorrectYearMsg = 'YoB > YoAM, Year of Birth cannot be greater than Year of Amputee';
        return false
      };
      if (Number(this.PATIENT.PAT_AMPUTATION_LEGS) > 0) {
        if (YoAM > YoARS) {
          console.log('YoAM > YoARS')
          this.incorrectYearMsg = 'YoAM > YoARS, Year of Amputee cannot be greater than last fitting date'
          return false
        };
      }
    } else {
      console.log('Non Amputee')
      if (!YoNA) {
        this.incorrectYearMsg = 'Year of Disability missing';
        return false;
      }
      if (this.PATIENT.PAT_DISABLED_SUPPORT_RECEIVED) {
        if (!YoNARS) {
          this.incorrectYearMsg = 'Year of Received support missing';
          return false;
        }
        if (!YoNALRS) {
          this.incorrectYearMsg = 'Year of Last Received support missing';
          return false;
        }
        if (YoNA > YoNARS) {
          console.log('YoNA > YoNARS')
          this.incorrectYearMsg = 'YoNA > YoNARS, Year of disability cannot be greater than year of received support'
          return false
        };
        if (YoNARS > YoNALRS) {
          console.log('YoNARS > YoNALRS')
          this.incorrectYearMsg = 'YoNARS > YoNALRS, Year of received support cannot be greater than year of last received support'
          return false
        };
      }
      if (YoB > YoNA) {
        console.log('YoB > YoNA')
        this.incorrectYearMsg = 'YoB > YoNA, Year of Birth cannot be greater than year of Disability'
        return false
      };
    }
    return true;
  }

  go2SetLocationForResidentAdd() {
    let locSetmodal = this.modalCtrl.create('LocationSetPage');
    locSetmodal.onDidDismiss((data) => {
      console.log(data);
      if (typeof (data) !== 'undefined' && data) {
        this.PATIENT.PAT_HOME_LOC = data.DATA.LOC;
        this.PATIENT.PAT_HOME_ADDRESS = data.DATA.ADD;
      }
    });
    locSetmodal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  go2SetLocationForMailingAdd() {
    let locSetmodal = this.modalCtrl.create('LocationSetPage');
    locSetmodal.onDidDismiss((data) => {
      console.log(data);
      if (typeof (data) !== 'undefined' && data) {
        this.PATIENT.PAT_CONTACT_LOC = data.DATA.LOC;
        this.PATIENT.PAT_CONTACT_ADDRESS = data.DATA.ADD;
      }
    });
    locSetmodal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  modalJobs() {
    let modal = this.modalCtrl.create('SelectPage', { ITEMS: this.JOBS })
    modal.onDidDismiss((data: iPart[]) => {
      console.log(data);
      if (data && data.length > 0) {
        this.PATIENT.PAT_JOB = data[0]
      }
    });
    modal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  modalAmpLevels() {
    let modal = this.modalCtrl.create('SelectPage', { ITEMS: this.AMPUTATION_PARTS })
    modal.onDidDismiss((data: iPart[]) => {
      console.log(data);
      if (data && data.length > 0) {
        this.PATIENT.PAT_AMPUTATION_PARTS = data
      }
    });
    modal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  modalAmpCauses() {
    let modal = this.modalCtrl.create('SelectPage', { ITEMS: this.AMPUTATION_REASONS })
    modal.onDidDismiss((data: iPart[]) => {
      console.log(data);
      if (data && data.length > 0) {
        this.PATIENT.PAT_AMPUTATION_REASONS = data
      }
    });
    modal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  modalWhoPaid() {
    let modal = this.modalCtrl.create('SelectPage', { ITEMS: this.AMPUTATION_SPONSORS })
    modal.onDidDismiss((data: iPart[]) => {
      console.log(data);
      if (data && data.length > 0) {
        this.PATIENT.PAT_AMPUTATION_LAST_SPONSORS = data
      }
    });
    modal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  modalDisabledParts() {
    let modal = this.modalCtrl.create('SelectPage', { ITEMS: this.DISABLED_PARTS })
    modal.onDidDismiss((data: iPart[]) => {
      console.log(data);
      if (data && data.length > 0) {
        this.PATIENT.PAT_DISABLED_PARTS = data
      }
    });
    modal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  modalDisabledReasons() {
    let modal = this.modalCtrl.create('SelectPage', { ITEMS: this.DISABLED_REASONS })
    modal.onDidDismiss((data: iPart[]) => {
      console.log(data);
      if (data && data.length > 0) {
        this.PATIENT.PAT_DISABLED_REASONS = data
      }
    });
    modal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  modalDisabledSponsors() {
    let modal = this.modalCtrl.create('SelectPage', { ITEMS: this.DISABLED_SPONSORS })
    modal.onDidDismiss((data: iPart[]) => {
      console.log(data);
      if (data && data.length > 0) {
        this.PATIENT.PAT_DISABLED_LAST_SUPPORT_SPONSORS = data
      }
    });
    modal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  isMoveAbility() {
    if (!this.USER) return false;
    if (!this.PATIENT) return false;
    if (this.USER.U_ROLE == 'MoveAbility') return true;
  }

  isInfoFullFilled() {
    if (!this.PATIENT.PAT_LNAME) return false;
    if (!this.PATIENT.PAT_FNAME) return false;
    if (!this.PATIENT.PAT_YoB) return false;
    if (!this.PATIENT.PAT_SEX) return false;
    if (!this.PATIENT.PAT_TEL) return false;
    if (!this.PATIENT.PAT_RES_ID) return false;
    if (!this.PATIENT.PAT_DISABLED_TYPE && this.PATIENT.PAT_KIND == 'NON AMPUTEE') return false;
    if (!this.PATIENT.PAT_DISABLED_YEAR && this.PATIENT.PAT_KIND == 'NON AMPUTEE') return false;
    if (!this.PATIENT.PAT_AMPUTATION_YEAR && this.PATIENT.PAT_KIND == 'AMPUTEE') return false;
    return true;
  }
}

export interface iPart {
  EN: string,
  VI: string
}
