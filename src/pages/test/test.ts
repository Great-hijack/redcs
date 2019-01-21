import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { iPatient } from '../../interfaces/patient.interface';
import { p } from '@angular/core/src/render3';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    // this.patientsUpdate();
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
      .then((res)=>{
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

}
