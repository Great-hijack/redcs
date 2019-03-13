import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';
import { C } from '@angular/core/src/render3';


@IonicPage()
@Component({
  selector: 'page-price-update',
  templateUrl: 'price-update.html',
})
export class PriceUpdatePage {
  // FOR LANGUAGES UPDATE
  // 1. Set initialize EN
  LANG = 'EN';
  // 2. set initialized LANGUAGES
  LANGUAGES = {
    TITLE: { EN: 'Update Prices', VI: 'Cập nhật giá' },
    txtServiceProvider: { EN: 'Service Provider', VI: 'Nhà cung cấp' },
    txtProstheses: { EN: 'PROSTHESES', VI: 'Dự án' },
    txtAccessories: { EN: 'ACCESSORIES', VI: 'Phụ kiện' },
    txtSubsidies: { EN: 'SUBSIDIES', VI: 'Trợ cấp' },
    btnUpdate: { EN: 'Update', VI: 'Cập nhật' },
  };
  pageId = 'PriceUpdatePage';

  data: any;
  USER: iUser;
  BASIC_INFOS;
  ServiceProviders = [];
  DEFAULT_PRICES: any = {
    A1: '',
    A2: '',
    A3: '',
    A4: '',
    A5: '',
    A6: '',
    A7: '',
    B1: '',
    B2: '',
    B3: '',
    B4: '',
    B5: '',
    B6: '',
    B7: '',
    C1: '',
    C2: '',
    C3: '',
  }

