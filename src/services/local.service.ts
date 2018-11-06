import { Injectable } from '@angular/core';
// import { AngularFireService } from './af.service';
// import { DbService } from './db.service';
// import { AppService } from './app.service';

// import { iShop } from '../interfaces/shop.interface';
import { iPosition } from '../interfaces/position.interface';
import { iSetting } from '../interfaces/setting.interface';
// import { iItem } from '../interfaces/item.interface';
// import { iOrder } from '../interfaces/order.interface';
import { iUser } from '../interfaces/user.interface';
import { iBooking } from '../interfaces/booking.interface';
import { iRating } from '../interfaces/rating.interface';
import { iPatient } from '../interfaces/patient.interface';
import { iUsr } from '../interfaces/usr.interface';
import { iPrivacy } from '../interfaces/privacy.interface';
import { iQuestForm } from '../interfaces/questform.interface';
// import { iOrder } from '../interfaces/order.interface';
// import { iProfile } from '../interfaces/profile.interface';
// import { iImage } from '../interfaces/image.interface';


@Injectable()

export class LocalService {
    // FOR PATIENT
    PATIENT_DEFAULT: iPatient = {
        PAT_FNAME: '',
        PAT_LNAME: '',
        PAT_YoB: '',
        PAT_SEX: '',
        PAT_RES_ID: '',
        PAT_CONTACT_ADDRESS: '',
        PAT_CONTACT_WARD: '',
        PAT_CONTACT_DIST: '',
        PAT_CONTACT_CITY: '',
        PAT_CONTACT_LOC: { CCODE: '', CITY: '', DCODE: '', DIST: '', WARD: '', WCODE: '' },
        PAT_HOME_ADDRESS: '',
        PAT_HOME_WARD: '',
        PAT_HOME_DIST: '',
        PAT_HOME_CITY: '',
        PAT_HOME_LOC: { CCODE: '', CITY: '', DCODE: '', DIST: '', WARD: '', WCODE: '' },
        PAT_TEL: '',
        PAT_DISABLED_YEAR: '',
        PAT_DISABLED_TYPE: '',
        PAT_DISABLED_PARTS: [],
        PAT_DISABLED_REASONS: [],
        PAT_DISABLED_SUPPORT_RECEIVED: false,
        PAT_DISABLED_SUPPORT_TYPE: '',
        PAT_DISABLED_SUPPORT_RECEIVED_YEAR: '',
        PAT_DISABLED_LAST_SUPPORT_YEAR: '',
        PAT_DISABLED_LAST_SUPPORT_SPONSORS: [],
        PAT_AMPUTATION_YEAR: '',
        PAT_AMPUTATION_PARTS: [],
        PAT_AMPUTATION_REASONS: [],
        PAT_AMPUTATION_LEGS: '',
        PAT_AMPUTATION_LAST_LEG_YEAR: '',
        PAT_AMPUTATION_LAST_SPONSORS: [],
        PAT_JOB: '',
        PAT_DATE_CREATE: '',
        PAT_ID: '',
        PAT_MAIL: '',
        // PAT_NAME: '',
        PAT_AMP: '',
        PAT_CONVOQ: '',
        PAT_CONVOQ_DATE: '',
        PAT_REMARK: '',
        PAT_KIND: 'NONE',
        PAT_REFERRAL_ID: '',
        PAT_REFLEAD_ID: '',
        PAT_REFORG: '',
        PAT_MOVEABILITY: 'MA1',
        PAT_MVA_ID: '',
        PAT_SVP: '',
        PAT_SVCPRO_ID: '',
        PAT_STATE: 'SUBMITTED',
        PAT_isSELECTED: false,
        PAT_INV_FROM: '',
        PAT_INV_TO: '',
        PAT_OTHER: {},
        PAT_MILESTONE: ['', '', '', '', '', '', '', '', '', '', '', ''],
        PAT_IMAGES: [],
        PAT_DOCS: [],
        PAT_COST: [],
        PAT_NOTES: [],
        PAT_QUESTIONS: []
    }

