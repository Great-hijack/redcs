import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
@Injectable()


export class NotificationService {

     constructor(private afm: AngularFireMessaging) {

     }


     /**
 * request permission for notification from firebase cloud messaging
 * 
 * @param userId userId
 */
     requestPermissionx(userId: string) {
          console.log(userId);
          this.afm.requestToken
          .subscribe(
               (token) => {
                    console.log(token);
                    this.updateToken(userId, token);
               },
               (err) => {
                    console.error('Unable to get permission to notify.', err);
               }
          );
     }

     updateToken(userId, token){
          console.log(userId, token);
     }

}