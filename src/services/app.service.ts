import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

// import { iSetting } from '../interfaces/setting.interface';
// import { iSoldItem } from '../interfaces/sold-item.interface';
// import { iShop } from '../interfaces/shop.interface';

// import { AngularFireService } from './af.service';
// import { DbService } from './db.service';

@Injectable()
export class AppService {
    loadCtrl: any;

    constructor(
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        // private afService: AngularFireService,
        // private dbService: DbService
    ) { }

    alertError(title: string, msg: string) {
        this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: ['OK']
        }).present();
    }
    alertMsg(title: string, msg: string) {
        this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: ['OK']
        }).present();
    }

    toastMsg(msg: string, duration: number) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: duration
        });
        toast.present();
    }

    toastMsgWithPosition(msg: string, duration: number, position: string) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: duration,
            position: position,
            showCloseButton: true
        });
        toast.present();
    }

    convertToCurrency(number: string, seperatedSymbol: string): string {
        let parts = [];
        let len = number.length / 3;
        // console.log(len);
        for (let i = 0; i < len; i++) {
            let fromNum = number.length - (3 + i * 3);
            if (fromNum > 0) {
                parts[i] = number.substr(fromNum, 3);
                // console.log(parts[i]);
            } else {
                parts[i] = number.substr(0, number.length - i * 3);
                // console.log(parts[i]);
            }
        }
        // console.log(parts);
        var convertN = '';
        var finalConvertedN = '';
        for (let i = 1; i <= parts.length; i++) {
            convertN = convertN.concat(parts[parts.length - i], seperatedSymbol);

        }
        finalConvertedN = convertN.substr(0, convertN.length - 1);
        // console.log(finalConvertedN);
        return finalConvertedN;
    }


    // SUMMARY
    // DateFormat1: 2017-12-20
    // DateFormat2: 2017/12/20
    // DateFormat3: 20171220

    // return format: '2017/04/09'
    getCurrentDate(): string {
        let today = new Date();
        let realMonth = today.getMonth() + 1;
        let month = realMonth < 10 ? '0' + realMonth : realMonth;
        let date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        return today.getUTCFullYear().toString() + '/' + month.toString() + '/' + date.toString();
    }

    // return format1: '2017-04-09'
    getCurrentDateFormat1(): string {
        let DATE = this.getCurrentDate();
        return this.convertDateFormat1(DATE);
    }

    // return format2: '2017/04/09'
    getCurrentDateFormat2(): string {
        let DATE = this.getCurrentDate();
        return this.convertDateFormat2(DATE);
    }

    // return 20171108
    getCurrentDateFormat3() {
        let DATE = this.getCurrentDate();
        return this.convertDateFormat3(DATE);
    }

    // return format: '12:30:15'
    getCurrentTime(): string {
        let today = new Date();
        let hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
        let minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
        let second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();

        return hour.toString() + ':' + minute.toString() + ':' + second.toString();
    }

    // return format: '2017/04/09 12:30:15'
    getCurrentDateAndTime(): string {
        return this.getCurrentDate() + ' ' + this.getCurrentTime();
    }

    // return 20180619205900
    getCurrentDateAndTimeString() {
        let today = new Date();
        let hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
        let minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
        let realMonth = today.getMonth() + 1;
        let month = realMonth < 10 ? '0' + realMonth : realMonth;
        let date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        let year = today.getUTCFullYear().toString()
        return year + month + date + hour + minute;
    }

    // convert from 2017/10/10 to 2017-10-10
    convertDateFormat1(DATE1: string) {
        return DATE1.substr(0, 4) + '-' + DATE1.substr(5, 2) + '-' + DATE1.substr(8, 2);
    }

    convertDateFormat2(DATE1: string) {
        return DATE1.substr(0, 4) + '/' + DATE1.substr(5, 2) + '/' + DATE1.substr(8, 2);
    }

    // return format: 20171108
    convertDateFormat3(DATE1: string) {
        console.log(DATE1);
        return DATE1.substr(0, 4) + DATE1.substr(5, 2) + DATE1.substr(8, 2);
    }




    getDateArrayFromDate1toDate2(DATE1: string, DATE2: string) {
        let date1 = new Date(DATE1).getTime(); // in milisec
        let date2 = new Date(DATE2).getTime();
        let nDAY = (date2 - date1) / 86400000;
        console.log(nDAY);
        let DATE_ARRAY = [];
        for (var index = 0; index < nDAY + 1; index++) {
            let nMilSec = date1 + index * 86400000;
            let date = new Date(nMilSec);
            let YEAR = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let MONTH = month < 10 ? '0' + month : month
            let DAY = day < 10 ? '0' + day : day;
            let dateString = YEAR + '/' + MONTH + '/' + DAY;
            DATE_ARRAY.push(dateString);
        }
        console.log(DATE_ARRAY);
        return DATE_ARRAY;
    }

    getDateArrayFromDate1toDate2Format3(DATE1: string, DATE2: string) {
        let date1 = new Date(DATE1).getTime(); // in milisec
        let date2 = new Date(DATE2).getTime();
        let nDAY = (date2 - date1) / 86400000;
        console.log(nDAY);
        let DATE_ARRAY = [];
        for (var index = 0; index < nDAY + 1; index++) {
            let nMilSec = date1 + index * 86400000;
            let date = new Date(nMilSec);
            let YEAR = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let MONTH = month < 10 ? '0' + month : month
            let DAY = day < 10 ? '0' + day : day;
            let dateString = YEAR.toString() + MONTH.toString() + DAY.toString();
            DATE_ARRAY.push(dateString);
        }
        console.log(DATE_ARRAY);
        return DATE_ARRAY;
    }

    getArrayOfDateFromToday(nOfDay: number) {
        let currentTimeMS = Date.now();
        return this.getArrayOfDateFromMiliSecond(currentTimeMS,nOfDay);
    }

    getArrayOfDateFromMiliSecond(FROM: number, noOfDays: number){
        let DATES = [];
        for (let index = 0; index < noOfDays; index++) {
            let msecond = FROM + index * 86400000;
            // let Date = new Date()
            let DATE = this.getDateFromMilisecond(msecond);
            DATES.push(DATE);
        }
        return DATES;
    }

    getDateFromMilisecond(MS: number) {
        let date = new Date(MS);
        let YEAR = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let weekday = this.getShortDayOfWeek(date.getDay());

        let MONTH = month < 10 ? '0' + month : month
        let DAY = day < 10 ? '0' + day : day;
        let YYYYMMDD = YEAR.toString() + MONTH.toString() + DAY.toString();
        // let YYYYMMDD = YEAR.toString() + MONTH.toString() + DAY.toString();
        return {
            YYYYMMDD: YYYYMMDD,
            WEEKDAY: weekday
        }
    }

    getDayOfWeek(n: number) {
        var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return weekday[n];
    }

    getShortDayOfWeek(n: number) {
        var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekday[n];
    }

    // return format 2018/2/1 14:11
    convertTimeStamp2Format3(TIME: number) {
        var date = new Date(TIME);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dates = date.getDate();
        // Hours part from the timestamp
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        // Minutes part from the timestamp
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        let TIMESTRING = year + '/' + month + '/' + dates + ' ' + hours + ':' + minutes
        return TIMESTRING
    }

    convertCodeToDetail(code: string): string {
        switch (code) {
            case 'setHouse':
                return 'Nhà riêng lẻ';
            case 'setApartment':
                return 'Chưng cư, CHCC';
            case 'setLand':
                return 'Đất vườn';
            case 'setOther':
                return 'Khác';
            default:
                return 'Khác';
        };
    }

    getObjectInfoForPopover() {
        let infoObject = {
            position: { lat: 0, lng: 0 },
            imgUrl: 'http://tanthoidai.com.vn/images/gallery/images/D%E1%BB%B1%20%C3%A1n%20Vinhomes%20Riverside/biet-thu-Vinhomes-Riverside-ngoai-tha.jpg',
            price: '1 tỷ 500',
            dtSan: '100m2 sàn',
            dtSd: '300m2 sử dụng'
        }

        return infoObject;
    }

    // Find commons elements from 2 arrays
    commonOf2Arrays(arr1: any[], arr2: any[]) {
        let commons: any[] = [];
        arr1.forEach(item => {
            let index = arr2.indexOf(item)
            if (index > -1) {
                commons.push(item)
            }
        })
        return commons;
    }

    removeDuplicate(arr1: string[]) {
        let array = [];
        array.push(arr1[0]);
        arr1.forEach(item => {
            let index = array.indexOf(item);
            if (index < 0) {
                array.push(item);
            }
        })
        return array;
    }

    removeDuplicateObjectFromArray(arr1: any[], key: string) {
        let new_array = arr1.map(item => item[key]);
        let uniqKeys = this.removeDuplicate(new_array);
        console.log(uniqKeys);
        let results = [];
        uniqKeys.forEach(key1 => {
            let data = arr1.find(((item) => {
                return item[key] == key1
            }))
            console.log(key1, data);
            results.push(data);
        })
        console.log(results)
        return results;
    }

    // Find elements that array1 has while array2 does not;
    diffArray1FromArray2(arr1: any[], arr2: any[]) {
        let diff: any[] = [];
        arr1.forEach(item => {
            let index = arr2.indexOf(item);
            if (index < 0) {
                diff.push(item);
            }
        })
        return diff;
    }

    // combineArray1IntoArray2(arr1: any[], arr2: any[]){
    //     arr1.forEach(item=>{
    //         arr2.indexOf()
    //     })
    // }


    covertObjectArray2ArrayArray(arr1: any[]) {
        // let arr2: any[] = [];

    }

    convertOBject2ArrayOfObjectOfKEY_DATA(OBJECT: any, KEY: string, DATA_NAME: string) {
        let DATAS = [];
        Object.keys(OBJECT).forEach(key => {
            let DATA = {};
            DATA[KEY] = key;
            DATA[DATA_NAME] = OBJECT[key];
            DATAS.push(DATA);
        })
        return DATAS;
    }

    ObjectHasAnyChanged(obj1: any, obj2: any) {
        let OB1 = JSON.stringify(obj1);
        let OB2 = JSON.stringify(obj2);
        let changed = OB1 === OB2 ? false : true;
        return changed;
    }

}