  // LUAN HO TRO ANH NHAP 2 OBJECT lON NAY
  ItemOBJ = {
    C01: { TOTAL: 0, GROUP: 'C', VI: 'Chân tháo khớp háng', EN: 'Hip disarticulaton', UVI: '', UEN: '', HCM: 7059000, DNG: 5885000, QNH: 5483000, CTO: 4765000 },
    C02: { TOTAL: 0, GROUP: 'C', VI: 'Chân tháo khớp háng, khớp gối cải tiến', EN: 'Hip disarticulaton with improved knee', UVI: '', UEN: '', HCM: 0, DNG: 6312000, QNH: 0, CTO: 0 },
    C03: { TOTAL: 0, GROUP: 'C', VI: 'Chân trên gối trung bình', EN: 'Trans-femoral', UVI: '', UEN: '', HCM: 526000, DNG: 3802000, QNH: 4047000, CTO: 3546000 },
    C04: { TOTAL: 0, GROUP: 'C', VI: 'Chân trên gối trung bình, khớp gối cải tiến', EN: 'Trans-femoral with improved knee', UVI: '', UEN: '', HCM: 0, DNG: 4167000, QNH: 0, CTO: 0 },
    C05: { TOTAL: 0, GROUP: 'C', VI: 'Chân trên gối Socket mềm', EN: 'Trans-femoral, Soft Socket', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 35740000 },
    C06: { TOTAL: 0, GROUP: 'C', VI: 'Chân trên gối mỏm cụt dài', EN: 'Trans-femoral, Long stump', UVI: '', UEN: '', HCM: 5141000, DNG: 0, QNH: 4713000, CTO: 4391000 },
    C07: { TOTAL: 0, GROUP: 'C', VI: 'Chân trên gối khớp ngoài', EN: 'Trans-formal + External articulation', UVI: '', UEN: '', HCM: 6015000, DNG: 4650000, QNH: 4613000, CTO: 4321000 },
    C08: { TOTAL: 0, GROUP: 'C', VI: 'Chân tháo khớp gối', EN: 'Knee disarticulation', UVI: '', UEN: '', HCM: 5141000, DNG: 4399000, QNH: 4303000, CTO: 4168000 },
    C09: { TOTAL: 0, GROUP: 'C', VI: 'Chân dưới gối ngắn + Bao da đùi', EN: 'Trans-tibal + thigh corset', UVI: '', UEN: '', HCM: 3765000, DNG: 3541000, QNH: 3946000, CTO: 3404000 },
    C10: { TOTAL: 0, GROUP: 'C', VI: 'Chân dưới gối ngắn + Bao da đùi + Socket mềm', EN: 'Trans-tibal + thigh corset - Soft Socket', UVI: '', UEN: '', HCM: 0, DNG: 3912000, QNH: 0, CTO: 3663000 },
    C11: { TOTAL: 0, GROUP: 'C', VI: 'Chân dưới gối nhựa PP', EN: 'Trans-tibial', UVI: '', UEN: '', HCM: 0, DNG: 2378000, QNH: 2801000, CTO: 2155000 },
    C12: { TOTAL: 0, GROUP: 'C', VI: 'Chân dưới gối Socket mềm PP', EN: 'Trans-tibial, Soft Socket', UVI: '', UEN: '', HCM: 0, DNG: 2734000, QNH: 3055000, CTO: 2432000 },
    C13: { TOTAL: 0, GROUP: 'C', VI: 'Chân dưới gối PTS, KMB PP', EN: 'Trans-tibial, PTS, KBM', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 2494000 },
    C14: { TOTAL: 0, GROUP: 'C', VI: 'Chân tháo khớp bàn', EN: 'Through ankle', UVI: '', UEN: '', HCM: 2456000, DNG: 2262000, QNH: 2096000, CTO: 0 },
    C15: { TOTAL: 0, GROUP: 'C', VI: 'Chân tháo khớp bàn, chịu gân xương bánh chè', EN: 'Through ankle, PTB', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 2161000 },
    C16: { TOTAL: 0, GROUP: 'C', VI: 'Chân tháo khớp bàn, chịu trực tiếp', EN: 'Through ankle, dirrect bearing', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 2237000 },
    C17: { TOTAL: 0, GROUP: 'C', VI: 'Tay trên khuỷu', EN: 'Trans-humerus', UVI: '', UEN: '', HCM: 0, DNG: 3386000, QNH: 0, CTO: 2618000 },
    C18: { TOTAL: 0, GROUP: 'C', VI: 'Tay dưới khuỷu', EN: 'Trans-radius', UVI: '', UEN: '', HCM: 0, DNG: 1968000, QNH: 0, CTO: 1752000 },

    N01: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp nhựa bàn chân', EN: 'Foot orthosis (FO)', UVI: '', UEN: '', HCM: 0, DNG: 972000, QNH: 0, CTO: 771000 },
    N02: { TOTAL: 0, GROUP: 'N', VI: 'Máng nhựa cẳng chân', EN: 'Ankle Foot Orthosis (AFO) splint', UVI: '', UEN: '', HCM: 0, DNG: 1447000, QNH: 0, CTO: 0 },
    N03: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp máng nhựa cẳng chân có KMC', EN: 'Ankle Foot Orthosis (AFO) with ankle joint', UVI: '', UEN: '', HCM: 0, DNG: 2885000, QNH: 0, CTO: 0 },
    N04: { TOTAL: 0, GROUP: 'N', VI: 'Máng nhựa đùi cẳng chân', EN: 'Knee Ankle Foot Orthosis (KAFO) splint', UVI: '', UEN: '', HCM: 0, DNG: 1854000, QNH: 0, CTO: 0 },
    N05: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp máng nhựa đùi cẳng chân có KMC (đúc nguyên bộ)', EN: 'Knee Ankle Foot Orthosis (KAFO)  with articulate (pre-made)', UVI: '', UEN: '', HCM: 0, DNG: 4739000, QNH: 0, CTO: 0 },
    N06: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp máng nhựa đùi cẳng chân có KMC (nẹp gia công)', EN: 'Knee Ankle Foot Orthosis (KAFO)  with articulate (manual made)', UVI: '', UEN: '', HCM: 0, DNG: 4296000, QNH: 0, CTO: 0 },
    N07: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp máng nhựa đùi cẳng chân không có KMC (đúc nguyên bộ)', EN: 'Knee Ankle Foot Orthosis (KAFO)  with knee joint, rogid ankle (pre-made)', UVI: '', UEN: '', HCM: 0, DNG: 3192000, QNH: 0, CTO: 0 },
    N08: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp máng nhựa đùi cẳng chân không có KMC (nẹp gia công)', EN: 'Knee Ankle Foot Orthosis (KAFO)  with knee joint, rogid ankle (manual made)', UVI: '', UEN: '', HCM: 0, DNG: 2750000, QNH: 0, CTO: 0 },
    N09: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp máng đai hông nhựa (đúc nguyên bộ)', EN: 'HKAFO pre-made', UVI: '', UEN: '', HCM: 0, DNG: 5539000, QNH: 0, CTO: 0 },
    N10: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp máng đai hông nhựa (nẹp gia công)', EN: 'HKAFO manual made', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N11: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp nhựa cẳng chân ( có KMC kim loại)', EN: 'N/A', UVI: '', UEN: '', HCM: 2946000, DNG: 4874000, QNH: 0, CTO: 1635000 },
    N12: { TOTAL: 0, GROUP: 'N', VI: 'Nệp nhựa chống duỗi gối (có KMC kim loại)', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 1818000 },
    N13: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp cẳng chân nhôm (A-KAFO)', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 1907000 },
    N14: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp nhựa đùi KAFO', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 2803000 },
    N15: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp đùi nhôm (A-KAFO)', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 2330000 },
    N16: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp nhựa hông HKAFO', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 3412000 },
    N17: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp hông nhôm (A-HAKFO)', EN: 'N/A', UVI: '', UEN: '', HCM: 2521000, DNG: 0, QNH: 0, CTO: 2689000 },
    N18: { TOTAL: 0, GROUP: 'N', VI: 'Áo chỉnh hình PP đến ngực', EN: 'N/A', UVI: '', UEN: '', HCM: 2275000, DNG: 0, QNH: 0, CTO: 2457000 },
    N19: { TOTAL: 0, GROUP: 'N', VI: 'Giày chỉnh hình', EN: 'N/A', UVI: '', UEN: '', HCM: 1566000, DNG: 0, QNH: 0, CTO: 1465000 },
    N20: { TOTAL: 0, GROUP: 'N', VI: 'Dép sandall', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 998000 },
    N21: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp hông nhôm có thắt lưng', EN: 'N/A', UVI: '', UEN: '', HCM: 2613000, DNG: 0, QNH: 0, CTO: 0 },
    N22: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp KAFO không khớp', EN: 'N/A', UVI: '', UEN: '', HCM: 2606000, DNG: 0, QNH: 0, CTO: 0 },
    N23: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp KAFO có khớp', EN: 'N/A', UVI: '', UEN: '', HCM: 3341000, DNG: 0, QNH: 0, CTO: 0 },
    N24: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp nhựa AFO không khớp', EN: 'N/A', UVI: '', UEN: '', HCM: 1881000, DNG: 0, QNH: 0, CTO: 0 },
    N25: { TOTAL: 0, GROUP: 'N', VI: 'Nẹp nhưa AFO có khớp', EN: 'N/A', UVI: '', UEN: '', HCM: 2632000, DNG: 0, QNH: 0, CTO: 0 },

