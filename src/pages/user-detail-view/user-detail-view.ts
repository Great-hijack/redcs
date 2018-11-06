import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUsr } from '../../interfaces/usr.interface';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';


@IonicPage()
@Component({
  selector: 'page-user-detail-view',
  templateUrl: 'user-detail-view.html',
})
export class UserDetailViewPage {
  data: any;
  USER: iUsr;
  STATES = []
  ROLES = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private crudService: CrudService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    console.log(this.USER);
    this.ROLES = this.localService.BASIC_INFOS.ROLES;
    this.STATES = this.localService.BASIC_INFOS.STATES;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailViewPage');
  }

  updateUser(){
    this.crudService.usrUpdate(this.USER)
    .then((res)=>{
      console.log(res);
      this.navCtrl.pop();
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}