    PRIVACY_DEFAULT: iPrivacy = {
        PRI_FNAME: true,
        PRI_LNAME: true,
        PRI_YoB: true,
        PRI_SEX: true,
        PRI_RES_ID: true,
        PRI_CONTACT_ADDRESS: true,
        PRI_CONTACT_WARD: true,
        PRI_CONTACT_DIST: true,
        PRI_CONTACT_CITY: true,
        PRI_HOME_ADDRESS: true,
        PRI_HOME_WARD: true,
        PRI_HOME_DIST: true,
        PRI_HOME_CITY: true,
        PRI_TEL: true,
        PRI_DISABLED_YEAR: true,
        PRI_DISABLED_TYPE: true,
        PRI_DISABLED_PARTS: true,
        PRI_DISABLED_REASONS: true,
        PRI_DISABLED_SUPPORT_RECEIVED: true,
        PRI_DISABLED_SUPPORT_TYPE: true,
        PRI_DISABLED_SUPPORT_RECEIVED_YEAR: true,
        PRI_DISABLED_LAST_SUPPORT_YEAR: true,
        PRI_DISABLED_LAST_SUPPORT_SPONSORS: true,
        PRI_AMPUTATION_YEAR: true,
        PRI_AMPUTATION_PARTS: true,
        PRI_AMPUTATION_REASONS: true,
        PRI_AMPUTATION_LEGS: true,
        PRI_AMPUTATION_LAST_LEG_YEAR: true,
        PRI_AMPUTATION_LAST_SPONSORS: true,
        PRI_JOB: true,
        PRI_DATE_CREATE: true,
    }

    // USR: iUsr = {
    //     U_ADDRESS: '',
    //     U_AVATAR: '',
    //     U_BIRTHDAY: '',
    //     U_EMAIL: '',
    //     U_ID: '',
    //     U_NAME: '',
    //     U_TEL: '',
    //     U_TIMESTAMP: 0,
    //     U_ORG: '',
    //     U_ROLE: '',
    //     U_STATE: 'REQUEST',
    //     U_VALID_FROM: '',
    //     U_VALID_TO: ''
    // };

    USR = null;

    USR_DEFAULT: iUsr = {
        U_ADDRESS: '',
        U_AVATAR: '',
        U_BIRTHDAY: '',
        U_EMAIL: '',
        U_ID: '',
        U_NAME: '',
        U_TEL: '',
        U_TIMESTAMP: 0,
        U_ORG: '',
        U_ROLE: '',
        U_STATE: 'REQUEST',
        U_VALID_FROM: '',
        U_VALID_TO: ''
    };

    BASIC_INFOS = null;
    BASIC_INFOS_GOT: boolean = false;

    QUESTION_FORM_DEFAULT: iQuestForm = {
        ID: '',
        DATE: '',
        INFO: {
            COUNTRY: '',
            CENTERNAME: '', 
            FILENUMBER: '', 
            GENDER: '', 
            EVAL_PLACE: '', 
            NAME_BENEFICIARY: '',
            OCCUPATION: '',
            LIVING_ENV: '',
            EVAL_DATE: '',
            YoB: '',
            YoAmDis: '',
            CauseOfAmDis: ''
        },
        DEVICE:{
            Q1: [],
            Q2: [],
            Q2A: '',
            Q2B: '',
            Q2C: '',
            Q3: [],
            Q3A: '',
            Q3B: '',
            Q3C: '',
            Q4: false,
        },
        ACCESSSABILITY:{
            Q5: [],
            Q6: false,
            Q6A: '',
            Q7: '',
            Q8: '',
            Q9: '',
            Q10: '',
            Q11: '',
            Q12: []
        }, 
        QUALITY: {
            Q13: '',
            Q14: '',
            Q15: '',
            Q16: '',
            Q17: '',
            Q18: '',
            Q19: '',
            Q20: '',
            Q20A: '', 
        },
        IMPACT: {
            Q21: [],
            Q22: '',
            Q23: '',
            Q23A: '',
            Q24: '',
            Q25: '',
            Q26: '',
            Q27: '',
            Q28: '',
            Q29: '',
    
        },
        ENDING: {
            COMMENT: '',
            INTERPRETER_NAME: '',
            INTERPRETER_W4C: false,
            EVALUATOR_NAME: '',
            EVALUATOR_W4C: false,
        }
    }



