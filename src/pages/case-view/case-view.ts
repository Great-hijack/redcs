import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { AppService } from '../../services/app.service';
import { CaseViewLang } from '../../languages/case-view.lang';
import { LangService } from '../../services/lang.service';
import { MailService } from '../../services/mail.service';
import { iUsr } from '../../interfaces/usr.interface';
@IonicPage()
@Component({
  selector: 'page-case-view',
  templateUrl: 'case-view.html',
})
export class CaseViewPage {

  // LANGUAGES SETTING
  LANG = 'EN';
  LANGUAGES = [];

  TITLE = { EN: 'CASE VIEW', VI: 'DANH SÁCH BN' };
  lbPAT_KIND = { EN: 'Kind of Patient', VI: 'Loại bệnh nhân' };
  lbPAT_STATE = { EN: 'Status', VI: 'Tình trạng' };
  lbPAT_CASENUMBER = { EN: 'Case Number', VI: 'STT' };
  textBasicInfo = { EN: 'BASIC INFORMATION', VI: 'Thông tin cơ bản' };
  lbPAT_FNAME = { EN: 'First Name', VI: 'Họ' };
  lbPAT_LNAME = { EN: 'Last Name', VI: 'Tên' };
  lbPAT_YoB = { EN: 'Date of Birth', VI: 'Ngày sinh' };
  lbPAT_SEX = { EN: 'Gender', VI: 'Giới tính' };
  lbPAT_TEL = { EN: 'Tel', VI: 'SĐT' };
  textMailingAddress = { EN: 'MAILING ADDRESS', VI: 'ĐỊA CHỈ NHẬN THƯ' };
  lbPROVICE = { EN: 'PROVINCE', VI: 'Tỉnh' };
  lbDISTRICT = { EN: 'DISTRICT', VI: 'Quận/Huyện' };
  lbWARD = { EN: 'WARD', VI: 'Phường/xã' };
  lbAddress = { EN: 'Address', VI: 'Địa chỉ' };
  textResidentAddress = { EN: 'RESIDENCE ADDRESS', VI: 'ĐỊA CHỈ THƯỜNG TRÚ' };

  textNonAmputee = { EN: 'NON AMPUTEE', VI: 'BN khuyết tật khác' };
  lbPAT_DISABLED_YEAR = { EN: 'Year of Disability', VI: 'Năm bị tật' };
  lbPAT_DISABLED_TYPE = { EN: 'Type of Disability', VI: 'Loại khuyết tật' };
  lbPAT_DISABLED_PARTS = { EN: 'Disabled Parts', VI: 'Bộ phận khuyết tật' };
  lbPAT_DISABLED_REASONS = { EN: 'Disabled Reasons', VI: 'Lý do' };
  lbPAT_DISABLED_SUPPORT_RECEIVED = { EN: 'Received support before?', VI: 'Đã nhận hỗ trợ trước đó?' };
  lbPAT_DISABLED_SUPPORT_TYPE = { EN: 'What support?', VI: 'Hỗ trợ những gì?' };
  lbPAT_DISABLED_SUPPORT_RECEIVED_YEAR = { EN: 'Year of Received Support', VI: 'Năm nhận hỗ trợ' };
  lbPAT_DISABLED_LAST_SUPPORT_YEAR = { EN: 'Year of Last Support', VI: 'Năm cuối cùng nhận hỗ trợ' };
  lbPAT_DISABLED_LAST_SUPPORT_SPONSORS = { EN: 'Disabled Last Sponsors', VI: 'Nhà tài trợ cuối' };

  textAmputee = { EN: 'AMPUTEE', VI: 'BN cụt chi' };
  lbPAT_AMPUTATION_YEAR = { EN: 'AMPUTATION DATE', VI: 'Năm cắt cụt' };
  lbPAT_AMPUTATION_PARTS = { EN: 'AMPUTATION LEVELs', VI: 'Mức độ bị cắt cụt' };
  lbPAT_AMPUTATION_REASONS = { EN: 'AMPUTATION CAUSE', VI: 'Nguyên nhân' };
  lbPAT_AMPUTATION_LEGS = { EN: 'How many amputations', VI: 'Số lần bị cắt' };
  lbPAT_AMPUTATION_LAST_LEG_YEAR = { EN: 'LAST FITTING DATE', VI: 'Ngày thử cuối cùng' };
  lbPAT_AMPUTATION_LAST_SPONSORS = { EN: 'AMPUTATION SPONSOR', VI: 'Nhà tài trợ' };

  textOTHER = { EN: 'OTHER', VI: 'Khác' };
  lbPAT_JOB = { EN: 'YOUR CURRENT JOB', VI: 'Công việc hiện tại' };
  lbPAT_DATE_CREATE = { EN: 'Created on', VI: 'Ngày tạo' };


  placeholderSearch = { EN: 'Enter name to search', VI: 'Nhập tên để tìm' };
  placeholderIDSearch = { EN: 'Enter Resident ID to search', VI: 'Nhập ID để tìm' };
  btnSearch = { EN: 'SEARCH', VI: 'Tiềm kiếm' };
  btnDeny = { EN: 'DENY', VI: 'Không chấp nhận' };
  btnAccept = { EN: 'ACCEPT', VI: 'Chấp nhận' };
  btnReject = { EN: 'REJECT', VI: 'Từ chối' };
  btnCancel = { EN: 'CANCEL', VI: 'Huỷ bỏ' };
  btnUpdate = { EN: 'UPDATE', VI: 'Cập nhật' };
  btnApprove = { EN: 'APPROVE', VI: 'Chấp nhận' };


  DoB = { EN: 'DoB', VI: 'Ngày sinh' };
  From = { EN: 'From', VI: 'Từ' };
  lbCheckExistance = { EN: 'Check existance', VI: 'Kiểm tra tồn tại' };
  lbServiceProvider = { EN: 'Service Provider', VI: 'Nhà cung cấp' };


  data: any;
  USER: iUsr;
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
  }

  ionViewDidLoad() {
    this.LANG = this.langService.LANG;
    console.log('ionViewDidLoad CaseViewPage');
    // let Case = this.getNumber('HCM', false);
    // console.log(Case);
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

  // getNumber(CenterCode: string, isAmputee: boolean) {
  //   let CODES = {
  //     HCM: { Center: 'HCMC', lastNumber: '00300' },
  //     CTO: { Center: 'Can Tho', lastNumber: '00020' },
  //     DNG: { Center: 'Da Nang', lastNumber: '00340' },
  //     QNH: { Center: 'Qui Nhon', lastNumber: '00004' },
  //   };

  //   let number = (Number(CODES[CenterCode].lastNumber) + 1);
  //   let numberStr = number.toString();
  //   let strNumber = '00000'.substring(0, 5 - numberStr.length) + numberStr;
  //   CODES[CenterCode].lastNumber = strNumber;
  //   return this.getAssignedICRCNumber(CenterCode, strNumber);
  // }





  checkExistance() {
    console.log(this.PATIENT);
    this.navCtrl.push('CasePrecheckPage', { USER: this.USER, ResidentID: this.PATIENT.PAT_RES_ID, FName: this.PATIENT.PAT_FNAME, LName: this.PATIENT.PAT_LNAME })
  }

  // submitCase2ReferralLead() {
  //   this.PATIENT.PAT_STATE = "SUBMITTED";
  //   console.log(this.PATIENT);
  // }


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





}