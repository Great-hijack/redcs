import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { iUser } from '../../interfaces/user.interface';
import { AppService } from '../../services/app.service';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { LangService } from '../../services/lang.service';

@IonicPage()
@Component({
  selector: 'page-user-manage',
  templateUrl: 'user-manage.html',
})
export class UserManagePage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Users Manager', VI: 'Quản lý nhân viên' },
    txtApprove: { EN: 'Approve', VI: 'Phê duyệt' },
    txtSuspend: { EN: 'Suspend', VI: 'Đình chỉ' },
    txtDelete: { EN: 'Delete', VI: 'Xoá' },
    txtDetail: { EN: 'Detail', VI: 'Chi tiết' },
    txtActHead: { EN: 'Modify authority', VI: 'Chỉnh quyền' },
  };
  pageId = 'UserManagePage';

  USERS: iUser[] = [];
  ROLES = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private appService: AppService,
    private authService: AuthService,
    private localService: LocalService,
    private actionSheetCtrl: ActionSheetController,
    private langService: LangService,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserManagePage');
    this.getAllUsers();
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      //this.LANGUAGES = this.convertArray2Object();
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
      title: this.LANGUAGES.txtActHead[this.LANG],
      buttons: [
        {
          text: this.LANGUAGES.txtDelete[this.LANG],
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takeAction(USER, 'DELETED');
          }
        }, {
          text: this.LANGUAGES.txtApprove[this.LANG],
          handler: () => {
            console.log('Archive clicked');
            this.takeAction(USER, 'APPROVED');
          }
        }, {
          text: this.LANGUAGES.txtSuspend[this.LANG],
          handler: () => {
            console.log('Archive clicked');
            this.takeAction(USER, 'SUSPENDED');
          }
        }, {
          text: this.LANGUAGES.txtDetail[this.LANG],
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