    // For user
    USER_CURRENT_LOCATION: iPosition = null;
    // USER_AVATAR: string = null;
    USER_ID: string = null;
    USER: iUser = null;
    USER_FB = null;
    USER_DEFAULT: iUser = {
        U_ADDRESS: null,
        U_AVATAR: null,
        U_BIRTHDAY: null,
        U_EMAIL: null,
        U_ID: null,
        U_NAME: null,
        U_LOCATION: {
            L_COUNTRY: 'COUNTRY',
            L_CITY: 'CITY',
            L_FLAG_IMAGE_URL: null,
            L_ID: null,
            L_ID_STR: ''
        },
        U_POSITION: null,
        U_TEL: null,
        U_TIMESTAMP: 0,
        U_COST: 0,
        U_BOOKED_DAYS: [],
        U_BOOKED_TIME: {},
        U_EXP_YEARS: null,
        U_ID_CARD_URL: null,
        U_CERT_URL: null,
        U_GUIDE_STAT: null,
        U_GUIDE_LANG: [{ L_NAME: 'English', L_LEVEL: 'Advance', L_FLAG: '' }],
        U_GUIDE_SKILLS: []
    }
    isUserInfoGot: boolean = false;
    isAdminOfAppChecked: boolean = false;
    isAdminOfApp: boolean = false;

    doUserLogout() {
        this.isUserInfoGot = false;
        this.isAdminOfAppChecked = false;
        this.isAdminOfApp = false;
        this.USER = null;
        this.USER_ID = null;
        this.USER_CURRENT_LOCATION = null;
        this.USER_FB = null;
    }
    // // For SHOP
    // SHOPs_LOCATION: any[] = [];
    // SHOPs_ID_NEARBY: any[] = [];
    // SHOP_LOADED: boolean = false;
    // SHOPs_NEARBY_DETAIL: any[] = []
    // SHOP_DEFAULT: iShop = {
    //     SHOP_ID: null,
    //     SHOP_OWNER: null,
    //     SHOP_DATE_CREATE: null,
    //     SHOP_LOCATION: null,
    //     SHOP_NAME: null,
    //     SHOP_KIND: null,
    //     SHOP_ADDRESS: null,
    //     SHOP_IMAGES: [],
    //     SHOP_ITEMS: null,
    //     SHOP_PHONE: null,
    //     SHOP_isCREDIT: false,
    //     SHOP_isMOTO_PARK_FREE: false,
    //     SHOP_isCAR_PARK_FREE: false,
    //     SHOP_isMEMBERSHIP: false,
    //     SHOP_isVISIBLE: false,
    //     SHOP_CURRENCY: null,
    //     SHOP_TABLES: ['TB0', 'TB1', 'TB2', 'TB3', 'TB4', 'TB5', 'TB6', 'TB7', 'TB8', 'TB9'],
    //     SHOP_CATEGORIES: ['Drinks', 'Foods'],
    //     SHOP_OTHER: null,
    //     SHOP_DISTANCE: {
    //         distance: 0,
    //         disStr: '0 m'
    //     },
    //     SHOP_VERIFIED_STAT: 'UN_VERIFIED',
    //     SHOP_TIMESTAMP: 0
    // }

    // SHOP: iShop = {
    //     SHOP_ID: null,
    //     SHOP_OWNER: null,
    //     SHOP_DATE_CREATE: null,
    //     SHOP_LOCATION: null,
    //     SHOP_NAME: null,
    //     SHOP_KIND: null,
    //     SHOP_ADDRESS: null,
    //     SHOP_IMAGES: [],
    //     SHOP_ITEMS: null,
    //     SHOP_PHONE: null,
    //     SHOP_isCREDIT: false,
    //     SHOP_isMOTO_PARK_FREE: false,
    //     SHOP_isCAR_PARK_FREE: false,
    //     SHOP_isMEMBERSHIP: false,
    //     SHOP_isVISIBLE: true,
    //     SHOP_CURRENCY: null,
    //     SHOP_TABLES: ['TB0', 'TB1', 'TB2', 'TB3', 'TB4', 'TB5', 'TB6', 'TB7', 'TB8', 'TB9'],
    //     SHOP_CATEGORIES: ['Drinks', 'Foods'],
    //     SHOP_OTHER: null,
    //     SHOP_DISTANCE: {
    //         distance: 0,
    //         disStr: '0 m'
    //     },
    //     SHOP_VERIFIED_STAT: null,
    //     SHOP_TIMESTAMP: 0
    // }

