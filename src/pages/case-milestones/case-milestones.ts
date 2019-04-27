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

  MSDATA: any[] = [
    { MSTEXT: { EN: "Date set by Service Providers", VI: "Ngày trung tâm hẹn" }, MSID: '0', MSDATE: '' },
    { MSTEXT: { EN: "Patient admitted(date)", VI: "Ngày bệnh nhân đến" }, MSID: '1', MSDATE: '' },
    { MSTEXT: { EN: "Pre - casting treatment from", VI: "Điều trị trước khi bó bột từ ngày" }, MSID: '2', MSDATE: '' },
    { MSTEXT: { EN: "Pre - casting treatment to", VI: "Điều trị trước khi bó bột đến ngày" }, MSID: '3', MSDATE: '' },
    { MSTEXT: { EN: "Casting(date)", VI: "Ngày bó bột" }, MSID: '4', MSDATE: '' },
    { MSTEXT: { EN: "Manufacturing from", VI: "Sản xuất từ ngày" }, MSID: '5', MSDATE: '' },
    { MSTEXT: { EN: "Manufacturing to", VI: "Sản xuất đến ngày" }, MSID: '6', MSDATE: '' },
    { MSTEXT: { EN: "Fitting(date)", VI: "Ngày lắp chân" }, MSID: '7', MSDATE: '' },
    { MSTEXT: { EN: "Training with device from", VI: "Tập thử dụng cụ từ ngày" }, MSID: '8', MSDATE: '' },
    { MSTEXT: { EN: "Training with device to", VI: "Tập thử dụng cụ đến ngày" }, MSID: '9', MSDATE: '' },
    { MSTEXT: { EN: "Finishing to", VI: "Hoàn tất từ ngày từ ngày" }, MSID: '10', MSDATE: '' },
    { MSTEXT: { EN: "Finishing from", VI: "Hoàn tất từ ngày đến ngày" }, MSID: '11', MSDATE: '' },
    { MSTEXT: { EN: "Delivery and Check out(date)", VI: "Giao nhận và xuất chân" }, MSID: '12', MSDATE: '' },
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

    } else {
      this.MILESTONES = this.PATIENT.PAT_MILESTONE;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseMilestonesPage');
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  updateMilestone() {
    console.log(this.MILESTONES);
    // let MS = this.MILESTONES.map(MS=> MS.MSDATE);
    this.PATIENT.PAT_MILESTONE = this.MILESTONES;
    console.log(this.PATIENT);
    if (this.PATIENT.PAT_MILESTONE.length > 0) {
      this.PATIENT.PAT_STATE = 'UNDER TREATMENT';
    }
    this.crudService.patientUpdate(this.PATIENT)
      .then((res: any) => {
        console.log(res);
        this.navCtrl.pop();
      })
      .catch(err => console.log(err))
  }



}
