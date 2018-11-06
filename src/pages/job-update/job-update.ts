import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { flatten } from '@angular/compiler';

/**
 * Generated class for the JobUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-update',
  templateUrl: 'job-update.html',
})
export class JobUpdatePage {
  BASIC_INFOS: any;
  JOBS: any[] = [];
  SELECTED_JOB: string ='';
  isEdit: boolean = false;
  isAddNew: boolean = false;
  index: number = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private crudService: CrudService
    ) {
    this.BASIC_INFOS = this.navParams.data.BASIC_INFOS;
    console.log(this.BASIC_INFOS);
    this.JOBS = this.BASIC_INFOS.JOBS;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobUpdatePage');
  }

  selectJob(job, i){
    console.log(job);
    this.isEdit = true;
    this.isAddNew = false;
    this.SELECTED_JOB = job;
    this.index = i;
  }

  cancel(){
    this.isEdit = false;
    this.SELECTED_JOB = null;
    this.index = null;
    this.isAddNew = false;
  }

  updateJob(){
    console.log(this.SELECTED_JOB);
    this.JOBS[this.index] = this.SELECTED_JOB;
    this.BASIC_INFOS.JOBS = this.JOBS
    console.log(this.BASIC_INFOS);
    this.doUpdateBasicData();
  }



  addNewJob(){
    this.SELECTED_JOB='';
    this.isEdit = false;
    this.isAddNew = true;
  }

  doAddNewJob(){
    console.log(this.SELECTED_JOB);
    this.JOBS.push(this.SELECTED_JOB);
    this.BASIC_INFOS.JOBS = this.JOBS;
    this.doUpdateBasicData();
  }

  doUpdateBasicData(){
    this.crudService.updateBasicData(this.BASIC_INFOS)
    .then((res)=>{
      console.log(res);
      this.cancel();
    })
    .catch(err=>{
      console.log(err);
      this.cancel();
    })
  }


}
