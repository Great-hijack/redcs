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
    { VERSION: '0.3', DATE: '2018/09/01', LOCATION: 'SAIGON' },
    { VERSION: '0.4', DATE: '2018/09/15', LOCATION: 'SAIGON' },
    { VERSION: '0.5', DATE: '2018/10/02', LOCATION: 'SAIGON' },
    { VERSION: '0.6', DATE: '2018/11/10', LOCATION: 'SAIGON' },
    { VERSION: '0.7', DATE: '2018/12/01', LOCATION: 'SAIGON' },
    { VERSION: '0.8', DATE: '2018/12/20', LOCATION: 'SAIGON' },
    { VERSION: '0.9', DATE: '2019/01/02', LOCATION: 'SAIGON' },
    { VERSION: '0.9.1', DATE: '2019/01/09', LOCATION: 'SAIGON' },
    { VERSION: '0.9.3', DATE: '2019/01/12', LOCATION: 'SAIGON' },
    { VERSION: '0.9.5', DATE: '2019/01/15', LOCATION: 'SAIGON' },
    { VERSION: '0.9.6', DATE: '2019/01/20', LOCATION: 'SAIGON' },
    { VERSION: '0.9.7', DATE: '2019/01/24', LOCATION: 'SAIGON' },
    { VERSION: '0.9.8', DATE: '2019/01/28', LOCATION: 'SAIGON' },
    { VERSION: '0.9.1', DATE: '2019/01/09', LOCATION: 'SAIGON' },
    { VERSION: '0.9.3', DATE: '2019/01/12', LOCATION: 'SAIGON' },
    { VERSION: '0.9.5', DATE: '2019/01/15', LOCATION: 'SAIGON' },
    { VERSION: '0.9.6', DATE: '2019/01/20', LOCATION: 'SAIGON' },
    { VERSION: '0.9.7', DATE: '2019/01/24', LOCATION: 'SAIGON' },
    { VERSION: '0.9.8', DATE: '2019/01/28', LOCATION: 'SAIGON' },
    { VERSION: '0.9.9', DATE: '2019/04/25', LOCATION: 'SAIGON' },
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
