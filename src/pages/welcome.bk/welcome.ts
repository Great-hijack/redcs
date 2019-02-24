import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { AppService } from '../../services/app.service';
import { FormArrayName } from '../../../node_modules/@angular/forms';
import { CrudService } from '../../services/crud.service';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppService,
    private crudService: CrudService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  insertDB() {
    let ARRAY = [
      { CITY: 'Hà Nội', CCODE: '1', DIST: 'Ba Đình', DCODE: '1', WARD: 'Phường Phúc Xá', WCODE: '1' },
      { CITY: 'Hà Nội', CCODE: '1', DIST: 'Ba Đình', DCODE: '1', WARD: 'Phường Trúc Bạch', WCODE: '4' },
    ]
    // // console.log(ARRAY);
    // // let CCODES: any[] = ARRAY.map(item=>item.CCODE);
    // // console.log(CCODES);
    // // this.crudService.basicInfoCreate('DVHC/2', {CITY: ARRAY})
    // //   .then((res) => {
    // //     console.log(res);
    // //   })
    // //   .catch((err) => {
    // //     console.log(err);
    // //   })
    // let uniqCities: any[] = this.appService.removeDuplicateObjectFromArray(ARRAY, 'CCODE');
    // console.log(uniqCities);
    // let PROMISES = [];
    // uniqCities.forEach(city => {
    //   let newArray = ARRAY.filter(item => item.CCODE === city.CCODE);
    //   console.log(newArray);
    //   let p = this.crudService.basicInfoCreate(`DVHC/${city.CCODE}`, { CITY: newArray });
    //   PROMISES.push(p);
    // })
    // Promise.all(PROMISES).then((res) => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })
  }

  removeDuplicate() {
    let array = [

    ];
    console.log(array);
    let uniqArray = this.appService.removeDuplicateObjectFromArray(array, 'CCODE');
    console.log(uniqArray);
    let BasicInfo = {
      CITIES: uniqArray
    }
    this.crudService.basicInfoCreate('INFOS/BASIC', BasicInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })

  }

}
