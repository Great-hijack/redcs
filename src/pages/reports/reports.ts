import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExcelService } from '../../services/excel.service';
import { CrudService } from '../../services/crud.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';


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
    txtDownload: { EN: 'Download', VI: 'Tải về' },
    
  };
  pageId = 'ReportsPage';

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
      //this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }
  convertArray2Object() {
    let LANGUAGES: any[] = this.localService.BASIC_INFOS.LANGUAGES[this.pageId];
    let OBJ: any = {}
    LANGUAGES.forEach(element => {
      
    });(L => {
      OBJ[L.KEY] = L
    })
    console.log(OBJ);
    return OBJ;
  }


  downloadReportOfPatients() {
    this.crudService.patientGetAlls().then(qSnap => {
      let patients = [];
      qSnap.forEach(doc => {
        let patient = doc.data();
        patients.push(patient);
      })
      this.excelService.exportFromArrayOfObject2Excel(patients, 'patients');
    })
  }

  downloadReport(COLLECTION: string, REPORT_NAME: string) {
    this.crudService.collectionGet(COLLECTION).then(qSnap => {
      let results = [];
      qSnap.forEach(doc => {
        let data = doc.data();
        results.push(data);
      })
      this.excelService.exportFromArrayOfObject2Excel(results, REPORT_NAME);
    })
  }


  

}
