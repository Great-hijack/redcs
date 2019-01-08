import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { iUsr } from '../../interfaces/usr.interface';
import { UserDetailViewPage } from '../user-detail-view/user-detail-view';
import { AppService } from '../../services/app.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-user-manage',
  templateUrl: 'user-manage.html',
})
export class UserManagePage {
USERS: any[] = [];
  ROLES =  [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private appService: AppService,
    private localService: LocalService,
    private actionSheetCtrl: ActionSheetController
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserManagePage');
    this.getAllUsers();
  }

  getAllUsers() {
    this.USERS = [];
    this.crudService.getAllUsrs()
      .then((res) => {
        res.forEach(doc => {
          let USER = doc.data();
          this.USERS.push(USER);
        })
        console.log(this.USERS);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  takeAction(USER: iUsr, ACTION: string) {
    console.log(USER, ACTION);
    switch (ACTION) {
      case 'APPROVED':
        USER.U_STATE = ACTION;
        USER.U_VALID_FROM = this.appService.getCurrentDate();
        console.log(USER);
        break;
      case 'SUSPENDED':
        USER.U_STATE = ACTION;
        console.log(USER);
        break;
      case 'DELETED':
        USER.U_STATE = ACTION;
        console.log(USER);
        break;
      default:
        break;
    }
    this.updateUser(USER);
  }

  go2UserDetailView(USER: iUsr) {
    this.navCtrl.push('UserDetailViewPage', {USER: USER})
  }

  updateUser(USER: iUsr) {
    this.crudService.usrUpdate(USER).then((res) => {
      console.log(res);
    })
      .catch((err) => {
        console.log(err);
      })
  }

  doAction(USER) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify authority',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takeAction(USER,'DELETED');
          }
        },{
          text: 'Approve',
          handler: () => {
            console.log('Archive clicked');
            this.takeAction(USER,'APPROVED');
          }
        },{
          text: 'Suspend',
          handler: () => {
            console.log('Archive clicked');
            this.takeAction(USER,'SUSPENDED');
          }
        },{
          text: 'Detail',
          handler: () => {
            console.log('Archive clicked');
            this.go2UserDetailView(USER);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
