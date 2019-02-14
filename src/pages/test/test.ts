import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { iPatient } from '../../interfaces/patient.interface';
import { DateService } from '../../services/date.service';


@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dateService: DateService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    // this.patientsUpdate();
    // this.updateBasicInfo();
    this.patientsUpdateWithNewDateFormat();
  }

  patientsUpdate() {
    let PATIENTS = [];
    let promises = [];
    firebase.firestore().collection('PATIENTS').get()
      .then((qSnap) => {
        qSnap.forEach(doc => {
          let P = <iPatient>doc.data();
          P.PAT_COST_LIST = {};
          PATIENTS.push(P);
          let promise = doc.ref.update(P)
          promises.push(promise);
        })

        return Promise.all(promises);
      })
      .then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }

  patientUpdate_COST_LIST(PAT: iPatient) {
    let P = PAT;
    P.PAT_COST_LIST = {};
    firebase.firestore().doc(`PATIENTS/${P.PAT_ID}`).update(P)
      .then((res) => {
        console.log(res, 'update success');
      })
      .catch((err) => {
        console.log(err);
      })
  }


  updateBasicInfo() {
    let SVPs = [
      { id: 'HCM', Center: 'HCMC', lastNumber: '00000' },
      { id: 'CTO', Center: 'Can Tho', lastNumber: '00000' },
      { id: 'DNG', Center: 'Da Nang', lastNumber: '00000' },
      { id: 'QNH', Center: 'Qui Nhon', lastNumber: '00000' },
    ];
    firebase.firestore().doc('INFOS/SVPs').set({ ServiceProviders: SVPs }).then((res) => {
      console.log(res);
    })
  };

  patientsUpdateWithNewDateFormat() {
    let PATIENTS = [];
    let promises = [];
    firebase.firestore().collection('PATIENTS').get()
      .then((qSnap) => {
        qSnap.forEach(doc => {
          let P = <iPatient>doc.data();
          P.PAT_DATE_CREATE = this.dateService.convertDateFormat(P.PAT_DATE_CREATE);
          PATIENTS.push(P);
          let promise = doc.ref.update(P)
          promises.push(promise);
        })

        return Promise.all(promises);
      })
      .then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }

}
