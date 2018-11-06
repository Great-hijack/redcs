import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { CrudService } from '../../services/crud.service';
import { iPatient } from '../../interfaces/patient.interface';

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  data: any;
  DATAS = [];
  USR;
  n: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppService,
    private crudService: CrudService
  ) {
    this.data = this.navParams.data;
    console.log(this.data);
    this.USR = this.data.USER;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentsPage');
    if (typeof (this.USR) === 'undefined') {
      this.navCtrl.setRoot('HomePage')
    } else {
      this.getArrayofDaysOfPatients();
    }

  }

  getArrayofDaysOfPatients() {
    // let days = this.appService.getArrayOfDateFromToday(7);
    let From = Date.now() + this.n * 86400000 * 7;
    let days = this.appService.getArrayOfDateFromMiliSecond(From, 7);
    console.log(days);
    this.DATAS = [];
    let Promises = [];
    days.forEach((day, index) => {
      let d: string = day.YYYYMMDD;
      let date = d.substr(0, 4) + '-' + d.substr(4, 2) + '-' + d.substr(6, 2);
      let wkday = day.WEEKDAY;
      Promises[index] = this.crudService.patientsGetAllsInvitedInDate(date, this.USR)
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
    this.navCtrl.push('CasesListPage', { DATA: DATA, USER: this.USR });
  }

  nextWeek() {
    this.n += 1;
    this.getArrayofDaysOfPatients();
  }

  preWeek() {
    this.n -= 1;
    this.getArrayofDaysOfPatients();
  }

}
