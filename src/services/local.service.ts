import { Injectable } from '@angular/core';
// import { AngularFireService } from './af.service';
// import { DbService } from './db.service';
// import { AppService } from './app.service';

// import { iShop } from '../interfaces/shop.interface';
// import { iItem } from '../interfaces/item.interface';
// import { iOrder } from '../interfaces/order.interface';
import { iPatient } from '../interfaces/patient.interface';
import { iUser } from '../interfaces/user.interface';
import { iPrivacy } from '../interfaces/privacy.interface';
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
        PAT_AMPUTATION_LEGS: '0',
        PAT_AMPUTATION_LAST_LEG_YEAR: '',
        PAT_AMPUTATION_LAST_SPONSORS: [],
        PAT_JOB: { VI: '', EN: '' },
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
        PAT_STATE: '',
        PAT_isSELECTED: false,
        PAT_INV_FROM: '',
        PAT_INV_TO: '',
        PAT_OTHER: {},
        PAT_MILESTONE: ['', '', '', '', '', '', '', '', '', '', '', ''],
        PAT_IMAGES: [],
        PAT_DOCS: [],
        PAT_COST: [],
        PAT_COST_LIST: {},
        PAT_NOTES: [],
        PAT_QUESTIONS: [],
        PAT_CASENUMBER: '',
        PAT_DRAFT: '0000-00-00',
        PAT_DENIED: '0000-00-00',
        PAT_ACCEPTED: '0000-00-00',
        PAT_REJECTED: '0000-00-00',
        PAT_SUBMITTED: '0000-00-00',
        PAT_APPROVED: '0000-00-00',
        PAT_INVITED: '0000-00-00',
        PAT_UNDERTREATMENT: '0000-00-00',
        PAT_PAYMENTREQUEST: '0000-00-00',
        PAT_PAYMENTAPPROVED: '0000-00-00',
        PAT_PAID: '0000-00-00',
        PAT_CLOSED: '0000-00-00',
        PAT_FOLLOWUP: '0000-00-00'
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

    USER = null;

    USER_DEFAULT: iUser = {
        U_ADDRESS: '',
        U_AVATAR: '',
        U_BIRTHDAY: '',
        U_EMAIL: '',
        U_ID: '',
        U_NAME: '',
        U_TEL: '',
        U_TIMESTAMP: 0,
        U_ORG: 'MA1',
        U_ROLE: '',
        U_STATE: 'REQUEST',
        U_VALID_FROM: '',
        U_VALID_TO: ''
    };

    BASIC_INFOS = null;
    BASIC_INFOS_GOT: boolean = false;


    // USER_AVATAR: string = null;
    USER_ID: string = null;
    USER_FB = null;

    isUserInfoGot: boolean = false;
    isAdminOfAppChecked: boolean = false;
    isAdminOfApp: boolean = false;

    doUserLogout() {
        this.isUserInfoGot = false;
        this.isAdminOfAppChecked = false;
        this.isAdminOfApp = false;
        this.USER_ID = null;
        this.USER_FB = null;
    }

}

export interface iPhoto {
    url: string,
    VISIBLE: boolean,
    NEW: boolean
}

/*
this service is used to hold local variables between pages
 */