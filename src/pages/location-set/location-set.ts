import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { iLoc } from '../../interfaces/loc.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { LocalService } from '../../services/local.service';
import { LangService } from '../../services/lang.service';



@IonicPage()
@Component({
  selector: 'page-location-set',
  templateUrl: 'location-set.html',
})
export class LocationSetPage {
  pageId = 'LocationSetPage';
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    lbCity: { EN: 'City', VI: 'Tỉnh/Thành' },
    lbDistrict: { EN: 'District', VI: 'Quận Huyện' },
    lbWard: { EN: 'Ward', VI: 'Phường/Xã' },
    lbAddress: { EN: 'Address', VI: 'Địa chỉ' },
  }

  CITIES: iLoc[] = [];
  LOCATIONS: iLoc[] = [];
  DIST_IN_CITY: iLoc[] = [];
  WARDS_IN_DIST: iLoc[] = [];

  Address: string = '';

  selectedLOC: iLoc = {
    CCODE: '',
    CITY: '',
    DCODE: '',
    DIST: '',
    WCODE: '',
    WARD: ''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private crudService: CrudService,
    private appService: AppService,
    private localService: LocalService,
    private langService: LangService,
  ) {
    this.CITIES = this.appService.arraySortByName(this.localService.BASIC_INFOS.CITIES, 'CITY', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationSetPage');
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      // this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
    } else {
      this.navCtrl.setRoot('HomePage')
    }
  }

  selectCity(CITY: iLoc) {
    console.log(CITY);
    this.getDistrictinCity(CITY.CCODE);
  }

  getDistrictinCity(id: string) {
    this.crudService.getDistrictWard(id)
      .then((docSnap) => {
        this.LOCATIONS = docSnap.data().CITY;
        console.log(this.LOCATIONS);
        let _DISTRICTS = this.appService.removeDuplicateObjectFromArray(this.LOCATIONS, 'DCODE');
        this.DIST_IN_CITY = this.appService.arraySortByName(_DISTRICTS, 'DIST', true);
        console.log(this.DIST_IN_CITY);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  selectDist(DIST: iLoc) {
    console.log(DIST);
    let _WARDS = this.LOCATIONS.filter(loc => {
      return loc.DCODE == DIST.DCODE
    })
    this.WARDS_IN_DIST = this.appService.arraySortByName(_WARDS, 'WARD', true);
    console.log(this.WARDS_IN_DIST);
  }

  selectWard(WARD: iLoc) {
    console.log(WARD);
    this.selectedLOC = WARD;
  }

  setLoc() {
    console.log(this.selectedLOC, this.Address);
    this.viewCtrl.dismiss({ isCancel: false, DATA: { LOC: this.selectedLOC, ADD: this.Address } })
  }

  isDisable() {
    if (!this.selectedLOC.CCODE) return true
    if (!this.selectedLOC.DCODE) return true
    if (!this.selectedLOC.WCODE) return true
    if (!this.Address) return true
    return false;
  }

  doCancel() {
    this.viewCtrl.dismiss({ isCancel: true, DATA: { LOC: this.selectedLOC, ADD: this.Address } })
  }
}
