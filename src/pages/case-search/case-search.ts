import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { iLoc } from '../../interfaces/loc.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { iPatient } from '../../interfaces/patient.interface';
import { iUsr } from '../../interfaces/usr.interface';
import { LangService } from '../../services/lang.service';
import { CaseSearchLang } from '../../languages/case-search.lang';

@IonicPage()
@Component({
  selector: 'page-case-search',
  templateUrl: 'case-search.html',
})
export class CaseSearchPage {
  data: any;
  USER: iUsr;
  BASIC_INFOS: any;
  SEARCH_METHOD: string = 'ID';
  SEARCH_DATA: { LOC: iLoc, STR: string } = {
    LOC: null,
    STR: ''
  }
  LOCATIONS: iLoc[] = [];
  CITIES = [];
  DIST_IN_CITY = [];
  WARDS_IN_DIST = [];
  PATIENTS: iPatient[] = [];
  filterPatients: iPatient[] = [];

  // LANGUAGES SETTING;
  TITLE;
  labelPROVICE;
  labelDISTRICT;
  labelWARD;
  placeholderSearch;
  placeholderIDSearch;
  btnSearch;
  DoB;;
  From;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private appService: AppService,
    private langService: LangService
  ) {
    this.data = this.navParams.data;
    if (Object.getOwnPropertyNames(this.data).length === 0) {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.BASIC_INFOS = localService.BASIC_INFOS;
      this.CITIES = localService.BASIC_INFOS.CITIES;
      this.USER = this.navParams.data.USER;
    }
    this.initLang();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseSearchPage');
    console.log(this.BASIC_INFOS);
  }

  initLang() {
    let i = this.langService.index;
    let lang = new CaseSearchLang();
    this.TITLE = lang.TITLE[i];
    this.labelPROVICE = lang.labelPROVICE[i];
    this.labelDISTRICT = lang.labelDISTRICT[i];
    this.labelWARD = lang.labelWARD[i];
    this.placeholderSearch = lang.placeholderSearch[i];
    this.placeholderIDSearch = lang.placeholderIDSearch[i];
    this.btnSearch = lang.btnSearch[i];
    this.DoB = lang.DoB[i];
    this.From = lang.From[i];
  }

  selectCity(CITY: iLoc) {
    console.log(CITY);
    this.getDistrictinCity(CITY.CCODE);
  }

  getDistrictinCity(id) {
    this.crudService.getDistrictWard(id)
      .then((docSnap) => {
        this.LOCATIONS = docSnap.data().HANOI;
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
    this.SEARCH_DATA.LOC = WARD;
    console.log(this.SEARCH_DATA);
    this.getPatientsFromLocation(this.SEARCH_DATA.LOC);
  }

  getPatientsFromLocation(LOC: iLoc) {
    this.crudService.patientsGetAllWithLocation(LOC)
      .then((res: any) => {
        console.log(res);
        this.PATIENTS = res.PATIENTS;
        this.filterPatients = res.PATIENTS;
      })
  }


  go2CaseView(PAT: iPatient) {
    this.navCtrl.push('CaseViewPage', { PATIENT: PAT, USER: this.USER, OPTION: 'ALL' })
  }


  searchStr(searchInput) {
    console.log(searchInput.value);
    let searchStr: string = (searchInput.value as string).toLowerCase().trim();
    if (searchStr) {
      this.filterPatients = this.PATIENTS.filter(PAT => PAT.PAT_LNAME.toLowerCase().includes(searchStr));
    } else {
      this.filterPatients = this.PATIENTS;
    }
    console.log(this.filterPatients)
  }

  searchByID(ID) {
    this.filterPatients = [];
    console.log(ID);
    let IDstr = (ID.value as string).trim();
    if (!IDstr) {
      this.appService.alertError('Oops', 'ID should not be empty');
    } else {
      this.crudService.patientGetByResidentID(IDstr)
        .then((res) => {
          console.log(res);
          if (!res.empty) {
            res.docs.forEach(doc => {
              let PAT = <iPatient>doc.data();
              this.filterPatients.push(PAT);
            })
          } else {
            this.appService.toastMsg('No record', 5000);
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
}
