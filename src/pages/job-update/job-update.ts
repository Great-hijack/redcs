import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { flatten } from '@angular/compiler';
import { LangService } from '../../services/lang.service';

@IonicPage()
@Component({
  selector: 'page-job-update',
  templateUrl: 'job-update.html',
})
export class JobUpdatePage {
  BASIC_INFOS: any;
  JOBS: any[] = [];
  SELECTED_JOB: any;;
  isEdit: boolean = false;
  isAddNew: boolean = false;
  index: number = null;
  LANG = 'EN';
  LANGUAGES = [];
  lbJobsUpdate = { EN: 'Jobs Update', VI: 'Cập nhật việc làm' }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private langService: LangService
  ) {
    if (typeof (this.navParams.data.BASIC_INFOS) !== 'undefined') {
      this.BASIC_INFOS = this.navParams.data.BASIC_INFOS;
      console.log(this.BASIC_INFOS);
      this.JOBS = this.BASIC_INFOS.JOBS;
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobUpdatePage');
    this.LANG = this.langService.LANG;
    this.LANGUAGES = this.langService.LANGUAGES;
  }

  selectJob(job: any, i: number) {
    console.log(job);
    this.isEdit = true;
    this.isAddNew = false;
    this.SELECTED_JOB = job;
    this.index = i;
  }

  cancel() {
    this.isEdit = false;
    this.SELECTED_JOB = null;
    this.index = null;
    this.isAddNew = false;
  }

  updateJob() {
    console.log(this.SELECTED_JOB);
    this.JOBS[this.index] = this.SELECTED_JOB;
    this.BASIC_INFOS.JOBS = this.JOBS
    console.log(this.BASIC_INFOS);
    this.doUpdateBasicData();
    // this.updateArrayOfObject();
  }

  updateArrayOfObject() {
    let JOBSx = [
      { VI: 'Sinh Vien', EN: 'Student' },
      { VI: 'Xe om', EN: 'Moto taxi driver' },
      { VI: 'Nong dan', EN: 'Farmer' },
      { VI: 'Giao vien', EN: 'Teacher' },
      { VI: 'Ky su', EN: 'Engineer' }
    ];
    this.BASIC_INFOS['JOBS'] = JOBSx;
    this.doUpdateBasicData();

  }



  addNewJob() {
    this.SELECTED_JOB = {};
    this.LANGUAGES.forEach(L => {
      this.SELECTED_JOB[L] = null;
    })
    this.isEdit = false;
    this.isAddNew = true;
  }

  doAddNewJob() {
    console.log(this.SELECTED_JOB);
    this.JOBS.push(this.SELECTED_JOB);
    this.BASIC_INFOS.JOBS = this.JOBS;
    this.doUpdateBasicData();
  }

  doUpdateBasicData() {
    this.crudService.updateBasicData(this.BASIC_INFOS)
      .then((res) => {
        console.log(res);
        this.cancel();
      })
      .catch(err => {
        console.log(err);
        this.cancel();
      })
  }


}
