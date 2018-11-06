import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { iQuestion, iPatient } from '../../interfaces/patient.interface';
import { iUsr } from '../../interfaces/usr.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';

/**
 * Generated class for the CaseQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-case-questions',
  templateUrl: 'case-questions.html',
})
export class CaseQuestionsPage {

  QUESTION: iQuestion = {
    QUEST: '',
    TIME: '',
    BY: '',
    BY_UID: ''
  };
  data;
  PATIENT: iPatient;
  USER: iUsr;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
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

  addQuestion() {
    console.log(this.QUESTION);
    let QUEST: iQuestion = {
      QUEST: this.QUESTION.QUEST,
      TIME: this.appService.getCurrentDateFormat3(),
      BY: this.USER.U_NAME,
      BY_UID: this.USER.U_ID
    }
    // // this.NOTE.BY = this.USER.U_NAME;
    // // this.NOTE.BY_UID = this.USER.U_ID;
    // // this.NOTE.TIME = this.appService.getCurrentDateFormat3();
    // this.PATIENT.PAT_QUESTIONS.push(QUEST);
    // this.crudService.patientUpdate(this.PATIENT)
    //   .then((res) => {
    //     console.log(res);
    //     this.QUESTION.QUEST = '';
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    this.updatePatientQnA(QUEST, this.PATIENT.PAT_QUESTIONS.length);
  }

  updatePatientQnA(QUEST: iQuestion, index: number) {
    // this.PATIENT.PAT_QUESTIONS.push(QUEST);
    this.PATIENT.PAT_QUESTIONS.splice(index+1,0,QUEST);
    this.crudService.patientUpdate(this.PATIENT)
      .then((res) => {
        console.log(res);
        this.QUESTION.QUEST = '';
      })
      .catch(err => {
        console.log(err);
      })
  }

  replyQuestion(index: number) {
    const confirm = this.alertCtrl.create({
      title: 'Reply',
      message: 'Type your reply here',
      inputs: [
        {
          name: 'answer',
          placeholder: 'Your answer here'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (text) => {
            console.log('Cancel clicked', text, index);
          }
        },
        {
          text: 'Reply',
          handler: (data) => {
            let ANSWER: iQuestion = {
              QUEST: data.answer,
              TIME: this.appService.getCurrentDateFormat3(),
              BY: this.USER.U_NAME,
              BY_UID: this.USER.U_ID
            }
            this.updatePatientQnA(ANSWER, index);
            console.log('Reply clicked', data, index);
          }
        }
      ]
    });
    confirm.present();
  }


}
