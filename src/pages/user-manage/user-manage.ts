import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { iUser } from '../../interfaces/user.interface';
import { AppService } from '../../services/app.service';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-user-manage',
  templateUrl: 'user-manage.html',
})
export class UserManagePage {
  USERS: iUser[] = [];
  ROLES = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private appService: AppService,
    private authService: AuthService,
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
    this.crudService.getAllUsers()
      .then((res) => {
        res.forEach(doc => {
          let USER = <iUser>doc.data();
          this.USERS.push(USER);
        })
        console.log(this.USERS);
        this.USERS = this.USERS.filter(USER => USER.U_STATE !== 'DELETED');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  takeAction(USER: iUser, ACTION: string) {
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

  go2UserDetailView(USER: iUser) {
    this.navCtrl.push('UserDetailViewPage', { USER: USER })
  }

  updateUser(USER: iUser) {
    this.crudService.userUpdate(USER).then((res) => {
      console.log(res);
    })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteUser(USER: iUser) {
    this.crudService.userDelete(USER)
      .then((res) => {
        console.log(res);
        // this.authService.
      })
      .catch(err => {
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
            this.takeAction(USER, 'DELETED');
          }
        }, {
          text: 'Approve',
          handler: () => {
            console.log('Archive clicked');
            this.takeAction(USER, 'APPROVED');
          }
        }, {
          text: 'Suspend',
          handler: () => {
            console.log('Archive clicked');
            this.takeAction(USER, 'SUSPENDED');
          }
        }, {
          text: 'Detail',
          handler: () => {
            console.log('Archive clicked');
            this.go2UserDetailView(USER);
          }
        }, {
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
