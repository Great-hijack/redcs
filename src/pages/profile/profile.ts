import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { DbService } from '../../services/db.service';
import { LocalService } from '../../services/local.service';
import { LoadingService } from '../../services/loading.service';
import { AppService } from '../../services/app.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { CrudService } from '../../services/crud.service';
import { iUsr } from '../../interfaces/usr.interface';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: any;
  USER: iUsr = null;
  // USER_ID: string = null;
  base64Images: string[] = [];
  hasNewAvatar: boolean = false;
  isVerified: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private dbService: DbService,
    private localService: LocalService,
    private loadingService: LoadingService,
    private appService: AppService,
    private crudService: CrudService
  ) {
    let USER = this.localService.USR;
    console.log(USER);
    if (USER) {
      this.USER = USER;
    }
    this.data = this.navParams.data;
    console.log(this.data);
    if (typeof (this.data.USER_ID) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.checkUserEmailVerified();
    }



    // this.data = this.navParams.data;
    // this.USER_ID = this.data.USER_ID;
    // if (typeof (this.USER_ID) == 'undefined') {
    //   this.navCtrl.setRoot('HomePage');
    // } else {
    //   firebase.firestore().doc('USERS/' + this.USER_ID).get().then((docSnap)=>{
    //     if(docSnap.exists){
    //       console.log(docSnap, docSnap.data());
    //       this.USER = <iUser>docSnap.data();
    //     }else{
    //       console.log('user info not exist');
    //     }
    //   })
    //   .then(()=>{
    //     let email = firebase.auth().currentUser.email;
    //     this.USER.U_EMAIL = email;
    //     this.isVerified = firebase.auth().currentUser.emailVerified;
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })
    // }
    // console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  onUpdateProfile() {
    console.log(this.USER);
    this.localService.USR = this.USER;
    if (this.USER.U_ID) {
      this.loadingService.startLoading();
      this.crudService.usrProfileCreate(this.USER)
        .then((res) => {
          this.loadingService.hideLoading();
        })
        .catch((err) => {
          this.loadingService.hideLoading();
        })
      // firebase.firestore().doc('USERS/' + this.USER.U_ID).set(this.USER)
      //   .then((res) => {
      //     console.log('Updated done', res);
      //     this.appService.toastMsg('Updated successfully', 3000);
      //     this.loadingService.hideLoading();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     this.loadingService.hideLoading();
      //   })
      
    } else {
      this.appService.alertMsg('Error', 'Please sign in to update profile');
    }
  }

  takePhoto() {
    console.log('take Photo');
    let photosModal = this.modalCtrl.create('PhotoTakePage', { PHOTOS: this.base64Images });
    photosModal.onDidDismiss((data) => {
      console.log(data);
      this.base64Images = data.PHOTOS;
      this.hasNewAvatar = true;
      this.uploadImageThenUpdateURL();
    });
    photosModal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  uploadImageThenUpdateURL() {
    // console.log(this.PROFILE);
    this.dbService.uploadBase64Image2FBReturnPromiseWithURL('Avatar/' + this.USER.U_ID, this.base64Images[0], this.USER.U_ID)
      .then((downloadURL: string) => {
        this.USER.U_AVATAR = downloadURL;
        console.log(this.USER);
        // this.onUpdateProfile();
      })
      .catch((err) => console.log(err));
  }

  go2VerifyEmail() {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then((res) => {
      this.appService.alertMsg('Email sent', 'Please check your inbox to verity your account...')
    }).catch((err) => {
      this.appService.alertError('Error', 'Something not right: ' + err);
    })
  }

  checkUserEmailVerified() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.isVerified = user.emailVerified;
      this.USER.U_EMAIL = user.email;
      this.USER.U_ID = user.uid;
    }
  }

  updateEmail(EMAIL: string) {
    firebase.auth().currentUser.updateEmail(EMAIL).then((res) => {
      console.log(res);
      this.appService.alertMsg('Success', 'email changed to ' + EMAIL);
      firebase.auth().signOut();
      this.navCtrl.setRoot('HomePage');
    }).catch((err) => {
      this.appService.alertMsg('Alert', 'Please re-login to change email. Thanks');
    })
  }

  // doUpdateEmail() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Update Email',
  //     message: "Enter new email you want to update your account",
  //     inputs: [
  //       {
  //         name: 'email',
  //         placeholder: 'New Email'
  //       },
  //       {
  //         name: 'email1',
  //         placeholder: 'Re-type New Email'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Update',
  //         handler: data => {
  //           console.log('Saved clicked', data);
  //           if (data.email === data.email1) {
  //             this.updateEmail(data.email);
  //           } else {
  //             this.appService.alertError('Error', 'Email not match');
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // doUpdateCalendar() {
  //   // // console.log('Update Calendar');
  //   // // let modalCtrl = this.modalCtrl.create('CalendarUpdatePage',{USER: this.USER});
  //   // // modalCtrl.onDidDismiss((data)=>{
  //   // //   console.log(data);
  //   // // });
  //   // // modalCtrl.present();
  //   // console.log('Update Calendar');
  //   // let modalCtrl = this.modalCtrl.create('ScheduleViewPage',{USER: this.USER});
  //   // modalCtrl.onDidDismiss((data)=>{
  //   //   console.log(data);
  //   // });
  //   // modalCtrl.present();
  //   this.navCtrl.push('ScheduleViewPage', { USER: this.USER });
  // }


  // doUpdateLocation() {
  //   let modal = this.modalCtrl.create('LocationsSearchPage');
  //   modal.onDidDismiss((data) => {
  //     console.log(data);
  //     if (data && typeof (data.LOCATION) !== 'undefined') {
  //       this.USER.U_LOCATION = data.LOCATION;
  //     }
  //   })
  //   modal.present();
  // }

  // doUpdateLanguage(LANG, i) {
  //   console.log(LANG, i);
  //   let actionSheet = this.actionSheetCtrl.create({
  //     buttons: [
  //       {
  //         text: '- Remove Language',
  //         role: 'destructive',
  //         handler: () => {
  //           console.log('Delete clicked');
  //           this.removeLang(LANG, i);
  //         }
  //       }, {
  //         text: '+ Add Language',
  //         handler: () => {
  //           console.log('Add new clicked');
  //           this.addLang();
  //         }
  //       }, {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  // removeLang(LANG, i) {
  //   if (this.USER.U_GUIDE_LANG.length > 1) {
  //     this.USER.U_GUIDE_LANG.splice(i, 1);
  //   }
  // }

  // addLang() {
  //   let promp = this.alertCtrl.create({
  //     title: 'New Language',
  //     message: 'Enter a new language you can speak',
  //     inputs: [
  //       {
  //         name: 'NEW_LANG',
  //         placeholder: 'Language'
  //       },
  //       {
  //         name: 'LEVEL',
  //         placeholder: '1: intermediate, 2: advance, 3: profesional, 4: native'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Add',
  //         handler: (data) => {
  //           console.log('Saved clicked', data);
  //           this.addNewLang(data);
  //         }
  //       }
  //     ]
  //   });
  //   promp.present();
  // }

  // addSkill() {
  //   let promp = this.alertCtrl.create({
  //     title: 'New Skill',
  //     message: 'Enter a new skill you have',
  //     inputs: [
  //       {
  //         name: 'NEW_SKILL',
  //         placeholder: 'Any skill you have'
  //       },
  //       // {
  //       //   name: 'LEVEL',
  //       //   placeholder: '1: intermediate, 2: advance, 3: profesional, 4: native'
  //       // }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Add',
  //         handler: (data) => {
  //           console.log('Saved clicked', data);
  //           this.addNewSkill(data.NEW_SKILL);
  //         }
  //       }
  //     ]
  //   });
  //   promp.present();
  // }

  // addNewSkill(SKILL: string) {
  //   console.log(SKILL);
  //   if (this.USER.U_GUIDE_SKILLS) {
  //     let index = this.USER.U_GUIDE_SKILLS.indexOf(SKILL);
  //     if (index < 0) {
  //       this.USER.U_GUIDE_SKILLS.push(SKILL);
  //     } else {
  //       this.appService.alertError('Error', SKILL + ' already added');
  //     }
  //   } else {
  //     this.USER.U_GUIDE_SKILLS = [];
  //     this.USER.U_GUIDE_SKILLS.push(SKILL);
  //   }
  // }

  // addNewLang(DATA) {
  //   let LANG = { L_NAME: DATA.NEW_LANG, L_LEVEL: 'Advance', L_FLAG: '' };
  //   if (this.USER.U_GUIDE_LANG) {
  //     console.log(this.USER.U_GUIDE_LANG);
  //   } else {
  //     this.USER.U_GUIDE_LANG = [];
  //     this.USER.U_GUIDE_LANG.push(LANG);
  //     console.log(this.USER.U_GUIDE_LANG);
  //   }
  //   // console.log(ILANG);
  //   // let index = -1;
  //   // if(this.USER.U_GUIDE_LANG){
  //   //   index = this.USER.U_GUIDE_LANG.map(LANGUAGE => LANGUAGE.L_NAME.toLocaleLowerCase()).indexOf(ILANG.NEW_LANG.toLocaleLowerCase())
  //   // }
  //   // // let index = this.TABLES.indexOf(table);
  //   // if (index < 0) {
  //   //   this.USER.U_GUIDE_LANG.push(ILANG);
  //   // } else {
  //   //   alert(ILANG + ' already exists');
  //   // }
  // }

  // go2SetLanguage() {
  //   let modal = this.modalCtrl.create('LanguageSetPage', { LANG: this.USER.U_GUIDE_LANG });
  //   modal.onDidDismiss((data) => {
  //     console.log(data);
  //     if (data && typeof (data) !== 'undefined') {
  //       // this.LOCATION = data.LOCATION;
  //       // if (typeof (data.PAGE) !== 'undefined') {
  //       //   this.go2Page(data, data.PAGE);
  //       // } else {
  //       //   this.go2Shop(data.SHOP);
  //       // }
  //       // // if (typeof (data.SHOP) !== 'undefined') {
  //       // //   this.go2Shop(data.SHOP);
  //       // // }
  //       this.USER.U_GUIDE_LANG = data.LANG;
  //     }
  //   })
  //   modal.present().catch((err) => { console.log(err) });
  // }


}