    // ITEM_DEFAULT: iItem = {
    //     ITEM_ID: null,
    //     ITEM_NAME_LOCAL: null,
    //     ITEM_NAME_EN: null,
    //     ITEM_IMAGES: [],
    //     ITEM_PRICE: null,
    //     ITEM_SIZE: null,
    //     ITEM_DATE_CREATE: null,
    //     ITEM_SHOP_ID: null,
    //     ITEM_ON_SALE: false,
    //     ITEM_NEW: true,
    //     ITEM_VISIBLE: true,
    //     ITEM_IMG_SHARED: false,
    //     ITEM_CATEGORY: 'Drinks',
    //     ITEM_OTHER: null,
    //     ITEM_COUNT: 0,
    //     ITEM_SHOP_LOCATION: {lat: 0, lng: 0},
    //     ITEM_SHOP_NAME: null,
    //     ITEM_SHOP_DISTANCE: {
    //         distance: 0,
    //         disStr: '0 m'
    //     },
    //     ITEM_TIMESTAMP: 0
    // }

    // get_ITEM_DEFAULT(){
    //     return this.ITEM_DEFAULT;
    // }

    // ITEM: iItem = {
    //     ITEM_ID: null,
    //     ITEM_NAME_LOCAL: null,
    //     ITEM_NAME_EN: null,
    //     ITEM_IMAGES: [],
    //     ITEM_PRICE: null,
    //     ITEM_SIZE: null,
    //     ITEM_DATE_CREATE: null,
    //     ITEM_SHOP_ID: null,
    //     ITEM_ON_SALE: false,
    //     ITEM_NEW: true,
    //     ITEM_VISIBLE: true,
    //     ITEM_IMG_SHARED: false,
    //     ITEM_CATEGORY: 'Drinks',
    //     ITEM_OTHER: null,
    //     ITEM_COUNT: 0,
    //     ITEM_SHOP_LOCATION: {lat: 0, lng: 0},
    //     ITEM_SHOP_NAME: null,
    //     ITEM_SHOP_DISTANCE: {
    //         distance: 0,
    //         disStr: '0 m'
    //     },
    //     ITEM_TIMESTAMP: 0
    // }

    // ITEM_IMG64s_DEFAULT: string[] = null;
    // ITEM_IMG64s: string[] = null;

    // DEFAULT

    SETTING_DEFAULT: iSetting = {
        setCafe: true,
        setRestaurant: true,
        setTakeAway: true,
        setHomeMade: true,
        setOther: true,
        language: 'english'
    }

    SETTING: iSetting = {
        setCafe: true,
        setRestaurant: true,
        setTakeAway: true,
        setHomeMade: true,
        setOther: true,
        language: 'english'
    }

    BOOKING_DEFAULT: iBooking = {
        B_ID: null,
        B_FROM_TIME_NO: 0,
        B_FROM_TIME_STR: null,
        B_TO_TIME_NO: 0,
        B_TO_TIME_STR: null,
        // B_FROM_DATE: null,
        // B_TO_DATE: null,
        B_HOURS: null,
        B_DESC: null,
        B_GUIDE_ID: null,
        B_GUIDE_NAME: null,
        B_USER_ID: null,
        B_USER_NAME: null,
        B_STATUS: 'BOOKING',
        B_LOCATION: null,
        B_TOTAL: 0,
        B_PAID_STAT: 'NOT_PAID',
        B_NOTE: null,
        B_TIMESTAMP: null,
        B_DATE: null,
        B_USR_RATING: 3,
        B_GRP_TYPE: 'GROUP1',
        B_GRP_STR: 'INDIVIDUAL',
        B_GRP_RATE: 1
    }

