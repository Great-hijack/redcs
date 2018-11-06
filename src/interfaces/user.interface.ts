import { iPosition } from "./position.interface";
import { iDay } from "./day.interface";
import { iLocation } from "./location.interface";
import { iBookingTime } from "./booking-time.interface";


export interface iUser {
    U_ADDRESS: string
    U_AVATAR?: string,
    U_BIRTHDAY: string,
    U_EMAIL: string,
    // U_FAV_ITEMS?: string[],
    // U_FAV_SHOPS?: string[],
    U_ID: string,
    U_NAME: string,
    U_TEL: string,
    U_POSITION: iPosition,
    U_LOCATION: iLocation,
    U_TIMESTAMP: number;
    U_COST: number,
    U_EXP_YEARS: number,
    U_BOOKED_TIME: {}
    U_BOOKED_DAYS: iBookingTime[],
    U_ID_CARD_URL: string,
    U_CERT_URL: string,
    U_GUIDE_STAT: string
    U_GUIDE_LANG: iLang[],
    U_GUIDE_SKILLS: string[]
}

export interface iLang {
    L_NAME: string,
    L_LEVEL: string,
    L_FLAG: string
}