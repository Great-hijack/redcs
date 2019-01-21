import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { iUsr } from '../../interfaces/usr.interface';
import { CrudService } from '../../services/crud.service';

@IonicPage()
@Component({
  selector: 'page-case-milestones',
  templateUrl: 'case-milestones.html',
})
export class CaseMilestonesPage {
  MSDATA: any[] = [
    { MSTEXT: "Suggested date by SP", MSID: '0', MSDATE: '' },
    { MSTEXT: "Patient admitted(date)", MSID: '1', MSDATE: '' },
    { MSTEXT: "Pre - casting treatment from", MSID: '2', MSDATE: '' },
    { MSTEXT: "Pre - casting treatment to", MSID: '3', MSDATE: '' },
    { MSTEXT: "Casting(date)", MSID: '4', MSDATE: '' },
    { MSTEXT: "Manufacturing from", MSID: '5', MSDATE: '' },
    { MSTEXT: "Manufacturing to", MSID: '6', MSDATE: '' },
    { MSTEXT: "Fitting(date)", MSID: '7', MSDATE: '' },
    { MSTEXT: "Training with device from", MSID: '8', MSDATE: '' },
    { MSTEXT: "Training with device to", MSID: '9', MSDATE: '' },
    { MSTEXT: "Finishing to", MSID: '10', MSDATE: '' },
    { MSTEXT: "Finishing from", MSID: '11', MSDATE: '' },
    { MSTEXT: "Delivery and Check out(date)", MSID: '12', MSDATE: '2018-08-20' },
  ]
  data;
  PATIENT: iPatient;
  USER: iUsr;
  MILESTONES: string[] = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private crudService: CrudService
  ) {
    this.data = this.navParams.data;
    this.PATIENT = this.data.PATIENT;
    this.USER = this.data.USER;
    
    if (typeof (this.USER) === 'undefined' || typeof (this.PATIENT) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))

    }else{
      this.MILESTONES = this.PATIENT.PAT_MILESTONE;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseMilestonesPage');
  }

  updateMilestone(){
    console.log(this.MILESTONES);
    // let MS = this.MILESTONES.map(MS=> MS.MSDATE);
    this.PATIENT.PAT_MILESTONE = this.MILESTONES;
    console.log(this.PATIENT);
    this.crudService.patientUpdate(this.PATIENT)
    .then((res: any)=>{
      console.log(res);
      this.navCtrl.pop();
    })
    .catch(err=> console.log(err))
  }

  

}