    BOOKING: iBooking = {
        B_ID: null,
        B_FROM_TIME_NO: 0,
        B_FROM_TIME_STR: null,
        B_TO_TIME_NO: 0,
        B_TO_TIME_STR: null,
        // B_FROM_DATE: null,
        // B_TO_DATE: null,
        B_HOURS: null,
        B_DESC: null,
        B_GUIDE_ID: null,
        B_GUIDE_NAME: null,
        B_USER_ID: null,
        B_USER_NAME: null,
        B_STATUS: 'BOOKING',
        B_LOCATION: null,
        B_TOTAL: 0,
        B_PAID_STAT: 'NOT_PAID',
        B_NOTE: null,
        B_TIMESTAMP: null,
        B_DATE: null,
        B_USR_RATING: 3,
        B_GRP_TYPE: 'GROUP1',
        B_GRP_STR: 'INDIVIDUAL',
        B_GRP_RATE: 1
    }

    RATE_DEFAULT: iRating = {
        RT_ID: '',
        RT_BOOK_ID: '',
        RT_STAR: 3,
        RT_RATER_ID: '',
        RT_RATER_EMAIL: '',
        RT_RATER_NAME: '',
        RT_COMMENT: '',
        RT_RATEE: '',
        RT_TIMESTAMP: 0,
        RT_TIME_STR: ''
    }

    // ORDER_DEFAULT: iOrder = {
    //     ORDER_ID: null,
    //     ORDER_SHOP_ID: null,
    //     ORDER_USER_ID: null,
    //     ORDER_STAFT_ID: null,
    //     ORDER_STATUS: null,
    //     ORDER_DATE_CREATE: null,
    //     ORDER_LAST_UPDATE: null,
    //     ORDER_TABLE: null,
    //     ORDER_LIST: [],
    //     ORDER_NOTES: null,
    //     ORDER_OTHER: null,
    //     ORDER_TOTAL: 0,
    //     ORDER_ONAIR: true, 
    //     ORDER_TIMESTAMP: 0
    // }

    // IMAGE_DEFAULT: iImage = {
    //     IMG_KEYWORD: null, 
    //     IMG_URL: null, 
    //     THUM_URL: null 
    // }

    // IMAGE: iImage = {
    //     IMG_KEYWORD: null, 
    //     IMG_URL: null, 
    //     THUM_URL: null 
    // }

    // SHOP_IMAGE: string;
    // SHOP_IMAGES_DEFAULT: string[] = [];
    // SHOP_IMAGES: string[] = [];

    // //ShopMenuPage, ShopOrderPage
    // SHOP_ITEMS = [];
    // SHOP_ITEMS_ID = [];
    // SHOP_ITEMS_INDEX = [];

    // PROFILE_DEFAULT: iProfile = {
    //     PROFILE_AVATAR_URL: '',
    //     PROFILE_NAME: '',
    //     PROFILE_EMAIL: '',
    //     PROFILE_BIRTHDAY: '',
    //     PROFILE_TEL: '',
    //     PROFILE_ADDRESS: '',
    //     PROFILE_STATE: '',
    //     PROFILE_VERIFIED: false,
    //     PROFILE_UID: '',
    //     PROFILE_PROVIDER: '',
    //     PROFILE_IDENTIFIER: '',
    //     PROFILE_CREATED: '',
    //     PROFILE_OTHERS: nullit
    // }

    // PROFILE: iProfile = {
    //     PROFILE_AVATAR_URL: '',
    //     PROFILE_NAME: '',
    //     PROFILE_EMAIL: '',
    //     PROFILE_BIRTHDAY: '',
    //     PROFILE_TEL: '',
    //     PROFILE_ADDRESS: '',
    //     PROFILE_STATE: '',
    //     PROFILE_VERIFIED: false,
    //     PROFILE_UID: '',
    //     PROFILE_PROVIDER: '',
    //     PROFILE_IDENTIFIER: '',
    //     PROFILE_CREATED: '',
    //     PROFILE_OTHERS: null
    // }

