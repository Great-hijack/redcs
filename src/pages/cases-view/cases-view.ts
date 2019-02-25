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
    lbCreatedOn: { EN: 'Created on', VI: 'Tạo ngày' },
    lbInvitedOn: { EN: 'Invited on', VI: 'Được mời' },
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
      this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getCasesOfUserWithStates(USER: iUser, STATES: string[]) {
    this.crudService.getCasesOfUserWithStates(USER, STATES)
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
    const confirm = this.alertCtrl.create({
      // title: 'Sure?',
      message: 'Are you sure to send invitations?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
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
        this.appService.toastMsg('Invitation sent...', 3000);
        this.navCtrl.pop();
      })
      .catch(err => {
        this.appService.alertError('Error', 'something went wrong');
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

    let STATES = [
      { label: 'DRAFT', value: 'DRAFT', checked: false, type: 'checkbox' },
      { label: 'SUBMITTED', value: 'SUBMITTED', checked: false, type: 'checkbox' },
      { label: 'ACCEPTED', value: 'ACCEPTED', checked: false, type: 'checkbox' },
      { label: 'DENIED', value: 'DENIED', checked: false, type: 'checkbox' },
      { label: 'APPROVED', value: 'APPROVED', checked: false, type: 'checkbox' },
      { label: 'REJECTED', value: 'REJECTED', checked: false, type: 'checkbox' },
      { label: 'WAITING', value: 'WAITING', checked: false, type: 'checkbox' },
      { label: 'INVITED', value: 'INVITED', checked: false, type: 'checkbox' },
      { label: 'UNDER TREATMENT', value: 'UNDER TREATMENT', checked: false, type: 'checkbox' },
      { label: 'PAYMENT REQUEST', value: 'PAYMENT REQUEST', checked: false, type: 'checkbox' },
      { label: 'PAID', value: 'PAID', checked: false, type: 'checkbox' },
      { label: 'CLOSED', value: 'CLOSED', checked: false, type: 'checkbox' },
    ]

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
