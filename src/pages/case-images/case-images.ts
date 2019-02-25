import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DbService } from '../../services/db.service';
import { iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-case-images',
  templateUrl: 'case-images.html',
})
export class CaseImagesPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Images', VI: 'Hình ảnh' },
    txtUpload: { EN: 'Upload', VI: 'Tải lên' },
    txtBy: { EN: 'By', VI: 'Bởi' },
    txtOn: { EN: 'on', VI: 'lúc' },
  };
  pageId = 'CaseImagesPage';

  data;
  PATIENT: iPatient;
  USER: iUser;
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
    private appService: AppService,
    private langService: LangService,
    private localService: LocalService

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
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.convertArray2Object();
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  convertArray2Object() {
    let LANGUAGES: any[] = this.localService.BASIC_INFOS.LANGUAGES[this.pageId];
    let OBJ: any = {}
    LANGUAGES.forEach(L => {
      OBJ[L.KEY] = L
    })
    console.log(OBJ);
    return OBJ;
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
          TIME: this.appService.getCurrentDateAndTime(),
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
