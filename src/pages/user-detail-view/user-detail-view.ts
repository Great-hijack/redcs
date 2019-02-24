import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';


@IonicPage()
@Component({
  selector: 'page-user-detail-view',
  templateUrl: 'user-detail-view.html',
})
export class UserDetailViewPage {
  data: any;
  USER: iUser;
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
    if (this.localService.BASIC_INFOS) {
      this.ROLES = this.localService.BASIC_INFOS.ROLES;
      this.STATES = this.localService.BASIC_INFOS.STATES;
    } else {
      this.crudService.getBasicData()
        .then((res) => {
          console.log(res);
          this.ROLES = this.localService.BASIC_INFOS.ROLES;
          this.STATES = this.localService.BASIC_INFOS.STATES;
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailViewPage');
  }

  updateUser() {
    this.crudService.userUpdate(this.USER)
      .then((res) => {
        console.log(res);
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
      })
  }

}
