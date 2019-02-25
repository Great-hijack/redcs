import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { iLoc } from '../../interfaces/loc.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { LangService } from '../../services/lang.service';
import { CaseSearchLang } from '../../languages/case-search.lang';

@IonicPage()
@Component({
  selector: 'page-case-search',
  templateUrl: 'case-search.html',
})
export class CaseSearchPage {

  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE : { EN:'Search', VI:'Tìm kiếm'},
    labelPROVICE : { EN:'PROVINCE', VI:'Tỉnh'},
    labelDISTRICT : { EN:'DISTRICT', VI:'Quận/Huyện'},
    labelWARD : { EN:'WARD', VI:'Phường/xã'},
    placeholderSearch : { EN:'Enter name to search', VI:'Nhập tên để tìm'},
    placeholderIDSearch : { EN:'Enter Resident ID to search',VI:'Nhập ID để tìm'},
    btnSearch : { EN:'SEARCH', VI:'Tiềm kiếm'},
    DoB : { EN:'DoB',VI:'Ngày sinh'},
    From : { EN:'From', VI:'Từ'},
    To : { EN:'To', VI:'Đến'},
    txtSelectDate : { EN:'Select Date', VI:'Chọn ngày'},
    txtRangeOfTime : { EN:'Range of Time', VI:'Phạm vi thời gian'},
    txtInvitationValidToDate : { EN:'Invitation Valid To Date', VI:'Từ ngày'},
    txtInvitationValidFromDate : { EN:'Invitation Valid From Date', VI:'Đến ngày'},
    txtCaseCreatedDate : { EN:'Case Created Date', VI:'Danh sách tạo ngày'},
    txtSelectOne : { EN:'Select one', VI:'Chọn'},
    txtByID : { EN:'By ID', VI:'Theo CMND'},
    txtByProvice : { EN:'By Provice', VI:'Theo Tỉnh'},
  };
  pageId = 'CaseSearchPage';


  data: any;
  USER: iUser;
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
  myDate = {
    Date: '',
    From: '',
    To: ''
  }
  kindOfDate: string = '0';
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
   // this.initLang();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseSearchPage');
    console.log(this.BASIC_INFOS);
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      //this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }
  convertArray2Object() {
    let LANGUAGES: any[] = this.localService.BASIC_INFOS.LANGUAGES[this.pageId];
    let OBJ: any = {}
    LANGUAGES.forEach(L => {
      OBJ[L.KEY] = L
    })
    console.log(OBJ);
    return OBJ;
  }


  selectCity(CITY: iLoc) {
    console.log(CITY);
    this.getDistrictinCity(CITY.CCODE);
  }

  getDistrictinCity(id: string) {
    this.crudService.getDistrictWard(id)
      .then((docSnap) => {
        // console.log(docSnap.data());
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
    this.SEARCH_DATA.LOC = WARD;
    console.log(this.SEARCH_DATA);
    this.getPatientsFromLocation(this.SEARCH_DATA.LOC);
  }

  getPatientsFromLocation(LOC: iLoc) {
    this.crudService.patientsGetAllWithLocation(LOC)
      .then((res: any) => {
        console.log(res);
        if (res.length < 1) {
          this.PATIENTS = res.PATIENTS;
          this.filterPatients = res.PATIENTS;
        } else {
          // this.appService.toastMsg('No record', 5000);
          this.appService.alertMsg('Opps', 'No record');
        }
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
            // this.appService.toastMsg('No record', 5000);
            this.appService.alertMsg('Opps', 'No record');
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

  }

  searchByDateCondition() {
    console.log(this.myDate, this.kindOfDate);
    switch (this.kindOfDate.toString()) {
      case '1':
        this.searchDate('PAT_DATE_CREATE', this.myDate.Date);
        break;
      case '2':
        this.searchDate('PAT_INV_FROM', this.myDate.Date);
        break;
      case '3':
        this.searchDate('PAT_INV_TO', this.myDate.Date);
        break;
      case '4':
        this.searchDate('PAT_YoB', this.myDate.Date);
        break;
      case '5':
        this.searchDateRange(this.myDate.From, this.myDate.To);
        break;

      default:
        console.log('default')
        break;
    }
  }

  searchDate(Condition: string, Date: string) {
    if (!Date) {
      this.appService.alertMsg('Opps', 'Please select date');
      return;
    }
    this.filterPatients = [];
    console.log(Condition, Date);
    this.crudService.patientsGetAllByDate(Condition, Date)
      .then((res: any) => {
        console.log(res);
        this.filterPatients = res.PATIENTS;
        if (this.filterPatients.length < 1) {
          this.appService.toastMsg('No result', 3000);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  searchDateRange(From: string, To: string) {
    if (!From || !To) {
      this.appService.alertMsg('Opps', 'Please select dates');
      return;
    }
    if (From > To) {
      this.appService.alertMsg('Opps', 'Please select correct dates');
      return;
    }
    console.log(From, To);
  }
}
