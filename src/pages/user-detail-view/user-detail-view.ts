import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { LocalService } from '../../services/local.service';
import { LangService } from '../../services/lang.service';


@IonicPage()
@Component({
  selector: 'page-user-detail-view',
  templateUrl: 'user-detail-view.html',
})
export class UserDetailViewPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'User detail', VI: 'Nhân viên chi tiết' },
    txtName: { EN: 'Name', VI: 'Tên' },
    txtEmail: { EN: 'Email', VI: 'Email' },
    txtTel: { EN: 'Tel', VI: 'SĐT' },
    txtBirthday: { EN: 'Birthday', VI: 'Ngày sinh' },
    txtAddress: { EN: 'Address', VI: 'Địa chỉ' },
    txtRole: { EN: 'Role', VI: 'Quyền' },
    txtFromOrg: { EN: 'From Org', VI: 'Từ tổ chức' },
    txtState: { EN: 'State', VI: 'Phòng ban' },
    txtValidFrom: { EN: 'Valid From', VI: 'Có giá trị từ ' },
    txtValidTo: { EN: 'Valid To', VI: 'Có giá trị đến' },
    txtUpdate: { EN: 'Update', VI: 'Cập nhật' },
  };
  pageId = 'UserDetailViewPage';

  data: any;
  USER: iUser;
  STATES = []
  ROLES = [];
  MAX_DATE = '3000-01-01';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService,
    private localService: LocalService,
    private langService: LangService,
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
