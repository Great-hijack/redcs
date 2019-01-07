import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient, iNote } from '../../interfaces/patient.interface';
import { iUsr } from '../../interfaces/usr.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';

/**
 * Generated class for the CaseNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-case-notes',
  templateUrl: 'case-notes.html',
})
export class CaseNotesPage {
  NOTE: iNote = {
    NOTE: '',
    TIME: '',
    BY: '',
    ROLE: '',
    BY_UID: ''
  };
  data;
  PATIENT: iPatient;
  USER: iUsr;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private appService: AppService
  ) {
    this.data = this.navParams.data;
    this.PATIENT = this.data.PATIENT;
    this.USER = this.data.USER;
    if (typeof (this.PATIENT) == 'undefined' || typeof (this.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseNotesPage');
  }

  addNote() {
    console.log(this.NOTE);
    let NOTE: iNote = {
      NOTE: this.NOTE.NOTE,
      TIME: this.appService.getCurrentDateAndTime(),
      BY: this.USER.U_NAME,
      ROLE: this.USER.U_ROLE,
      BY_UID: this.USER.U_ID
    }
    // this.NOTE.BY = this.USER.U_NAME;
    // this.NOTE.BY_UID = this.USER.U_ID;
    // this.NOTE.TIME = this.appService.getCurrentDateFormat3();
    this.PATIENT.PAT_NOTES.push(NOTE);
    this.crudService.patientUpdate(this.PATIENT)
      .then((res) => {
        console.log(res);
        this.NOTE.NOTE = '';
      })
      .catch(err => {
        console.log(err);
      })
  }



}