    // PROFILE_OLD: iProfile = {
    //     PROFILE_AVATAR_URL: '',
    //     PROFILE_NAME: '',
    //     PROFILE_EMAIL: '',
    //     PROFILE_BIRTHDAY: '',
    //     PROFILE_TEL: '',
    //     PROFILE_ADDRESS: '',
    //     PROFILE_STATE: '',
    //     PROFILE_VERIFIED: false,
    //     PROFILE_UID: '',
    //     PROFILE_PROVIDER: '',
    //     PROFILE_IDENTIFIER: '',
    //     PROFILE_CREATED: '',
    //     PROFILE_OTHERS: null
    // }


    // itemAction: string = 'add-new';  // add-new, item-update
    // existingImageUrls: string[] = [];
    // orgExistingImageUrls: string[] = [];
    // resizedImages: string[] = [];
    // images: any[] = [];
    // isUserChosenPositionSet: boolean = false;
    // existingSoldItemID: string = null;


    // isProfileLoaded: boolean = false;

    // constructor(
    //     private afService: AngularFireService,
    //     private dbService: DbService,
    //     private appService: AppService
    // ) { }

    // getImages() {
    //     return this.images;
    // }
    // setImages(images) {
    //     this.images = images;
    // }

    // getExistingSoldItemID() {
    //     return this.existingSoldItemID;
    // }
    // setExistingSoldItemID(id: string) {
    //     this.existingSoldItemID = id;
    // }


    // setItemAction(action: string) {
    //     this.itemAction = action
    // }
    // getItemAction() {
    //     return this.itemAction;
    // }
    // // For Add-item-new/ CAMERA
    // setExistingImageUrls(imageUrls: string[]) {
    //     this.existingImageUrls = imageUrls;
    // }
    // getExistingImageUrls() {
    //     return this.existingImageUrls
    // }

    // setOrgExistingImageUrls(imageUrls: string[]) {
    //     this.orgExistingImageUrls = imageUrls;
    //     console.log(this.orgExistingImageUrls);
    // }
    // getOrgExistingImageUrls() {
    //     return this.orgExistingImageUrls
    // }

    // setResizedImages(resizedImages) {
    //     this.resizedImages = resizedImages;
    // }
    // getResizedImages() {
    //     return this.resizedImages;
    // }

    // // For Add-item-new // LOCATION
    // setIsUserChosenPositionSet(isSet: boolean) {
    //     this.isUserChosenPositionSet = isSet
    // }
    // getIsUserChosenPositionSet() {
    //     return this.isUserChosenPositionSet;
    // }

    // getUserAvatar() {
    //     return this.USER_AVATAR;
    // }

    // setUserAvatar(avatar) {
    //     this.USER_AVATAR = avatar;
    // }

    // // initUserInfo() {
    // //     return new Promise((resolve, reject) => {
    // //         let profile: iProfile = null;
    // //         if (this.afService.getAuth().auth.currentUser != null) {
    // //             // getProfile
    // //             let uid = this.afService.getAuth().auth.currentUser.uid;
    // //             this.dbService.getOneItemReturnPromise('UsersProfile/' + uid)
    // //                 .then((res) => {
    // //                     // console.log(res.val());
    // //                     profile = res.val();
    // //                     // console.log(profile);
    // //                     resolve(profile);
    // //                 })
    // //         } else {
    // //             console.log('user not login');
    // //             reject(null);
    // //         }
    // //     })
    // // }



    // setNewStatusForOrder(SHOP_ID, USER_ID, NEW_STATUS, ORDER_ID, DATE) {
    //     if (NEW_STATUS === 'CLOSED') {
    //         // update OrdersOfShop
    //         this.afService.updateObjectData('OrdersOfShop/' + SHOP_ID + '/' + DATE + '/' + ORDER_ID + '/ORDER_STATUS', NEW_STATUS);
    //         this.dbService.copyObjectFromURL2URL('OrdersOfShop/' + SHOP_ID + '/' + DATE, 'ActiveOrdersOfUser/' + USER_ID + '/' + SHOP_ID, ORDER_ID)

