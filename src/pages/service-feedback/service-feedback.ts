import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-service-feedback',
  templateUrl: 'service-feedback.html',
})
export class ServiceFeedbackPage {
  VALUES = ['1','2','3','4','5'];
  QUESTIONS =  [
    'How easily did you access service?',
    'How fast did you get feedback?',
    'How fast did you get support?'
  ]

  ANSWERS: [
    { TXT: 'No money', value: '1'},
    { TXT: 'Far from home', value: '2'}
  ]
  FEEDBACKS = {
    FB0: '',
    FB1: '',
    FB2: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceFeedbackPage');
  }

  addFeedback(){
    console.log(this.FEEDBACKS);
  }

}
