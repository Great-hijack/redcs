import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DbService } from '../../services/db.service';
import { iPatient } from '../../interfaces/patient.interface';
import { iUsr } from '../../interfaces/usr.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';

@IonicPage()
@Component({
  selector: 'page-case-images',
  templateUrl: 'case-images.html',
})
export class CaseImagesPage {
  data;
  PATIENT: iPatient;
  USER: iUsr;
  base64Images: string[] = [];
  isShown: boolean = false;
  isDisabled: boolean = false;
  IMG_DES: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private dbService: DbService,
    private crudService: CrudService,
    private appService: AppService
  ) {
    this.data = this.navParams.data;
    this.PATIENT = this.data.PATIENT;
    this.USER = this.data.USER;
    if (typeof (this.PATIENT) == 'undefined' || typeof (this.USER) == 'undefined') {
      this.navCtrl.setRoot('HomePage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseImagesPage');
  }

  takePhotos() {
    console.log('takePhotos');
    // this.selectPhotosByBrowser();
    let photosModal = this.modalCtrl.create('PhotoTakePage', { PHOTOS: this.base64Images });
    photosModal.onDidDismiss((data) => {
      console.log(data);
      // this.base64Images = data.PHOTOS;
      // this.hasNewAvatar = true;
      if (data && !data.isCancel) {
        this.base64Images = data.PHOTOS;
      }
    });
    photosModal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })

  }

  uploadImage() {
    this.isDisabled = true;
    let name = Date.now().toString();
    this.dbService.uploadBase64Image2FBReturnPromiseWithURL('PATIENTS/' + this.PATIENT.PAT_ID, this.base64Images[0], name)
      .then((res: string) => {
        console.log(res);
        let data = {
          URL: res,
          DES: this.IMG_DES,
          TIME: this.appService.getCurrentDateFormat3(),
          BY: this.USER.U_NAME,
          BY_UID: this.USER.U_ID
        }
        this.PATIENT.PAT_IMAGES.push(data);
        return this.crudService.patientUpdate(this.PATIENT);
      })
      .then(() => {
        this.isShown = false;
        this.base64Images = [];
        this.isDisabled = false;
      })
      .catch(err => {
        console.log(err);
        this.isDisabled = false;
      })
  }

}
