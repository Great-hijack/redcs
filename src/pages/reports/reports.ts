import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExcelService } from '../../services/excel.service';
import { CrudService } from '../../services/crud.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';
import { iPatient } from '../../interfaces/patient.interface';
import { AppService } from '../../services/app.service';
import { iUser } from '../../interfaces/user.interface';


@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Reports', VI: 'Báo cáo' },
    txtUserReport: { EN: 'Users report', VI: 'Báo cáo người dùng' },
    txtPatientReport: { EN: 'Patients report', VI: 'Báo cáo Bệnh nhân' },
    txtDownload: { EN: 'Download', VI: 'Tải về' },
  };
  pageId = 'ReportsPage';

  HEADEXCEL = {
    U_ADDRESS: { EN: 'ADDRESS', VI: 'ĐỊA CHỈ' },
    U_AVATAR: { EN: 'AVATAR', VI: 'HÌNH ĐẠI DIỆN' },
    U_BIRTHDAY: { EN: 'BIRTHDAY', VI: 'NGÀY SINH' },
    U_EMAIL: { EN: 'EMAIL', VI: 'EMAIL' },
    U_ID: { EN: 'ID', VI: 'MÃ SỐ' },
    U_NAME: { EN: 'NAME', VI: 'TÊN' },
    U_ROLE: { EN: 'ROLE', VI: 'QUYỀN' },
    U_TEL: { EN: 'TEL', VI: 'SĐT' },
    U_VALID_FROM: { EN: 'VALID FROM', VI: 'CÓ GIÁ TRỊ TỪ' },
    U_VALID_TO: { EN: 'VALID TO', VI: 'CÓ GIÁ TRỊ ĐẾN' },
  }

  selectedITEMsOfCenter = [];
  selectedCenter = 'HCM';
  selectedTOTAL = 0;
  selectedMonth = '2019-01-01';
  ITEMS = [];
  _PRICES = [];
  data: any;
  USER: iUser;
  isMA: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private excelService: ExcelService,
    private langService: LangService,
    private localService: LocalService,
    private appService: AppService
  ) {
    this.USER = this.navParams.get('USER');
    console.log(this.USER);
    if (this.USER.U_ROLE == 'MoveAbility') {
      this.isMA = true;
    }

    if (this.USER.U_ROLE == 'Service Provider') {
      this.isMA = false;
      this.selectedCenter = this.USER.U_ORG.id;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
    // this.downloadReport('USERS', 'USERS');
    // this.crudService.cloneColection();
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);

      this._PRICES = this.appService.convertObj2Array(Object.assign({}, this.localService.BASIC_INFOS.PRICES))
      console.log(this._PRICES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  downloadReportOfPatientsForCenter(CENTER: string) {
    console.log(this.selectedMonth);
    this.ITEMS = this._PRICES.slice();
    console.log(this.ITEMS, this._PRICES);
    this.selectedITEMsOfCenter = [];
    this.selectedCenter = CENTER;
    let ITEMS_OF_CENTER = this.ITEMS.filter(ITEM => ITEM[CENTER] > 0);
    ITEMS_OF_CENTER.map(ITEM => ITEM.TOTAL = 0);

    console.log(ITEMS_OF_CENTER);
    // this.crudService.patientsGetAllOfServiceProvider(CENTER)
    let YYYYMM = this.selectedMonth.substr(0, 4) + this.selectedMonth.substr(5, 2);
    this.crudService.patientsGetAllOfServiceProviderInMonth(CENTER, YYYYMM)
      .then(qSnap => {
        let patients = [];

        qSnap.forEach(doc => {
          let PATIENT_ = <iPatient>doc.data();
          console.log(PATIENT_);
          let PATIENT = {};
          PATIENT['First Name'] = PATIENT_.PAT_FNAME;
          PATIENT['Last Name'] = PATIENT_.PAT_LNAME;
          PATIENT['Case No'] = PATIENT_.PAT_CASENUMBER;
          PATIENT['Gender'] = PATIENT_.PAT_SEX;
          PATIENT['Kind'] = PATIENT_.PAT_KIND;
          PATIENT['Provider'] = PATIENT_.PAT_SVP;
          PATIENT['Job'] = typeof (PATIENT_.PAT_JOB) == 'undefined' ? '' : PATIENT_.PAT_JOB.EN;
          PATIENT['Province'] = (typeof (PATIENT_.PAT_HOME_LOC) == 'undefined' || !PATIENT_.PAT_HOME_LOC) ? '' : PATIENT_.PAT_HOME_LOC.CITY;
          PATIENT['Dist'] = (typeof (PATIENT_.PAT_HOME_LOC) == 'undefined' || !PATIENT_.PAT_HOME_LOC) ? '' : PATIENT_.PAT_HOME_LOC.DIST;
          PATIENT['Ward'] = (typeof (PATIENT_.PAT_HOME_LOC) == 'undefined' || !PATIENT_.PAT_HOME_LOC) ? '' : PATIENT_.PAT_HOME_LOC.WARD;

          ITEMS_OF_CENTER.forEach(ITEM => {
            if (PATIENT_.PAT_COST) {
              PATIENT[ITEM.KEY] = typeof (PATIENT_.PAT_COST[ITEM.KEY]) == 'undefined' ? 0 : PATIENT_.PAT_COST[ITEM.KEY];
              console.log(PATIENT[ITEM.KEY]);
              ITEM.TOTAL += Number(PATIENT[ITEM.KEY]);
            }
          })
          this.selectedITEMsOfCenter = ITEMS_OF_CENTER.slice();
          patients.push(PATIENT);
        });

        let PATIENT = {};
        PATIENT['First Name'] = '';
        PATIENT['Last Name'] = '';
        PATIENT['Case No'] = '';
        PATIENT['Gender'] = '';
        PATIENT['Kind'] = '';
        PATIENT['Provider'] = '';
        PATIENT['Job'] = '';
        PATIENT['Province'] = '';
        PATIENT['Dist'] = '';
        PATIENT['Ward'] = 'Total in use';

        ITEMS_OF_CENTER.forEach(ITEM => {
          PATIENT[ITEM.KEY] = ITEM.TOTAL; // from here,
        })
        patients.push(PATIENT);

        let PATIENT_PRICE = {};
        PATIENT_PRICE['First Name'] = '';
        PATIENT_PRICE['Last Name'] = '';
        PATIENT_PRICE['Case No'] = '';
        PATIENT_PRICE['Gender'] = '';
        PATIENT_PRICE['Kind'] = '';
        PATIENT_PRICE['Provider'] = '';
        PATIENT_PRICE['Job'] = '';
        PATIENT_PRICE['Province'] = '';
        PATIENT_PRICE['Dist'] = '';
        PATIENT_PRICE['Ward'] = 'Price';

        ITEMS_OF_CENTER.forEach(ITEM => {
          PATIENT_PRICE[ITEM.KEY] = ITEM[CENTER];
        })
        patients.push(PATIENT_PRICE);
        let PATIENT_TOTAL = {};
        PATIENT_TOTAL['First Name'] = '';
        PATIENT_TOTAL['Last Name'] = '';
        PATIENT_TOTAL['Case No'] = '';
        PATIENT_TOTAL['Gender'] = '';
        PATIENT_TOTAL['Kind'] = '';
        PATIENT_TOTAL['Provider'] = '';
        PATIENT_TOTAL['Job'] = '';
        PATIENT_TOTAL['Province'] = '';
        PATIENT_TOTAL['Dist'] = '';
        PATIENT_TOTAL['Ward'] = 'Cost in Total';

        ITEMS_OF_CENTER.forEach(ITEM => {
          PATIENT_TOTAL[ITEM.KEY] = ITEM[CENTER] * ITEM.TOTAL;
        })
        patients.push(PATIENT_TOTAL);
        let PATIENT_TOTAL_TO_PAY = {};
        PATIENT_TOTAL_TO_PAY['First Name'] = '';
        PATIENT_TOTAL_TO_PAY['Last Name'] = '';
        PATIENT_TOTAL_TO_PAY['Case No'] = '';
        PATIENT_TOTAL_TO_PAY['Gender'] = '';
        PATIENT_TOTAL_TO_PAY['Kind'] = '';
        PATIENT_TOTAL_TO_PAY['Provider'] = '';
        PATIENT_TOTAL_TO_PAY['Job'] = '';
        PATIENT_TOTAL_TO_PAY['Province'] = '';
        PATIENT_TOTAL_TO_PAY['Dist'] = '';
        PATIENT_TOTAL_TO_PAY['Ward'] = 'Total';
        this.selectedTOTAL = 0;
        ITEMS_OF_CENTER.forEach((ITEM, index) => {
          this.selectedTOTAL += ITEM[CENTER] * ITEM.TOTAL;
          PATIENT_TOTAL_TO_PAY[ITEM.KEY] = '';
        })
        PATIENT_TOTAL_TO_PAY[ITEMS_OF_CENTER[0].KEY] = this.selectedTOTAL;
        patients.push(PATIENT_TOTAL_TO_PAY);
        console.log(patients);
        console.log(ITEMS_OF_CENTER);
        this.excelService.exportFromArrayOfObject2Excel(patients, 'patients_' + CENTER);
      })
  }
}
