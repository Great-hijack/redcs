import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { iQuestion, iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-case-questions',
  templateUrl: 'case-questions.html',
})
export class CaseQuestionsPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Questions', VI: 'Danh sách Câu hỏi' },
    txtAddQuestion: { EN: 'Add Question', VI: 'Thêm câu hỏi' },
    txtQuestion: { EN: 'Question', VI: 'Câu hỏi' },
    txtAnswer: { EN: 'Answer', VI: 'Trả lời' },
  };
  pageId = 'CaseQuestionsPage';

  QUESTION: iQuestion = {
    QUEST: '',
    TIME: '',
    BY: '',
    BY_UID: '',
    ROLE: '',
    isAQuestion: true
  };
  data;
  PATIENT: iPatient;
  USER: iUser;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private crudService: CrudService,
    private appService: AppService,
    private langService: LangService,
    private localService: LocalService
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
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      //this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    } 
  }

  convertArray2Object() {
    let LANGUAGES: any[] = this.localService.BASIC_INFOS.LANGUAGES[this.pageId];
    let OBJ: any = {}
    console.log('convert Array');
    console.log(LANGUAGES);
    LANGUAGES.forEach(element => {
      
    });(L => {
      OBJ[L.KEY] = L
    })
    console.log(OBJ);
    return OBJ;
  }

  addQuestion() {
    console.log(this.QUESTION);
    let QUEST: iQuestion = {
      QUEST: this.QUESTION.QUEST,
      TIME: this.appService.getCurrentDateAndTime(),
      BY: this.USER.U_NAME,
      BY_UID: this.USER.U_ID,
      ROLE: this.USER.U_ROLE,
      isAQuestion: true
    }
    this.updatePatientQnA(QUEST, this.PATIENT.PAT_QUESTIONS.length);
  }

  updatePatientQnA(QUEST: iQuestion, index: number) {
    this.PATIENT.PAT_QUESTIONS.splice(index + 1, 0, QUEST);
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
              TIME: this.appService.getCurrentDateAndTime(),
              BY: this.USER.U_NAME,
              BY_UID: this.USER.U_ID,
              ROLE: this.USER.U_ROLE,
              isAQuestion: false
            }
            this.updatePatientQnA(ANSWER, index);
            console.log('Reply clicked', data, index);
          }
        }
      ]
    });
    confirm.present();
  }

  doActionOnQuestion(QUESTION: iQuestion, index: number) {
    const actionSheet = this.actionSheetCtrl.create({
      title: null,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.deleteQuestion(QUESTION, index);
          }
        }, {
          text: 'Reply',
          handler: () => {
            console.log('Destructive clicked');
            this.replyQuestion(index);
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

  deleteQuestion(QUESTION: iQuestion, index: number) {
    console.log(QUESTION, index);
    if (this.USER.U_ID == this.PATIENT.PAT_QUESTIONS[index].BY_UID) {
      this.PATIENT.PAT_QUESTIONS.splice(index, 1)
      this.crudService.patientUpdate(this.PATIENT);
    } else {
      this.appService.alertError('Opps', 'You dont have right to delete this');
    }
  }


}
