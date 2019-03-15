import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { iLoc } from '../../interfaces/loc.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { LocalService } from '../../services/local.service';



@IonicPage()
@Component({
  selector: 'page-location-set',
  templateUrl: 'location-set.html',
})
export class LocationSetPage {
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
    private localService: LocalService
  ) {
    this.CITIES = this.localService.BASIC_INFOS.CITIES;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationSetPage');
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
        this.DIST_IN_CITY = this.appService.removeDuplicateObjectFromArray(this.LOCATIONS, 'DCODE');
        console.log(this.DIST_IN_CITY);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  selectDist(DIST: iLoc) {
    console.log(DIST);
    this.WARDS_IN_DIST = this.LOCATIONS.filter(loc => {
      return loc.DCODE == DIST.DCODE
    })
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
