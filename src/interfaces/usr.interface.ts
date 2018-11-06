import { iPosition } from "./position.interface";
import { iDay } from "./day.interface";
import { iLocation } from "./location.interface";
import { iBookingTime } from "./booking-time.interface";


export interface iUsr {
    U_ADDRESS: string,
    U_AVATAR?: string,
    U_BIRTHDAY: string,
    U_EMAIL: string,
    U_ID: string,
    U_NAME: string,
    U_TEL: string,
    U_TIMESTAMP: number,
    U_ORG: string,
    U_ROLE: string,
    U_STATE: string,
    U_VALID_FROM: string,
    U_VALID_TO: string
}