    P01: { TOTAL: 0, GROUP: 'P', VI: 'Nạng nách', EN: 'Auxiliary crutches', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 187000 },
    P02: { TOTAL: 0, GROUP: 'P', VI: 'Nạng khuỷu', EN: 'Elbow crutches', UVI: '', UEN: '', HCM: 487000, DNG: 363000, QNH: 110000, CTO: 161200 },
    P03: { TOTAL: 0, GROUP: 'P', VI: 'Giày vải gót bằng', EN: 'Shoes, canvas, flat heel', UVI: '', UEN: '', HCM: 87000, DNG: 35000, QNH: 45000, CTO: 82000 },
    P04: { TOTAL: 0, GROUP: 'P', VI: 'Giày Bitis', EN: 'Bitis shoes', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 200000 },
    P05: { TOTAL: 0, GROUP: 'P', VI: 'Vớ dưới gối', EN: 'Socks for BK', UVI: '', UEN: '', HCM: 0, DNG: 14000, QNH: 13000, CTO: 6000 },
    P06: { TOTAL: 0, GROUP: 'P', VI: 'Băng bao trên gối', EN: 'Stockinet for AK', UVI: '', UEN: '', HCM: 0, DNG: 150000, QNH: 135000, CTO: 150500 },
    P07: { TOTAL: 0, GROUP: 'P', VI: 'Đai dự trữ, dưới gối, ni-lông', EN: 'Spare cuff, trans-tibial, nylon', UVI: '', UEN: '', HCM: 0, DNG: 40000, QNH: 22244, CTO: 23483 },
    P08: { TOTAL: 0, GROUP: 'P', VI: 'Bàn cao su dự trữ', EN: 'Spare rubber foot', UVI: '', UEN: '', HCM: 248000, DNG: 376000, QNH: 285000, CTO: 259000 },
    P09: { TOTAL: 0, GROUP: 'P', VI: 'Bàn lao động dự trữ', EN: 'Spare rocker', UVI: '', UEN: '', HCM: 158000, DNG: 163000, QNH: 20000, CTO: 0 },
    P10: { TOTAL: 0, GROUP: 'P', VI: 'Dây đeo chân trên gối', EN: 'Strap for AK', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 81120, CTO: 0 },
    P11: { TOTAL: 0, GROUP: 'P', VI: 'Bộ vật dụng vệ sinh cá nhân', EN: 'Transportation subsidies', UVI: '', UEN: '', HCM: 0, DNG: 23500, QNH: 23500, CTO: 23500 },
    P12: { TOTAL: 0, GROUP: 'P', VI: 'Phụ cấp tàu xe', EN: 'Transportation subsidies', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P13: { TOTAL: 0, GROUP: 'P', VI: 'Phụ cấp tiền ăn', EN: 'Food subsidies', UVI: '', UEN: '', HCM: 50000, DNG: 50000, QNH: 50000, CTO: 50000 },
  }

