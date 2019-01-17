import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { filter, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable()


export class NotificationService {
    currentMessage = new BehaviorSubject(null);
    constructor(
        // private afm: AngularFireMessaging,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore
    ) {
        // this.afm.messaging.subscribe(_messaging => {
        //     _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        //     _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        // })
    }

    /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
    updateToken(userId, token) {
        // we can change this function to request our backend service
        this.afAuth.authState
            .pipe(
                filter(user => !!user),
                take(1))
            .subscribe(() => {
                const data = {};
                data[userId] = token
                this.afs.doc(`fcmTokens/${userId}`).set(data)
            })
    }

//     /**
//    * request permission for notification from firebase cloud messaging
//    * 
//    * @param userId userId
//    */
//   requestPermission(userId: string) {
//     console.log(userId);
//     this.afm.requestToken.subscribe(
//       (token) => {
//         console.log(token);
//         this.updateToken(userId, token);
//       },
//       (err) => {
//         console.error('Unable to get permission to notify.', err);
//       }
//     );
//   }

//   /**
//    * hook method when new notification received in foreground
//    */
//   receiveMessage() {
//     this.afm.messages.subscribe(
//       (payload) => {
//         console.log("new message received. ", payload);
//         this.currentMessage.next(payload);
//       })
//   }



//     // requestPermission() {
//     //     messaging.requestPermission().then(function () {
//     //         console.log('Notification permission granted.');
//     //         // TODO(developer): Retrieve an Instance ID token for use with FCM.
//     //         // ...
//     //     }).catch(function (err) {
//     //         console.log('Unable to get permission to notify.', err);
//     //     });
//     // }




}