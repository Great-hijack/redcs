import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { CrudService } from '../../services/crud.service';
import { iPatient } from '../../interfaces/patient.interface';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Appointments', VI: 'Danh sách cuộc hẹn' },
    txtPreWeek: { EN: 'Pre Week', VI: 'Tuần trước' },
    txtNextWeek: { EN: 'Next Week', VI: 'Tuần sau' },
    txtAppointments: { EN: 'Appointments', VI: 'Cuộc hẹn' },
    txtDate: { EN: 'Date', VI: 'Thứ' },
    txtPatient: { EN: 'patient(s)', VI: 'BN' },
  };
  pageId = 'AppointmentsPage';
  data: any;
  DATAS = [];
  USER;
  n: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppService,
    private crudService: CrudService,
    private langService: LangService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    console.log(this.data);
    this.USER = this.data.USER;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentsPage');
    if (typeof (this.USER) === 'undefined') {
      this.navCtrl.setRoot('HomePage')
    } else {
      this.getArrayOfDaysOfPatients();
    }

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

  convertArray2Object() {
    let LANGUAGES: any[] = this.localService.BASIC_INFOS.LANGUAGES[this.pageId];
    let OBJ: any = {}
    LANGUAGES.forEach(L => {
      OBJ[L.KEY] = L
    })
    console.log(OBJ);
    return OBJ;
  }

  getArrayOfDaysOfPatients() {
    // let days = this.appService.getArrayOfDateFromToday(7);
    let FromNow = Date.now() + this.n * 86400000 * 7;
    let _7daysFromNow = this.appService.getArrayOfDateFromMiliSecond(FromNow, 7);
    console.log(_7daysFromNow);
    this.DATAS = [];
    let Promises = [];
    _7daysFromNow.forEach((day, index) => {
      let d: string = day.YYYYMMDD;
      let date = d.substr(0, 4) + '-' + d.substr(4, 2) + '-' + d.substr(6, 2);
      let wkday = day.WEEKDAY;
      Promises[index] = this.crudService.patientsGetAllsInvitedInDate(date, this.USER)
        .then((res: any) => {
          // console.log(date, res.PATIENTS);
          let DATA = {
            DATE: date,
            WEEKDAY: wkday,
            PATIENTS: res.PATIENTS
          };
          this.DATAS.push(DATA);
        })
        .catch(err => console.log(err));
    });
    Promise.all(Promises).then((res) => {
      console.log(this.DATAS);
    })
  }

  go2CaseList(DATA) {
    this.navCtrl.push('CasesListPage', { DATA: DATA, USER: this.USER });
  }

  nextWeek() {
    this.n += 1;
    this.getArrayOfDaysOfPatients();
  }

  preWeek() {
    this.n -= 1;
    this.getArrayOfDaysOfPatients();
  }



}