    //         setTimeout(() => {
    //             this.dbService.removeAnObjectAtNode('ActiveOrdersOfUser/' + USER_ID + '/' + SHOP_ID + '/' + ORDER_ID);
    //         }, 3000);
    //     }else if (NEW_STATUS === 'DELETED') {
    //         setTimeout(() => {
    //             // delete from ActiveOrdersOfUser
    //             this.dbService.removeAnObjectAtNode('ActiveOrdersOfUser/' + USER_ID + '/' + SHOP_ID + '/' + ORDER_ID);
    //             // delete from OrdersOfUser/USER_ID/DATE/
    //             this.dbService.removeElementFromArray('OrdersOfUser/' + USER_ID + '/' + DATE, 'OrdersOfShop/' + SHOP_ID + '/' + DATE + '/' + ORDER_ID)
    //             // delete from OrdersOfShop/SHOP_ID/
    //             this.dbService.removeAnObjectAtNode('OrdersOfShop/' + SHOP_ID + '/' + DATE + '/' + ORDER_ID);
    //         }, 3000);
    //     } else {
    //         // update OrdersOfShop
    //         this.afService.updateObjectData('OrdersOfShop/' + SHOP_ID + '/' + DATE + '/' + ORDER_ID + '/ORDER_STATUS', NEW_STATUS);
    //         // this.afService.updateObjectData('ActiveOrdersOfUser/' + USER_ID + '/' + ORDER_ID + '/ORDER_STATUS', NEW_STATUS);
    //         this.dbService.copyObjectFromURL2URL('OrdersOfShop/' + SHOP_ID + '/' + DATE, 'ActiveOrdersOfUser/' + USER_ID + '/' + SHOP_ID, ORDER_ID)
    //     }
    // }

    // sendNewOrder(ORDER: iOrder, SHOP_ID, USER_ID, DATE) {
    //     return new Promise((resolve, reject) => {
    //         // 1. Insert item to OrdersOfShop
    //         this.afService.addItem2List('OrdersOfShop/' + SHOP_ID + '/' + DATE, ORDER)
    //             .then((res) => {
    //                 // 2. update ITEM_ID into OrdersOfShop/SHOP_ID/ITEM_ID
    //                 let ORDER_ID = res.key;
    //                 this.afService.updateObjectData('OrdersOfShop/' + SHOP_ID + '/' + DATE + '/' + ORDER_ID + '/ORDER_ID', ORDER_ID)
    //                     .then((resp) => {
    //                         console.log('Order sending success');
    //                         // 3. add to array of Orders of user
    //                         this.dbService.insertElementIntoArray('OrdersOfUser/' + USER_ID + '/' + DATE, 'OrdersOfShop/' + SHOP_ID + '/' + DATE + '/' + ORDER_ID);

    //                     })

    //                 //4. insert ActiveOrdersOfUser/USER_ID/SHOP_ID
    //                 let ActiveORDER = ORDER
    //                 ActiveORDER['ORDER_ID'] = ORDER_ID;
    //                 this.dbService.insertAnObjectAtNode('ActiveOrdersOfUser/' + USER_ID + '/' + SHOP_ID + '/' + ORDER_ID, ActiveORDER).then((res) => console.log('active orders of user updated'));
    //             })
    //     })
    // }

    // updateOrder(ORDER_LIST, Order2Update) {
    //     console.log(ORDER_LIST);
    //     console.log(Order2Update);
    //     Order2Update.ORDER_LIST = ORDER_LIST;
    //     Order2Update.ORDER_STATUS = 'UPDATED';
    //     let DATE = Order2Update.ORDER_DATE_CREATE.substr(0, 10);
    //     // update OrdersOfShop
    //     this.afService.updateObjectData('OrdersOfShop/' + Order2Update.ORDER_SHOP_ID + '/' + DATE + '/' + Order2Update.ORDER_ID, Order2Update)
    //     // update ActiveOrdersOfUser
    //     this.afService.updateObjectData('ActiveOrdersOfUser/' + Order2Update.ORDER_USER_ID + '/' + Order2Update.ORDER_SHOP_ID + '/' + Order2Update.ORDER_ID, Order2Update)
    // }

