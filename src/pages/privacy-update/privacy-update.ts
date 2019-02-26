import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { LoadingService } from '../../services/loading.service';
import { LangService } from '../../services/lang.service';
import { PrivacyUpdateLang } from '../../languages/privacy-update.lang';
@IonicPage()
@Component({
  selector: 'page-privacy-update',
  templateUrl: 'privacy-update.html',
})
export class PrivacyUpdatePage {
// FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE : { EN: 'privacy', VI:'RIÊNG TƯ'},
    headerBasicInfo : { EN: 'BASIC INFORMATION', VI:'THÔNG TIN'},
    lbFName : { EN: 'First Name', VI:'Tên'},
    lbLName : { EN: 'Last Name', VI: 'Họ'},
    lbDoB : { EN: 'Date of Birth', VI: 'Ngày sinh'},
    lbGender : { EN: 'Gender', VI: 'Giới tính'},
    lbTel : { EN: 'Tel', VI: 'SĐT'},
    headerMAILADDRESS : { EN: 'MAILING ADDRESS', VI: 'ĐỊA CHỈ NHẬN THƯ'},
    headerRESADDRESS : { EN: 'RESIDENCE ADDRESS', VI: 'ĐỊA CHỈ HỘ KHẨU'},
    lbPROVINCE : { EN: 'PROVINCE', VI: 'TỈNH/THÀNH'},
    lbDISTRICT : { EN: 'DISTRICT', VI: 'QUẬN/HUYỆN'},
    lbWARD : { EN: 'WARD', VI: 'PHƯỜNG/XÃ'},
    lbAddress : { EN: 'Address', VI: 'Địa chỉ'},
    headerNON_AMPUTEE : { EN: 'NON AMPUTEE', VI: 'Bệnh Nhân Khác'},
    lbYoDisability : { EN: 'Year of Disability', VI: 'Năm bị tật'},
    lbToDisability : { EN: 'Type of Disability', VI: 'Loại Tật'},
    lbDisabledParts : { EN: 'Disabled Parts', VI: 'Phần khuyết tật'},
    lbDisbaledReasons : { EN: 'Disabled Reasons', VI: 'Lý do bị tật'},
    lbReceivedSupportBefore : { EN: 'Received support before?', VI: 'Đã nhận được hỗ trợ'},
    lbWhatSupport : { EN: 'What support?', VI: 'Loại hỗ trợ'},
    lbYoReceivedSupport : { EN: 'Year of Received Support', VI: 'Năm nhận hỗ trợ'},
    lbYoLastSupport : { EN: 'Year of Last Support', VI: 'Năm nhận hỗ trợ lần cuối'},
    lbDisabledLastSponsors : { EN: 'Disabled Last Sponsors', VI: 'Nhà tài trợ'},
    headerAMPUTEE : { EN: 'AMPUTEE', VI: 'Cắt cụt'},
    lbAMPUTATIONDATE : { EN: 'AMPUTATION DATE', VI: 'Năm bị cắt cụt'},
    lbAMPUTATIONLEVELs : { EN: 'AMPUTATION LEVELs', VI: 'Mức độ bị cắt cụt'},
    lbAMPUTATIONCAUSE : { EN: 'AMPUTATION CAUSE', VI: 'Nguyên nhận'},
    lbHowManyAmputations : { EN: 'How many amputations', VI: 'Bao nhiêu lần bị cắt cụt'},
    lbLASTFITTINGDATE : { EN: 'LAST FITTING DATE', VI: 'Lần thử cuối ngày nào'},
    lbAMPUTATIONSPONSOR : { EN: 'AMPUTATION SPONSOR', VI: 'Nhà tài trợ'},
    headerOTHER : { EN: 'OTHER', VI: 'KHÁC'},
    lbCURRENTJOB : { EN: 'CURRENT JOB', VI: 'VIỆC HIỆN TẠI'},
    lbCreatedOn : { EN: 'Created on', VI: 'Ngày tạo'},
    btnCancel : { EN: 'Cancel', VI: 'HUỶ'},
    btnUpdate : { EN: 'Update', VI: 'CẬP NHẬT'},
  };
  pageId = 'PrivacyUpdatePage';

  PRIVACY: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private loadingService: LoadingService,
    private langService: LangService
  ) {
    this.PRIVACY = this.localService.PRIVACY_DEFAULT;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyUpdatePage');
    if (this.localService.BASIC_INFOS) {
      this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY;
    } else {
      this.crudService.getBasicData()
        .then(() => {
          this.PRIVACY = this.localService.BASIC_INFOS.PRIVACY;
        })
    }
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

  updateBasicData(DATA) {
    this.crudService.updateBasicData(DATA)
      .then(res => {
        console.log(res);
        this.loadingService.hideLoading();
        this.navCtrl.pop();
      })
      .catch(err => {
        console.log(err);
        this.loadingService.hideLoading();
      })
  }

  cancel() {
    this.navCtrl.pop();
  }
}
