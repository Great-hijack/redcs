import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { iPatient } from '../../interfaces/patient.interface';

@IonicPage()
@Component({
  selector: 'page-patient-add',
  templateUrl: 'patient-add.html',
})
export class PatientAddPage {
  PATIENT: iPatient;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private localService: LocalService
  ) {
    this.PATIENT = this.localService.PATIENT_DEFAULT;
    console.log(this.PATIENT);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientAddPage');
  }

  addPatient(){
    console.log(this.PATIENT);
  }

}