    // getShopItems_ID(SHOP_ID: string) {
    //     return this.dbService.getListReturnPromise_ArrayOfData('Shop_Items/' + SHOP_ID)
    //     // .then((items_id)=>{
    //     //     console.log(items_id)
    //     // })
    // }

    // // get Array of SHOP_ITEMS and array of SHOP_ITEMS_ID
    // getItemDataFromListOfItems_ID(ITEMS_ID: string[]) {
    //     return new Promise((resolve, reject) => {
    //         let SHOP_ITEMS = [];
    //         let SHOP_ITEMS_ID = [];
    //         let length = ITEMS_ID.length;
    //         let n = 0;
    //         ITEMS_ID.forEach(ITEM_ID => {
    //             this.dbService.getOneItemReturnPromise('Items/' + ITEM_ID)
    //                 .then((item: iItem) => {
    //                     SHOP_ITEMS.push(item);
    //                     SHOP_ITEMS_ID.push(item.ITEM_ID);
    //                     n++;
    //                     if (n == length) {
    //                         resolve({ SHOP_ITEMS: SHOP_ITEMS, SHOP_ITEMS_ID: SHOP_ITEMS_ID });
    //                     }
    //                 })
    //         })
    //     })
    // }

    // getSHOP_ITEMSnSHOP_ITEMS_ID(SHOP_ID) {
    //     return new Promise((resolve, reject) => {
    //         this.getShopItems_ID(SHOP_ID).then((ITEMs_ID: string[]) => {
    //             console.log(ITEMs_ID);
    //             if (ITEMs_ID.length > 0) {
    //                 this.getItemDataFromListOfItems_ID(ITEMs_ID)
    //                     .then((data: any) => {
    //                         // console.log(data);
    //                         // console.log(data.SHOP_ITEMS);
    //                         // console.log(data.SHOP_ITEMS_ID);
    //                         resolve(data);
    //                     })
    //                     .catch((err) => { reject(err) })
    //             } else {
    //                 reject({ data: null });
    //             }
    //         })
    //             .catch((err) => { reject(err) })
    //     })
    // }

    // getSHOPs_ID(USER_ID: string, DATE: string) {
    //     return new Promise((resolve, reject) => {
    //         let SHOP_IDs = [];
    //         let uniquArr = [];
    //         this.dbService.getListReturnPromise_ArrayOfData('OrdersOfUser/' + USER_ID + '/' + DATE).then((data: any[]) => {
    //             console.log(data);
    //             SHOP_IDs = [];
    //             // Array.from(new Set(ORDERs_ID.map((item)=> item.app)))
    //             data.forEach(ORDER_ID => {
    //                 console.log(ORDER_ID);
    //                 let length = 'OrdersOfShop/'.length;
    //                 let ShopID = ORDER_ID.toString().substr(length, 20);
    //                 // console.log(ShopID);
    //                 SHOP_IDs.push(ShopID);
    //             })
    //             console.log(SHOP_IDs);
    //             if (SHOP_IDs.length > 0) {
    //                 uniquArr = this.appService.removeDuplicate(SHOP_IDs);
    //                 console.log(uniquArr);
    //                 resolve(uniquArr);
    //             } else {
    //                 reject({ message: 'there is no record', result: [] });
    //             }
    //         })
    //     })

    // }

    // getORDERS_IDOfUser(USER_ID: string, DATE: string) {
    //     let URL = 'OrdersOfUser/' + USER_ID + '/' + DATE;
    //     return this.dbService.getListReturnPromise_ArrayOfData(URL)
    //     // .then((ORDERs_ID)=>{
    //     //     console.log(ORDERs_ID);
    //     // })
    // }

    // getOrderDetailFromOrderIdURL(ORDER_URL) {
    //     this.dbService.getOneItemReturnPromise(ORDER_URL)
    //     // .then((orderDetail: iOrder)=>{
    //     //     console.log(orderDetail);
    //     // })
    // }
}

export interface iPhoto {
    url: string,
    VISIBLE: boolean,
    NEW: boolean
}

/*
this service is used to hold local variables between pages
 */