import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the QuestionaireAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionaire-add',
  templateUrl: 'questionaire-add.html',
})
export class QuestionaireAddPage {
  width: number;
  h: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    platform.ready().then((readySource) => {
      this.width = platform.width();
      this.h = platform.height();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionaireAddPage');
  }

}
