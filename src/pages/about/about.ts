import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})


export class AboutPage {
  versions: any[] = [
    { VERSION: '0.1', DATE: '2018/07/29', LOCATION: 'SAIGON' },
    { VERSION: '0.2', DATE: '2018/08/10', LOCATION: 'SAIGON' },
  ]

  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nav: Nav) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ionViewWillEnter() {
    this.nav.swipeBackEnabled = true;
  }

  ionViewWillLeave() {
    this.nav.swipeBackEnabled = false;
  }

}
