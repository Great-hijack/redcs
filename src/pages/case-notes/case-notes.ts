import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { iPatient, iNote } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';

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
  USER: iUser;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
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

  editNote(NOTE: iNote, index: number) {
    console.log(NOTE, index);
    this.doAction(NOTE, index);
  }

  doAction(NOTE: iNote, index: number) {
    const actionSheet = this.actionSheetCtrl.create({
      title: null,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.deleteNote(NOTE, index);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteNote(NOTE: iNote, index: number) {
    if (this.USER.U_ID == this.PATIENT.PAT_NOTES[index].BY_UID) {
      this.PATIENT.PAT_NOTES.splice(index, 1)
      this.crudService.patientUpdate(this.PATIENT);
    } else {
      this.appService.alertError('Opps', 'You dont have right to delete this note');
    }
  }

}
