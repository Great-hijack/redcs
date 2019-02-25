import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPatient } from '../../interfaces/patient.interface';
import { iUser } from '../../interfaces/user.interface';
import { CrudService } from '../../services/crud.service';
import { LangService } from '../../services/lang.service';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-case-milestones',
  templateUrl: 'case-milestones.html',
})
export class CaseMilestonesPage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Milestones', VI: 'Giai đoạn quan trọng' },
    txtUpdate: { EN: 'Update', VI: 'Cập nhật' },
  };
  pageId = 'CaseMilestonesPage';

  MSDATA1: any[] = [
    { MSTEXT: "Suggested date by SP", MSID: '0', MSDATE: '' },
    { MSTEXT: "Patient admitted(date)", MSID: '1', MSDATE: '' },
    { MSTEXT: "Pre - casting treatment from", MSID: '2', MSDATE: '' },
    { MSTEXT: "Pre - casting treatment to", MSID: '3', MSDATE: '' },
    { MSTEXT: "Casting(date)", MSID: '4', MSDATE: '' },
    { MSTEXT: "Manufacturing from", MSID: '5', MSDATE: '' },
    { MSTEXT: "Manufacturing to", MSID: '6', MSDATE: '' },
    { MSTEXT: "Fitting(date)", MSID: '7', MSDATE: '' },
    { MSTEXT: "Training with device from", MSID: '8', MSDATE: '' },
    { MSTEXT: "Training with device to", MSID: '9', MSDATE: '' },
    { MSTEXT: "Finishing to", MSID: '10', MSDATE: '' },
    { MSTEXT: "Finishing from", MSID: '11', MSDATE: '' },
    { MSTEXT: "Delivery and Check out(date)", MSID: '12', MSDATE: '2018-08-20' },
  ]

  MSDATA: any[] = [
    { MSTEXT: {EN:"Suggested date by SP", VI:"Ngày giới thiệu NCC"}, MSID: '0', MSDATE: '' },
    { MSTEXT: {EN:"Patient admitted(date)", VI:"Bệnh nhân nhập viện (ngày)"}, MSID: '1', MSDATE: '' },
    { MSTEXT: {EN:"Pre - casting treatment from", VI:"Xử lý trước khi điều trị từ"}, MSID: '2', MSDATE: '' },
    { MSTEXT: {EN:"Pre - casting treatment to", VI:"Xử lý trước khi điều trị đến"}, MSID: '3', MSDATE: '' },
    { MSTEXT: {EN:"Casting(date)", VI:"Đúc khuôn (ngày)"}, MSID: '4', MSDATE: '' },
    { MSTEXT: {EN:"Manufacturing from", VI:"Sản xuất từ"}, MSID: '5', MSDATE: '' },
    { MSTEXT: {EN:"Manufacturing to", VI:"Sản xuất đến"}, MSID: '6', MSDATE: '' },
    { MSTEXT: {EN:"Fitting(date)", VI:"Lắp(ngày)"}, MSID: '7', MSDATE: '' },
    { MSTEXT: {EN:"Training with device from", VI:"Đào tạo với thiết bị từ"}, MSID: '8', MSDATE: '' },
    { MSTEXT: {EN:"Training with device to", VI:"Đào tạo với thiết bị đến"}, MSID: '9', MSDATE: '' },
    { MSTEXT: {EN:"Finishing to", VI:"Hoàn thành đến"}, MSID: '10', MSDATE: '' },
    { MSTEXT: {EN:"Finishing from", VI:"Hoàn thành từ"}, MSID: '11', MSDATE: '' },
    { MSTEXT: {EN:"Delivery and Check out(date)", VI:"Giao hàng và trả phòng (ngày)"}, MSID: '12', MSDATE: '2018-08-20' },
  ]
  data;
  PATIENT: iPatient;
  USER: iUser;
  MILESTONES: string[] = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private crudService: CrudService,
    private langService: LangService,
    private localService: LocalService
  ) {
    this.data = this.navParams.data;
    this.PATIENT = this.data.PATIENT;
    this.USER = this.data.USER;
    
    if (typeof (this.USER) === 'undefined' || typeof (this.PATIENT) === 'undefined') {
      console.log('setRoot')
      this.navCtrl.setRoot('HomePage').catch(err => console.log()).then(() => console.log('setOK'))

    }else{
      this.MILESTONES = this.PATIENT.PAT_MILESTONE;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseMilestonesPage');
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
    console.log('convert Array');
    console.log(LANGUAGES);
    LANGUAGES.forEach(element => {
      
    });(L => {
      OBJ[L.KEY] = L
    })
    console.log(OBJ);
    return OBJ;
  }
  updateMilestone(){
    console.log(this.MILESTONES);
    // let MS = this.MILESTONES.map(MS=> MS.MSDATE);
    this.PATIENT.PAT_MILESTONE = this.MILESTONES;
    console.log(this.PATIENT);
    this.crudService.patientUpdate(this.PATIENT)
    .then((res: any)=>{
      console.log(res);
      this.navCtrl.pop();
    })
    .catch(err=> console.log(err))
  }

  

}
