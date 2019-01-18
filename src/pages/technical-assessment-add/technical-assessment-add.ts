import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the TechnicalAssessmentAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technical-assessment-add',
  templateUrl: 'technical-assessment-add.html',
})
export class TechnicalAssessmentAddPage {
  width: number;
  h: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    platform.ready().then((readySource) => {
      this.width = platform.width();
      this.h = platform.height();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicalAssessmentAddPage');
  }

}
