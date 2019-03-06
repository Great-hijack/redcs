import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExcelService } from '../../services/excel.service';
import { CrudService } from '../../services/crud.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';
import { iPatient } from '../../interfaces/patient.interface';


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
    private localService: LocalService
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
    this.crudService.patientGetAlls().then(qSnap => {
      let patients = [];
      qSnap.forEach(doc => {
        let data = <iPatient>doc.data();
        console.log(data);
        let PATIENT = {};
        PATIENT['First Name'] = data.PAT_FNAME;
        PATIENT['Last Name'] = data.PAT_LNAME;
        PATIENT['Case No'] = data.PAT_CASENUMBER;
        PATIENT['Gender'] = data.PAT_SEX;
        PATIENT['Kind'] = data.PAT_KIND;
        PATIENT['Provider'] = data.PAT_SVP;
        PATIENT['Job'] = typeof (data.PAT_JOB) == 'undefined' ? '' : data.PAT_JOB.EN;
        PATIENT['Province'] = typeof (data.PAT_HOME_LOC) == 'undefined' ? '' : data.PAT_HOME_LOC.CITY;
        PATIENT['Dist'] = typeof (data.PAT_HOME_LOC) == 'undefined' ? '' : data.PAT_HOME_LOC.DIST;
        PATIENT['Ward'] = typeof (data.PAT_HOME_LOC) == 'undefined' ? '' : data.PAT_HOME_LOC.WARD;
        PATIENT['A1'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.A1;
        PATIENT['A2'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.A2;
        PATIENT['A3'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.A3;
        PATIENT['A4'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.A4;
        PATIENT['A5'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.A5;
        PATIENT['A6'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.A6;
        PATIENT['A7'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.A7;
        PATIENT['B1'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.B1;
        PATIENT['B2'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.B2;
        PATIENT['B3'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.B3;
        PATIENT['B4'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.B4;
        PATIENT['B5'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.B5;
        PATIENT['B6'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.B6;
        PATIENT['B7'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.B7;
        PATIENT['C1'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.C1;
        PATIENT['C2'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.C2;
        PATIENT['C3'] = typeof (data.PAT_COST) == 'undefined' ? '' : data.PAT_COST.C3;
        patients.push(PATIENT);
      })
      this.excelService.exportFromArrayOfObject2Excel(patients, 'patients');
    })
  }

  downloadReport(COLLECTION: string, REPORT_NAME: string) {
    this.crudService.collectionGet(COLLECTION).then(qSnap => {
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
      this.excelService.exportFromArrayOfObject2Excel(results, REPORT_NAME);
    })
  }

  downloadReport1(COLLECTION: string, REPORT_NAME: string) {
    this.crudService.collectionGet(COLLECTION).then(qSnap => {
      let results = [];
      qSnap.forEach(doc => {
        let data = <iPatient>doc.data();
        console.log(data);
        let PATIENT = {};
        PATIENT['First Name'] = data.PAT_FNAME;
        PATIENT['Last Name'] = data.PAT_LNAME;
        PATIENT['Case No'] = data.PAT_CASENUMBER;
        PATIENT['Gender'] = data.PAT_SEX;
        PATIENT['Kind'] = data.PAT_KIND;
        PATIENT['Province'] = data.PAT_HOME_LOC.CITY;
        PATIENT['Dist'] = data.PAT_HOME_LOC.DIST;
        PATIENT['Ward'] = data.PAT_HOME_LOC.WARD;
        PATIENT['A1'] = data.PAT_COST.A1;
        PATIENT['A2'] = data.PAT_COST.A2;
        PATIENT['A3'] = data.PAT_COST.A3;
        PATIENT['A4'] = data.PAT_COST.A4;
        PATIENT['A5'] = data.PAT_COST.A5;
        PATIENT['A6'] = data.PAT_COST.A6;
        PATIENT['A7'] = data.PAT_COST.A7;
        PATIENT['B1'] = data.PAT_COST.B1;
        PATIENT['B2'] = data.PAT_COST.B2;
        PATIENT['B3'] = data.PAT_COST.B3;
        PATIENT['B4'] = data.PAT_COST.B4;
        PATIENT['B5'] = data.PAT_COST.B5;
        PATIENT['B6'] = data.PAT_COST.B6;
        PATIENT['B7'] = data.PAT_COST.B7;
        PATIENT['C1'] = data.PAT_COST.C1;
        PATIENT['C2'] = data.PAT_COST.C2;
        PATIENT['C3'] = data.PAT_COST.C3;




        results.push(PATIENT);
      })
      //console.log(results[0]);
      this.excelService.exportFromArrayOfObject2Excel(results, REPORT_NAME);
    })
  }
}
