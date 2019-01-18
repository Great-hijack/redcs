import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';

/**
 * Generated class for the TechnicalAssessmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technical-assessment',
  templateUrl: 'technical-assessment.html',
})
export class TechnicalAssessmentPage {
  w: number;
  h: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    platform.ready().then((readySource) => {
      this.w = platform.width();
      this.h = platform.height();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicalAssessmentPage');
  }

  go2AddTAPage() {
    this.navCtrl.push('TechnicalAssessmentAddPage');
  }

  go2Report(){}

}
