import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
// import firebase from 'firebase';
// import 'firebase/firestore';
import { AppService } from '../../services/app.service';
import { MailService } from '../../services/mail.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-cases-view',
  templateUrl: 'cases-view.html',
})
export class CasesViewPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'CASES', VI: 'DANH SÁCH BN' },
    lbCreatedOn: { EN: 'Created on', VI: 'Ngày tạo' },
    lbInvitedOn: { EN: 'Invited on', VI: 'Ngày mời' },
    lbSUBMITTEDOn: { EN: 'Submitted on', VI: 'Ngày nộp' },
    lbACCEPTEDOn: { EN: 'Accepted on', VI: 'Ngày chấp nhận' },
    lbDENIEDOn: { EN: 'Denied on', VI: 'Ngày từ chối' },
    lbAPPROVEDOn: { EN: 'Approved on', VI: 'Ngày duyệt' },
    lbREJECTEDOn: { EN: 'Rejected on', VI: 'Ngày từ chối' },
    lbUNDERTREATMENTOn: { EN: 'Treated from', VI: 'Điều trị từ' },
    lbPAYMENTREQUESTOn: { EN: 'Payment Requested on', VI: 'Ngày y/c thanh toán' },
    lbPAYMENTAPPROVEDOn: { EN: 'Payment Approved on', VI: 'Ngày duyệt thanh toán' },
    lbPAIDOn: { EN: 'Paid on', VI: 'Ngày trả' },
    lbCLOSEDOn: { EN: 'Closed on', VI: 'Ngày đóng' },
    lbNotes: { EN: 'Notes', VI: 'Ghi chú' },
    lbQuestions: { EN: 'Questions', VI: 'Câu hỏi' },
    lbMore: { EN: 'More ...', VI: 'Đọc thêm' },
    lbValidFrom: { EN: 'Valid from', VI: 'Có hiệu lực từ ngày' },
    lbValidTo: { EN: 'Valid to', VI: 'Đến ngày' },
    lbSendInvitation: { EN: 'Send Invitation', VI: 'Gửi lời mời' },
  };
  pageId = 'CasesViewPage';
  data: any;
  USER: iUser;
  OPTION: string = 'NEW';
  STATE: string;
  STATES: string[] = [];
  PATIENTS: iPatient[] = []
  NEW_PATIENTS: iPatient[] = []
  WAIT_PATIENTS: iPatient[] = []
  PATIENTS2UPDATE: iPatient[] = [];
  FROM: string = '2018/08/12';
  TO: string = '2018/08/12';
  selectedStates = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private crudService: CrudService,
    private appService: AppService,
    private mailService: MailService,
    private langService: LangService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.OPTION = typeof (this.data.OPTION) == 'undefined' ? 'ALL' : this.data.OPTION;
    this.STATES = typeof (this.data.STATES) == 'undefined' ? [] : this.data.STATES;

    console.log(this.data);

  }

  ionViewDidLoad() {
    if (typeof (this.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    }
    this.getCasesOfUserWithStates(this.USER, this.STATES);
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getCasesOfUserWithStates(USER: iUser, STATES: string[]) {
    this.crudService.casesOfUserWithStatesGet(USER, STATES)
      .then((res: any) => {
        console.log(res);
        this.PATIENTS = res.PATIENTS;
      })
      .catch(err => {
        console.log(err);
      })
  }



  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER })
  }

  sendInvitationConfirm() {
    let _msg = this.LANG == 'EN' ? 'Are you sure to send invitations?' : 'Bạn có chắc muốn gửi thư mời?';
    let _disagree = this.LANG == 'EN' ? 'Disagree' : 'Không';
    let _agree = this.LANG == 'EN' ? 'Agree' : 'Có';
    const confirm = this.alertCtrl.create({
      // title: 'Sure?',
      message: _msg,
      buttons: [
        {
          text: _disagree,
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: _agree,
          handler: () => {
            this.sendInvitations();
          }
        }
      ]
    });
    confirm.present();
  }

  sendInvitations() {
    this.PATIENTS2UPDATE.forEach(PAT => {
      PAT.PAT_STATE = 'INVITED';
      PAT.PAT_INV_FROM = this.FROM;
      PAT.PAT_INV_TO = this.TO;
      PAT.PAT_isSELECTED = false;
      this.PATIENTS2UPDATE.push(PAT);
    })
    this.patientsUpdate(this.PATIENTS2UPDATE);
  }

  patientsUpdate(PATs: iPatient[]) {
    this.crudService.patientsUpdate(PATs)
      .then((res) => {
        console.log(res);
        let _msg = this.LANG == 'EN' ? 'Invitation sent...' : 'Thư mời đã được gửi...'
        this.appService.alertMsg(null, _msg);
        this.navCtrl.pop();
      })
      .catch(err => {
        let _msg = this.LANG == 'EN' ? 'something went wrong' : 'Có lỗi xảy ra ...';
        let _title = this.LANG == 'EN' ? 'Error' : 'Lỗi';
        this.appService.alertError(_title, _msg);
      })
    PATs.forEach(PAT => {
      this.mailService.sendEmail2NotifyCaseInvitted('tho@enablecode.vn')
        .subscribe((res) => {
          console.log(res);
        });
    })
  }

  cancel() {
    this.navCtrl.pop();
  }

  setSelected(PAT) {
    console.log(PAT);
    PAT.PAT_isSELECTED = !PAT.PAT_isSELECTED;
    this.PATIENTS2UPDATE = this.PATIENTS.filter(PAT => PAT.PAT_isSELECTED);
  }


  // for case filter
  doFilter() {
    let STATES = [];
    let STATES_MA = [
      { label: 'ACCEPTED', value: 'ACCEPTED', checked: false, type: 'checkbox' },
      { label: 'APPROVED', value: 'APPROVED', checked: false, type: 'checkbox' },
      { label: 'REJECTED', value: 'REJECTED', checked: false, type: 'checkbox' },
      { label: 'INVITED', value: 'INVITED', checked: false, type: 'checkbox' },
      { label: 'UNDER TREATMENT', value: 'UNDER TREATMENT', checked: false, type: 'checkbox' },
      { label: 'PAYMENT REQUEST', value: 'PAYMENT REQUEST', checked: false, type: 'checkbox' },
      { label: 'PAYMENT APPROVED', value: 'PAYMENT APPROVED', checked: false, type: 'checkbox' },
      { label: 'PAID', value: 'PAID', checked: false, type: 'checkbox' },
      { label: 'CLOSED', value: 'CLOSED', checked: false, type: 'checkbox' },
    ];
    let STATES_REF = [
      { label: 'DRAFT', value: 'DRAFT', checked: false, type: 'checkbox' },
      { label: 'SUBMITTED', value: 'SUBMITTED', checked: false, type: 'checkbox' },
      { label: 'ACCEPTED', value: 'ACCEPTED', checked: false, type: 'checkbox' },
      { label: 'DENIED', value: 'DENIED', checked: false, type: 'checkbox' },
      { label: 'APPROVED', value: 'APPROVED', checked: false, type: 'checkbox' },
      { label: 'REJECTED', value: 'REJECTED', checked: false, type: 'checkbox' },
      { label: 'INVITED', value: 'INVITED', checked: false, type: 'checkbox' },
      { label: 'UNDER TREATMENT', value: 'UNDER TREATMENT', checked: false, type: 'checkbox' },
      { label: 'PAYMENT REQUEST', value: 'PAYMENT REQUEST', checked: false, type: 'checkbox' },
      { label: 'PAYMENT APPROVED', value: 'PAYMENT APPROVED', checked: false, type: 'checkbox' },
      { label: 'PAID', value: 'PAID', checked: false, type: 'checkbox' },
      { label: 'CLOSED', value: 'CLOSED', checked: false, type: 'checkbox' },
    ];

    let STATES_LEAD = [
      { label: 'SUBMITTED', value: 'SUBMITTED', checked: false, type: 'checkbox' },
      { label: 'ACCEPTED', value: 'ACCEPTED', checked: false, type: 'checkbox' },
      { label: 'DENIED', value: 'DENIED', checked: false, type: 'checkbox' },
      { label: 'ACCEPTED', value: 'ACCEPTED', checked: false, type: 'checkbox' },
      { label: 'APPROVED', value: 'APPROVED', checked: false, type: 'checkbox' },
      { label: 'REJECTED', value: 'REJECTED', checked: false, type: 'checkbox' },
      { label: 'INVITED', value: 'INVITED', checked: false, type: 'checkbox' },
      { label: 'UNDER TREATMENT', value: 'UNDER TREATMENT', checked: false, type: 'checkbox' },
      { label: 'PAYMENT REQUEST', value: 'PAYMENT REQUEST', checked: false, type: 'checkbox' },
      { label: 'PAYMENT APPROVED', value: 'PAYMENT APPROVED', checked: false, type: 'checkbox' },
      { label: 'PAID', value: 'PAID', checked: false, type: 'checkbox' },
      { label: 'CLOSED', value: 'CLOSED', checked: false, type: 'checkbox' },
    ];

    let STATES_SVC = [
      { label: 'INVITED', value: 'INVITED', checked: false, type: 'checkbox' },
      { label: 'UNDER TREATMENT', value: 'UNDER TREATMENT', checked: false, type: 'checkbox' },
      { label: 'PAYMENT REQUEST', value: 'PAYMENT REQUEST', checked: false, type: 'checkbox' },
      { label: 'PAYMENT APPROVED', value: 'PAYMENT APPROVED', checked: false, type: 'checkbox' },
      { label: 'PAID', value: 'PAID', checked: false, type: 'checkbox' },
      { label: 'CLOSED', value: 'CLOSED', checked: false, type: 'checkbox' },
    ];

    switch (this.USER.U_ROLE) {
      case 'Referral':
        STATES = STATES_REF
        break;
      case 'MoveAbility':
        STATES = STATES_MA
        break;
      case 'Service Provider':
        STATES = STATES_SVC
        break;
      case 'Referral Lead':
        STATES = STATES_LEAD
        break;
    }

    this.selectedStates.forEach(ST => {
      STATES.find(state => state.value == ST).checked = true;
    })
    let alert = this.alertCtrl.create();
    alert.setTitle('Select:');
    for (let index = 0; index < STATES.length; index++) {
      alert.addInput({
        type: STATES[index].type,
        label: STATES[index].label,
        value: STATES[index].value,
        checked: STATES[index].checked
      });
    };

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: (selectedStates: string[]) => {
        console.log('Checkbox data:', selectedStates);
        this.selectedStates = selectedStates;
        // this.getCasesWithStates(selectedStates);
        this.getCasesOfUserWithStates(this.USER, selectedStates);
      }
    });
    alert.present();
  } isFiltered() {
    if (typeof (this.USER) !== 'undefined') {
      if (this.USER.U_ROLE == 'MoveAbility' && this.OPTION == 'NEW') return false;
      if (this.USER.U_ROLE == 'MoveAbility' && this.OPTION == 'WAITING') return false;
    }
    return true;
  }



}
