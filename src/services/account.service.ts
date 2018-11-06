import { Injectable } from '@angular/core';
import { iUsr } from '../interfaces/usr.interface';
import { AppService } from './app.service';
// import { NavController } from 'ionic-angular';

// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import { AngularFireService } from './af.service';

@Injectable()


export class AccountService {
    isSigned: boolean = false;
    uid: string;
    email: string;
    constructor(
        // public navCtrl: NavController,
        // private afService: AngularFireService
        private appService: AppService
    ) { }


    isUserExpired(USR: iUsr) {
        let TODAY = this.appService.getCurrentDateFormat1();
        console.log(TODAY)
        if (USR.U_VALID_TO > TODAY) {
            console.log('your account valid');
            return false;
        } else {
            console.log('your account expired');
            this.appService.alertMsg('Attention', 'Your account is expired. Contact admin plz');
            // this.navCtrl.setRoot('HomePage');
            return true;
        }
    }


}