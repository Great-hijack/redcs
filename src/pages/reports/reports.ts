import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExcelService } from '../../services/excel.service';
import { CrudService } from '../../services/crud.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';
import { iPatient } from '../../interfaces/patient.interface';
import { AppService } from '../../services/app.service';


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

  data: any[] = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000,
    location: {
      country: 'VN',
      city: 'HCM'
    },
    geo: {
      lat: 10.0,
      lng: 120
    }

  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000,
    location: {
      country: 'JP',
      city: 'Tokyo'
    },
    geo: {
      lat: 9.0,
      lng: 130
    }
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000,
    location: {
      country: 'KR',
      city: 'Seoul'
    },
    geo: {
      lat: 11.0,
      lng: 150
    }
  }];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private excelService: ExcelService,
    private langService: LangService,
    private localService: LocalService,
    private appService: AppService
  ) {
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
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }



  downloadReportOfPatients() {
    let ITEMS = this.appService.convertObj2Array(Object.assign({}, this.localService.BASIC_INFOS.PRICES))
    console.log(ITEMS);
    let ITEMS_OF_CENTER = ITEMS.filter(ITEM => ITEM.HCM > 0);
    console.log(ITEMS_OF_CENTER);
    this.crudService.patientGetAlls().then(qSnap => {
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
        PATIENT[ITEM.KEY] = ITEM.TOTAL;
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
        PATIENT_PRICE[ITEM.KEY] = ITEM.HCM;
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
        PATIENT_TOTAL[ITEM.KEY] = ITEM.HCM * ITEM.TOTAL;
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
      let TOTAL = 0;
      ITEMS_OF_CENTER.forEach((ITEM, index) => {
        TOTAL += ITEM.HCM * ITEM.TOTAL;
        PATIENT_TOTAL_TO_PAY[ITEM.KEY] = '';
      })
      PATIENT_TOTAL_TO_PAY[ITEMS_OF_CENTER[0].KEY] = TOTAL;
      patients.push(PATIENT_TOTAL_TO_PAY);
      console.log(patients);
      console.log(ITEMS_OF_CENTER);
      this.excelService.exportFromArrayOfObject2Excel(patients, 'patients');
    })
  }

  downloadReportOfUsers() {
    this.crudService.collectionGet('USERS').then(qSnap => {
      let results = [];
      qSnap.forEach(doc => {
        let USER = doc.data();
        console.log(USER);
        let REPORTS = {};
        REPORTS['ADDRESS'] = USER.U_ADDRESS;
        REPORTS['BIRTHDAY'] = USER.U_BIRTHDAY;
        REPORTS['EMAIL'] = USER.U_EMAIL;
        REPORTS['NAME'] = USER.U_NAME;
        REPORTS['ROLE'] = USER.U_ROLE;
        results.push(REPORTS);
      })
      this.excelService.exportFromArrayOfObject2Excel(results, 'USERS');
    })
  }

  // downloadReport1(COLLECTION: string, REPORT_NAME: string) {
  //   this.crudService.collectionGet(COLLECTION).then(qSnap => {
  //     let results = [];
  //     qSnap.forEach(doc => {
  //       let data = <iPatient>doc.data();
  //       console.log(data);
  //       let PATIENT = {};
  //       PATIENT['First Name'] = data.PAT_FNAME;
  //       PATIENT['Last Name'] = data.PAT_LNAME;
  //       PATIENT['Case No'] = data.PAT_CASENUMBER;
  //       PATIENT['Gender'] = data.PAT_SEX;
  //       PATIENT['Kind'] = data.PAT_KIND;
  //       PATIENT['Province'] = data.PAT_HOME_LOC.CITY;
  //       PATIENT['Dist'] = data.PAT_HOME_LOC.DIST;
  //       PATIENT['Ward'] = data.PAT_HOME_LOC.WARD;
  //       PATIENT['A1'] = data.PAT_COST.A1;
  //       PATIENT['A2'] = data.PAT_COST.A2;
  //       PATIENT['A3'] = data.PAT_COST.A3;
  //       PATIENT['A4'] = data.PAT_COST.A4;
  //       PATIENT['A5'] = data.PAT_COST.A5;
  //       PATIENT['A6'] = data.PAT_COST.A6;
  //       PATIENT['A7'] = data.PAT_COST.A7;
  //       PATIENT['B1'] = data.PAT_COST.B1;
  //       PATIENT['B2'] = data.PAT_COST.B2;
  //       PATIENT['B3'] = data.PAT_COST.B3;
  //       PATIENT['B4'] = data.PAT_COST.B4;
  //       PATIENT['B5'] = data.PAT_COST.B5;
  //       PATIENT['B6'] = data.PAT_COST.B6;
  //       PATIENT['B7'] = data.PAT_COST.B7;
  //       PATIENT['C1'] = data.PAT_COST.C1;
  //       PATIENT['C2'] = data.PAT_COST.C2;
  //       PATIENT['C3'] = data.PAT_COST.C3;




  //       results.push(PATIENT);
  //     })
  //     //console.log(results[0]);
  //     this.excelService.exportFromArrayOfObject2Excel(results, REPORT_NAME);
  //   })
}
}
