import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-google-vision',
  templateUrl: 'google-vision.html',
})
export class GoogleVisionPage {
  ROOT_URL = 'https://vision.googleapis.com';
  API_KEY = 'AIzaSyCLTYq3SSnMtFbcduVYqy4vOl7Je8Kxx1c';
  public visionRequest = {
    "requests": [{
      "image": {
        "content": ""
      },
      "features": [{
        "type": "FACE_DETECTION",
        "maxResults": 10
      }]
    }]
  };
  public visionResult = {
    angerLikelihood: null,
    blurredLikelihood: null,
    headwearLikelihood: null,
    joyLikelihood: null,
    sorrowLikelihood: null,
    surpriseLikelihood: null,
    underExposedLikelihood: null,
    detectionConfidence: null
  };
  public imageResult = 'https://i.imgur.com/hyRulHk.gif';
  base64Images = [];
  result: string = ''
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private modalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleVisionPage');
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
        this.doVisionRequest(this.base64Images[0]);
      }
    });
    photosModal.present()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })

  }


  doVisionRequest(base64Image: string) {
    console.log(base64Image);
    let newBase64 = base64Image.slice(23);
    console.log(newBase64);
    let body = {
      "requests": [{
        "image": {
          "content": newBase64
        },
        "features": [{
          "type": "TEXT_DETECTION",
          "maxResults": 10
        }]
      }]
    }
    this.http.post(`${this.ROOT_URL}/v1p3beta1/images:annotate?key=${this.API_KEY}`, body)
      .subscribe((data: any) => {
        console.log(data);
        this.result = data.responses[0].fullTextAnnotation.text;
      }, (err) => {
        console.log(err);
      })
  }

}
