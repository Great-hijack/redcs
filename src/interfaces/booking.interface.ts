import { iLocation } from "./location.interface";

export interface iBooking {
    B_ID: string,
    B_FROM_TIME_STR: string,
    B_FROM_TIME_NO: number,
    B_TO_TIME_STR: string,
    B_TO_TIME_NO: number,
    B_HOURS: number,
    B_DESC: string,
    B_GUIDE_ID: string,
    B_GUIDE_NAME: string,
    B_USER_ID: string,
    B_USER_NAME: string,
    B_STATUS: string,
    B_LOCATION: iLocation,
    B_TOTAL: number,
    B_PAID_STAT: string,
    B_NOTE: string,
    B_TIMESTAMP: number,
    B_DATE: string,
    B_USR_RATING: number,
    B_GRP_TYPE: string,
    B_GRP_STR: string,
    B_GRP_RATE: number
}