import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { LoadingService } from '../../services/loading.service';


@IonicPage()
@Component({
  selector: 'page-privacy-update',
  templateUrl: 'privacy-update.html',
})
export class PrivacyUpdatePage {
  PRIVACY: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private loadingService: LoadingService
  ) {
    this.PRIVACY = this.localService.PRIVACY_DEFAULT;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyUpdatePage');
    if(this.localService.BASIC_INFOS){
      this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY;
    }else{
      this.crudService.getBasicData()
      .then(()=>{
        this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY;
      })
    }
  }

  updatePrivacy() {
    console.log(this.PRIVACY);
    this.loadingService.startLoading();
    if (this.localService.BASIC_INFOS_GOT) {
      let BASIC_DATA = this.localService.BASIC_INFOS;
      BASIC_DATA['PRIVACY'] = this.PRIVACY;
      console.log(BASIC_DATA);
      this.updateBasicData(BASIC_DATA);
    } else {
      this.crudService.getBasicData().then(res => {
        let BASIC_DATA = this.localService.BASIC_INFOS;
        BASIC_DATA['PRIVACY'] = this.PRIVACY;
        console.log(BASIC_DATA);
        this.updateBasicData(BASIC_DATA);
      })
    }
  }

  updateBasicData(DATA){
    this.crudService.updateBasicData(DATA)
    .then(res=>{
      console.log(res);
      this.loadingService.hideLoading();
      this.navCtrl.pop();
    })
    .catch(err=>{
      console.log(err);
      this.loadingService.hideLoading();
    })
  }

  cancel(){
    this.navCtrl.pop();
  }

}