  PRICES = [];
  ITEMS: iItem[] = [];
  selectedItem: iItem = null;
  ACCESSORIES = {}
  selected_SP: iSP = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private crudService: CrudService,
    private appService: AppService,
    private langService: LangService
  ) {
    this.data = this.navParams.data;
    this.USER = this.data.USER;
    this.BASIC_INFOS = this.localService.BASIC_INFOS;
    if (typeof (this.USER) === 'undefined') {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.ServiceProviders = this.localService.BASIC_INFOS.SERVICEPROVIDERS;
      console.log(this.ServiceProviders);
      this.getListNamesOfAccessories();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceUpdatePage');
    if (this.localService.BASIC_INFOS) {
      // 3. Get selected EN/VI
      this.LANG = this.langService.LANG;
      // 4. Get LANGUAGES from DB
      this.LANGUAGES = this.langService.getLanguagesObjectFromPageId(this.pageId);
      console.log(this.LANGUAGES);
      this.ITEMS = this.appService.convertObj2Array(this.ItemOBJ);
      // this.PRICES = this.convertObj2ArrayForPrice(this.PriceObj['HCM']);
      console.log(this.PRICES, this.ITEMS);
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }



  update() {
    console.log(this.PRICES);
    this.BASIC_INFOS['PRICES'][this.selected_SP.id] = this.PRICES;
    console.log(this.BASIC_INFOS);
    this.crudService.updateDocumentAtRefUrl('INFOS/BASIC', this.BASIC_INFOS)
      .then((res) => {
        this.PRICES = this.DEFAULT_PRICES;
        console.log(res);
        this.appService.toastMsg('Database updated successfully', 3000);
        // this.navCtrl.pop();
        this.selected_SP = null;
      })
      .catch(err => console.log(err));
  }

  selectProvider(SP: iSP) {
    this.PRICES = this.DEFAULT_PRICES;
    this.selected_SP = SP;
    console.log(this.selected_SP);
    this.PRICES = this.BASIC_INFOS.PRICES[this.selected_SP.id];
  }

  getListNamesOfAccessories() {
    let ARRAY: any[] = this.BASIC_INFOS.ACCESSORIES;
    let ACCESSORIES = {};
    ARRAY.forEach(item => {
      ACCESSORIES[item.KEY] = item;
    })
    console.log(ACCESSORIES);
    this.ACCESSORIES = ACCESSORIES;
  }

  selectItem(item: iItem) {
    this.selectedItem = item;
  }

  doUpdate() {
    console.log(this.ITEMS);
    // let DATA = this.localService.BASIC_INFOS;
    let PRICES = this.appService.convertArr2Obj(this.ITEMS);
    // console.log(DATA);
    console.log(PRICES);
    // this.crudService.updateBasicData(DATA).catch(err=> console.log(err)).then((res)=> console.log(res))
    this.crudService.updateDocumentAtRefUrl('INFOS/BASIC', { PRICES: PRICES })
      .catch(err => console.log(err)).then((res) => console.log(res))
  }

}



export interface iSP {
  Center: string,
  id: string,
  lastNumber: string
}

export interface iItem {
  KEY: string,
  VI: string,
  EN: string,
  UVI: string,
  UEN: string,
  HCM: number,
  CTO: number,
  DNG: number,
  QNH: number,
}

