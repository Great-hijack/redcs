import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/user.interface';
import { LocalService } from '../../services/local.service';
import { CrudService } from '../../services/crud.service';
import { AppService } from '../../services/app.service';
import { LangService } from '../../services/lang.service';


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
    C1: { VI: 'Chân tháo khớp háng', EN: 'Hip disarticulaton', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C2: { VI: 'Chân tháo khớp háng, khớp gối cải tiến', EN: 'Hip disarticulaton with improved knee', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C3: { VI: 'Chân trên gối trung bình', EN: 'Trans-femoral', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C4: { VI: 'Chân trên gối trung bình, khớp gối cải tiến', EN: 'Trans-femoral with improved knee', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C5: { VI: 'Chân trên gối Socket mềm', EN: 'Trans-femoral, Soft Socket', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C6: { VI: 'Chân trên gối mỏm cụt dài', EN: 'Trans-femoral, Long stump', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C7: { VI: 'Chân trên gối khớp ngoài', EN: 'Trans-formal + External articulation', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C8: { VI: 'Chân tháo khớp gối', EN: 'Knee disarticulation', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C9: { VI: 'Chân dưới gối ngắn + Bao da đùi', EN: 'Trans-tibal + thigh corset', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C10: { VI: 'Chân dưới gối ngắn + Bao da đùi + Socket mềm', EN: 'Trans-tibal + thigh corset - Soft Socket', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C11: { VI: 'Chân dưới gối nhựa PP', EN: 'Trans-tibial', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C12: { VI: 'Chân dưới gối Socket mềm PP', EN: 'Trans-tibial, Soft Socket', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C13: { VI: 'Chân dưới gối PTS, KMB PP', EN: 'Trans-tibial, PTS, KBM', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C14: { VI: 'Chân tháo khớp bàn', EN: 'Through ankle', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C15: { VI: 'Chân tháo khớp bàn, chịu gân xương bánh chè', EN: 'Through ankle, PTB', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C16: { VI: 'Chân tháo khớp bàn, chịu trực tiếp', EN: 'Through ankle, dirrect bearing', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C17: { VI: 'Tay trên khuỷu', EN: 'Trans-humerus', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    C18: { VI: 'Tay dưới khuỷu', EN: 'Trans-radius', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },

    N1: { VI: 'Nẹp nhựa bàn chân', EN: 'Foot orthosis (FO)', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N2: { VI: 'Máng nhựa cẳng chân', EN: 'Ankle Foot Orthosis (AFO) splint', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N3: { VI: 'Nẹp máng nhựa cẳng chân có KMC', EN: 'Ankle Foot Orthosis (AFO) with ankle joint', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N4: { VI: 'Máng nhựa đùi cẳng chân', EN: 'Knee Ankle Foot Orthosis (KAFO) splint', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N5: { VI: 'Nẹp máng nhựa đùi cẳng chân có KMC (đúc nguyên bộ)', EN: 'Knee Ankle Foot Orthosis (KAFO)  with articulate (pre-made)', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N6: { VI: 'Nẹp máng nhựa đùi cẳng chân có KMC (nẹp gia công)', EN: 'Knee Ankle Foot Orthosis (KAFO)  with articulate (manual made)', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N7: { VI: 'Nẹp máng nhựa đùi cẳng chân không có KMC (đúc nguyên bộ)', EN: 'Knee Ankle Foot Orthosis (KAFO)  with knee joint, rogid ankle (pre-made)', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N8: { VI: 'Nẹp máng nhựa đùi cẳng chân không có KMC (nẹp gia công)', EN: 'Knee Ankle Foot Orthosis (KAFO)  with knee joint, rogid ankle (manual made)', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N9: { VI: 'Nẹp máng đai hông nhựa (đúc nguyên bộ)', EN: 'HKAFO pre-made', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N10: { VI: 'Nẹp máng đai hông nhựa (nẹp gia công)', EN: 'HKAFO manual made', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N11: { VI: 'Nẹp nhựa cẳng chân ( có KMC kim loại)', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N12: { VI: 'Nệp nhựa chống duỗi gối (có KMC kim loại)', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N13: { VI: 'Nẹp cẳng chân nhôm (A-KAFO)', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N14: { VI: 'Nẹp nhựa đùi KAFO', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N15: { VI: 'Nẹp đùi nhôm (A-KAFO)', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N16: { VI: 'Nẹp nhựa hông HKAFO', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N17: { VI: 'Nẹp hông nhôm (A-HAKFO)', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N18: { VI: 'Áo chỉnh hình PP đến ngực', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N19: { VI: 'Giày chỉnh hình', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N20: { VI: 'Dép sandall', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N21: { VI: 'Nẹp hông nhôm có thắt lưng', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N22: { VI: 'Nẹp KAFO không khớp', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N23: { VI: 'Nẹp KAFO có khớp', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N24: { VI: 'Nẹp nhựa AFO không khớp', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    N25: { VI: 'Nẹp nhưa AFO có khớp', EN: 'N/A', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },

    P1: { VI: 'Nạng nách', EN: 'Auxiliary crutches', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P2: { VI: 'Nạng khuỷu', EN: 'Elbow crutches', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P3: { VI: 'Giày vải gót bằng', EN: 'Shoes, canvas, flat heel', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P4: { VI: 'Giày Bitis', EN: 'Bitis shoes', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P5: { VI: 'Vớ dưới gối', EN: 'Socks for BK', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P6: { VI: 'Băng bao trên gối', EN: 'Stockinet for AK', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P7: { VI: 'Đai dự trữ, dưới gối, ni-lông', EN: 'Spare cuff, trans-tibial, nylon', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P8: { VI: 'Bàn cao su dự trữ', EN: 'Spare rubber foot', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P9: { VI: 'Bàn lao động dự trữ', EN: 'Spare rocker', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P10: { VI: 'Dây đeo chân trên gối', EN: 'Strap for AK', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P11: { VI: 'Bộ vật dụng vệ sinh cá nhân', EN: 'Transportation subsidies', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P12: { VI: 'Phụ cấp tàu xe', EN: 'Transportation subsidies', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },
    P13: { VI: 'Phụ cấp tiền ăn', EN: 'Food subsidies', UVI: '', UEN: '', HCM: 0, DNG: 0, QNH: 0, CTO: 0 },


  }

  PriceObj = {
    HCM: {
      C1: 7059000, C2: 0, C3: 526000, C4: 0, C5: 0, C6: 5141000, C7: 6015000, C8: 5141000, C9: 3765000, C10: 0,
      C11: 2946000, C12: 0, C13: 0, C14: 2456000, C15: 0, C16: 0, C17: 0, C18: 0,
      N1: 0, N2: 0, N3: 0, N4: 0, N5: 0, N6: 0, N7: 0, N8: 0, N9: 0, N10: 0, N11: 0, N12: 0, N13: 0, N14: 0, N15: 0,
      N16: 0, N17: 2521000, N18: 2275000, N19: 1566000, N20: 0, N21: 2613000, N22: 2606000, N23: 3341000, N24: 1881000, N25: 2632000,
      P1: 0, P2: 487000, P3: 87000, P4: 0, P5: 0, P6: 0, P7: 0, P8: 248000, P9: 158000, P10: 0, P11: 0, P12: 0, P13: 50000,
    },
    QNH: {
      C1: 5483000, C2: 0, C3: 4047000, C4: 0, C5: 0, C6: 4713000, C7: 4613000, C8: 4303000, C9: 3946000, C10: 0,
      C11: 2801000, C12: 3055000, C13: 0, C14: 2096000, C15: 0, C16: 0, C17: 0, C18: 0,
      N1: 0, N2: 0, N3: 0, N4: 0, N5: 0, N6: 0, N7: 0, N8: 0, N9: 0, N10: 0, N11: 0, N12: 0, N13: 0, N14: 0, N15: 0,
      N16: 0, N17: 0, N18: 0, N19: 0, N20: 0, N21: 0, N22: 0, N23: 0, N24: 0, N25: 0,
      P1: 0, P2: 110000, P3: 45000, P4: 0, P5: 13000, P6: 135000, P7: 22244, P8: 285000, P9: 20000, P10: 81120, P11: 23500, P12: 0, P13: 50000,
    },
    CTO: {
      C1: 4765000, C2: 0, C3: 3546000, C4: 0, C5: 35740000, C6: 4391000, C7: 4321000, C8: 4168000, C9: 3404000, C10: 3663000,
      C11: 2155000, C12: 2432000, C13: 2494000, C14: 0, C15: 2161000, C16: 2237000, C17: 2618000, C18: 1752000,
      N1: 771000, N2: 0, N3: 0, N4: 0, N5: 0, N6: 0, N7: 0, N8: 0, N9: 0, N10: 0, N11: 1635000, N12: 1818000, N13: 1907000, N14: 2803000, N15: 2330000,
      N16: 3412000, N17: 2689000, N18: 2457000, N19: 1465000, N20: 998000, N21: 0, N22: 0, N23: 0, N24: 0, N25: 0,
      P1: 187000, P2: 161200, P3: 82000, P4: 200000, P5: 6000, P6: 150500, P7: 23483, P8: 259000, P9: 0, P10: 0, P11: 23500, P12: 0, P13: 50000,
    },
    DNG: {
      C1: 5885000, C2: 6312000, C3: 3802000, C4: 4167000, C5: 0, C6: 0, C7: 4650000, C8: 4399000, C9: 3541000, C10: 3912000,
      C11: 2378000, C12: 2734000, C13: 0, C14: 2262000, C15: 0, C16: 0, C17: 3386000, C18: 1968000,
      N1: 972000, N2: 1447000, N3: 2885000, N4: 1854000, N5: 4739000, N6: 4296000, N7: 3192000, N8: 2750000, N9: 5539000, N10: 4874000, N11: 0, N12: 0, N13: 0, N14: 0, N15: 0,
      N16: 0, N17: 0, N18: 0, N19: 0, N20: 0, N21: 0, N22: 0, N23: 0, N24: 0, N25: 0,
      P1: 0, P2: 363000, P3: 35000, P4: 0, P5: 14000, P6: 150000, P7: 40000, P8: 376000, P9: 163000, P10: 0, P11: 23500, P12: 0, P13: 50000,
    }
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
      this.ITEMS = this.convertObj2Array(this.ItemOBJ);
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

  convertObj2Array(OBJ: Object) {
    let KEYS = Object.keys(OBJ);
    let ARR = [];
    KEYS.forEach(KEY => {
      let ITEM = OBJ[KEY];
      ITEM['KEY'] = KEY;
      ARR.push(ITEM);
    })
    return ARR;
  }

  convertObj2ArrayForPrice(OBJ: Object) {
    let KEYS = Object.keys(OBJ);
    let ARR = [];
    KEYS.forEach(KEY => {
      ARR.push({ PRICE: OBJ[KEY], KEY: KEY })
    })

    
  }

  convertArr2Obj(Arr: iItem[]){
    let OBJ = [];
    Arr.forEach(item=>{
      OBJ[item.KEY] = item;
    })
    console.log(OBJ);
    return OBJ;
  }

  selectItem(item: iItem) {
    this.selectedItem = item;
  }

  doUpdate() {
    console.log(this.ITEMS);
    let DATA = this.localService.BASIC_INFOS;
    DATA['PRICES'] = this.convertArr2Obj(this.ITEMS);
    console.log(DATA);
    this.crudService.updateBasicData(DATA);
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

