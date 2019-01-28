import { Injectable } from '@angular/core';

import { AppService } from './app.service';
import { DbService } from './db.service';
import { LocalService } from './local.service';
// // import { GchartService } from './gchart.service';
// import { AuthService } from './auth.service';
// import { AngularFireService } from './af.service';

// import { iOrder } from '../interfaces/order.interface';
// import { iItem } from '../interfaces/item.interface';
// import { iProfile } from '../interfaces/profile.interface';
import { iUser } from '../interfaces/user.interface';
// import { iShop } from '../interfaces/shop.interface';
// import { iImage } from '../interfaces/image.interface';
// import { iIssue } from '../interfaces/issue.interface';

import firebase from 'firebase';
import 'firebase/firestore';
import { iBooking } from '../interfaces/booking.interface';
import { iRating } from '../interfaces/rating.interface';
import { iLocation } from '../interfaces/location.interface';
import { iBookingTime } from '../interfaces/booking-time.interface';
import { iUsr } from '../interfaces/usr.interface';
import { iPatient, iQuestion } from '../interfaces/patient.interface';
import { iLoc } from '../interfaces/loc.interface';
import { iQuestForm } from '../interfaces/questform.interface';
import { MailService } from './mail.service';
@Injectable()

export class CrudService {

    constructor(
        private appService: AppService,
        private dbService: DbService,
        private localService: LocalService,
        private mailService: MailService
        // // private gchartService: GchartService,
        // private authService: AuthService,
    ) { }


    // FOR REDCROSS

    // CRUD BASIC INFO
    basicInfoCreate(url, data) {
        return firebase.firestore().doc(url).set(data)
    }

    updateDocumentAtRefUrl(URL: string, DATA) {
        return firebase.firestore().doc(URL).update(DATA);
    }

    getDocumentAtRefUrl(URL: string) {
        return firebase.firestore().doc(URL).get()
    }

    getBasicData() {
        return new Promise((resolve, reject) => {
            firebase.firestore().doc('INFOS/BASIC').get()
                .then((res) => {
                    if (res.exists) {
                        this.localService.BASIC_INFOS = res.data();
                        this.localService.BASIC_INFOS_GOT = true;
                        console.log(this.localService.BASIC_INFOS);
                        resolve({ BASIC_INFOS: res.data(), BASIC_INFOS_GOT: true })
                    } else {
                        resolve({ BASIC_INFOS: null, BASIC_INFOS_GOT: false })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.localService.BASIC_INFOS = null;
                    this.localService.BASIC_INFOS_GOT = false;
                    reject(err);
                })
        })
    }

    updateBasicData(DATA) {
        return firebase.firestore().doc('INFOS/BASIC').update(DATA);
    }

    getCurrentUsrProfile() {
        return new Promise((resolve, reject) => {
            let usr = firebase.auth().currentUser;
            if (usr && !this.localService.USR) {
                this.getUsrProfile(usr.uid)
                    .then((res: any) => {
                        let USR = <iUsr>res.doc();
                        this.localService.USR = USR;
                        resolve(USR);
                    })
                    .catch(err => reject(err))
            }
        })
    }

    getDistrictWard(id) {
        return firebase.firestore().doc('DVHC/' + id).get()
    }

    usrProfileCreate(USR: iUsr) {
        return firebase.firestore().doc('USRS/' + USR.U_ID).set(USR)
            .then((res) => {
                console.log('Updated done', res);
                this.appService.toastMsg('Updated successfully', 3000);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getUsrProfile(USR_ID: string) {
        return firebase.firestore().doc('USRS/' + USR_ID).get()
    }

    usrUpdate(USR: iUsr) {
        return firebase.firestore().doc('USRS/' + USR.U_ID).update(USR);
    }

    getAllUsrs() {
        return firebase.firestore().collection('USRS').get();
    }

    collectionGet(COLLECTION: string) {
        return firebase.firestore().collection(COLLECTION).get();
    }

    patientCreate(PATIENT: iPatient) {
        let PAT = PATIENT
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('PATIENTS').add(PATIENT)
                .then((res) => {
                    PAT.PAT_ID = res.id;
                    return res.update({ PAT_ID: res.id })
                })
                .then(() => {
                    resolve({ MSG: 'create success', PATIENT: PAT });
                    this.mailService.sendEmail2NotifyCaseSubmitted('tho@enablecode.vn');
                })
                .catch((err) => reject(err))
        })
    }

    patientGetByResidentID(ID: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_RES_ID', '==', ID)
            .get()
    }

    patientGetByLNameFName(LName: string, FName: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_LNAME', '==', LName)
            .where('PAT_FNAME', '==', FName)
            .get()
    }

    patientGetAlls() {
        return firebase.firestore().collection('PATIENTS').get()
    }

    patientsGetAllOfReferral(REF_ID: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_REFERRAL_ID', '==', REF_ID)
            .get();
    }
    patientsGetAllOfReferralWithState(REF_ID: string, PAT_STATE: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_REFERRAL_ID', '==', REF_ID)
            .where('PAT_STATE', '==', PAT_STATE)
            .get();
    }

    patientsGetAllOfOrg(ORG: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_REFORG', '==', ORG)
            .get()
    }

    patientsGetAllOfOrgWithState(ORG: string, PAT_STATE: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_REFORG', '==', ORG)
            .where('PAT_STATE', '==', PAT_STATE)
            .get()
    }

    patientsGetAllOfMoveAbility(U_ORG: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_MOVEABILITY', '==', U_ORG)
            .get()
    }

    patientsGetAllOfMoveAbilityWithState(U_ORG: string, PAT_STATE: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_MOVEABILITY', '==', U_ORG)
            .where('PAT_STATE', '==', PAT_STATE)
            .get()
    }

    patientsGetNewOfMoveAbility(MA: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_MOVEABILITY', '==', MA)
            .where('PAT_STATE', '==', 'ACCEPTED')
            .get()
    }



    patientsGetWaitingOfMoveAbility(MA: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_MOVEABILITY', '==', MA)
            .where('PAT_STATE', '==', 'APPROVED')
            .get()
    }

    patientsGetAllOfServiceProvider(SVP: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_SVP', '==', SVP)
            // .where('PAT_STATE', '==', 'INVITED')
            .get()
    }

    patientsGetAllOfServiceProviderWithState(SVP: string, PAT_STATE: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_SVP', '==', SVP)
            .where('PAT_STATE', '==', PAT_STATE)
            .get()
    }


    patientsGetAllsInvitedInDate(DATE: string, USER: iUsr) {
        switch (USER.U_ROLE) {
            case 'Referral Lead':
                return this.patientsGetAllsInvitedInDateOfReferral(DATE, USER.U_ORG)
            // break;
            case 'Referral':
                return this.patientsGetAllsInvitedInDateOfReferral(DATE, USER.U_ORG)
            // break;  
            case 'MoveAbility':
                return this.patientsGetAllsInvitedInDateOfMoveAbility(DATE, USER.U_ORG)
            // break;
            case 'Service Provider':
                return this.patientsGetAllsInvitedInDateOfServiceProvider(DATE, USER.U_ORG)
            // break;
            default:
                break;
        }
        // return new Promise((resolve, reject) => {
        //     firebase.firestore().collection('PATIENTS')
        //         .where('PAT_INV_FROM', '==', DATE)
        //         .where('PAT_STATE', '==', 'INVITED')
        //         .get()
        //         .then((qSnap) => {
        //             let results = [];
        //             if (qSnap.size > 0) {
        //                 qSnap.forEach(doc => {
        //                     if (doc.exists) {
        //                         let result = <iPatient>doc.data();
        //                         results.push(result);
        //                     }
        //                 });
        //                 resolve({ PATIENTS: results });
        //             } else {
        //                 resolve({ PATIENTS: results });
        //             }

        //         })
        //         .catch(err => reject(err))
        // })
    }

    patientsGetAllsInvitedInDateOfMoveAbility(DATE: string, MVA: string) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('PATIENTS')
                .where('PAT_INV_FROM', '==', DATE)
                .where('PAT_STATE', '==', 'INVITED')
                .where('PAT_MOVEABILITY', '==', MVA)
                .get()
                .then((qSnap) => {
                    let results = [];
                    if (qSnap.size > 0) {
                        qSnap.forEach(doc => {
                            if (doc.exists) {
                                let result = <iPatient>doc.data();
                                results.push(result);
                            }
                        });
                        resolve({ PATIENTS: results });
                    } else {
                        resolve({ PATIENTS: results });
                    }
                })
                .catch(err => reject(err))
        })

    }



    patientsGetAllsInvitedInDateOfServiceProvider(DATE: string, SVP: string) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('PATIENTS')
                .where('PAT_INV_FROM', '==', DATE)
                .where('PAT_STATE', '==', 'INVITED')
                .where('PAT_SVP', '==', SVP)
                .get()
                .then((qSnap) => {
                    let results = [];
                    if (qSnap.size > 0) {
                        qSnap.forEach(doc => {
                            if (doc.exists) {
                                let result = <iPatient>doc.data();
                                results.push(result);
                            }
                        });
                        resolve({ PATIENTS: results });
                    } else {
                        resolve({ PATIENTS: results });
                    }

                })
                .catch(err => reject(err))
        })
    }

    patientsGetAllsInvitedInDateOfReferral(DATE: string, REF: string) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('PATIENTS')
                .where('PAT_INV_FROM', '==', DATE)
                .where('PAT_STATE', '==', 'INVITED')
                .where('PAT_REFORG', '==', REF)
                .get()
                .then((qSnap) => {
                    let results = [];
                    if (qSnap.size > 0) {
                        qSnap.forEach(doc => {
                            if (doc.exists) {
                                let result = <iPatient>doc.data();
                                results.push(result);
                            }
                        });
                        resolve({ PATIENTS: results });
                    } else {
                        resolve({ PATIENTS: results });
                    }

                })
                .catch(err => reject(err))
        })
    }

    patientsGetAllWithLocation(LOC: iLoc) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('PATIENTS')
                .where('PAT_HOME_CITY', '==', LOC.CCODE)
                .where('PAT_HOME_DIST', '==', LOC.DCODE)
                .where('PAT_HOME_WARD', '==', LOC.WCODE)
                .get()
                .then((qSnap) => {
                    let results = [];
                    if (qSnap.size > 0) {
                        qSnap.forEach(doc => {
                            if (doc.exists) {
                                let result = <iPatient>doc.data();
                                results.push(result);
                            }
                        });
                        resolve({ PATIENTS: results });
                    } else {
                        resolve({ PATIENTS: results });
                    }

                })
        })
    }

    patientsGetAllByDate(CONDITION: string, DATE: string) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('PATIENTS')
                .where(CONDITION, '==', DATE)
                .get()
                .then((qSnap) => {
                    let results = [];
                    if (qSnap.size > 0) {
                        qSnap.forEach(doc => {
                            if (doc.exists) {
                                let result = <iPatient>doc.data();
                                results.push(result);
                            }
                        });
                        resolve({ PATIENTS: results });
                    } else {
                        resolve({ PATIENTS: results });
                    }

                })
                .catch(err => reject(err));
        })
    }

    getPatientsWithCombination(YoB, AMP_DATE, SP) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('PATIENTS')
                .where('PAT_YoB', '==', YoB)
                .where('PAT_AMPUTATION_YEAR', '==', AMP_DATE)
                .where('PAT_SVP', '==', SP)
                .get()
                .then((qSnap) => {
                    let results = [];
                    if (qSnap.size > 0) {
                        qSnap.forEach(doc => {
                            if (doc.exists) {
                                let result = <iPatient>doc.data();
                                results.push(result);
                            }
                        });
                        resolve({ PATIENTS: results });
                    } else {
                        resolve({ PATIENTS: results });
                    }

                })
        })
    }

    patientUpdate(PAT: iPatient) {
        return firebase.firestore().doc('PATIENTS/' + PAT.PAT_ID).update(PAT);
    }

    patientsUpdate(PATIENTS: iPatient[]) {
        let PROMISES = [];
        PATIENTS.forEach((PAT, index) => {
            PROMISES[index] = this.patientUpdate(PAT);
        })
        return Promise.all(PROMISES)
    }

    // FEEDBACK BENEFICIARY QUESTIONAIRE
    questionaireNewAdd(Q: iQuestForm) {
        let QUEST = Q;
        QUEST.DATE = this.appService.getCurrentDateFormat3();
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('QUESTIONAIRES').add(QUEST)
                .then((res) => {
                    QUEST.ID = res.id;
                    return res.update({ ID: res.id })
                })
                .then(() => {
                    resolve({ MSG: 'create success', QUESTIONAIRE: QUEST })
                })
                .catch((err) => reject(err))
        })
    }

    questionaireUpdate(Q: iQuestForm) {
        return new Promise((resolve, reject) => {
            firebase.firestore().doc('QUESTIONAIRES/' + Q.ID).update(Q)
                .then((res) => {
                    resolve({ MSG: 'Updated successfully' });
                })
                .catch(err => resolve(err));
        })
    }

    questionairesAllGet() {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('QUESTIONAIRES').get()
                .then((qSnap) => {
                    let results = [];
                    if (qSnap.size > 0) {
                        qSnap.forEach(doc => {
                            if (doc.exists) {
                                let result = <iQuestForm>doc.data();
                                results.push(result);
                            }
                        });
                        resolve({ QUESTIONAIRES: results });
                    } else {
                        resolve({ QUESTIONAIRES: results });
                    }

                })
                .catch(err => reject(err));
        })
    }


    // ----------------
    // USERS profile
    // ----------------

    // create user
    userProfileCreate(USER: iUser) {
        return firebase.firestore().doc('USERS/' + USER.U_ID).set(USER)
            .then((res) => {
                console.log('Updated done', res);
                this.appService.toastMsg('Updated successfully', 3000);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // read user
    getUserProfile(USER_ID: string) {
        return firebase.firestore().doc('USERS/' + USER_ID).get()
    }
    // update user
    userUpdate(USER: iUser) {
        return firebase.firestore().doc('USERS/' + USER.U_ID).set(USER, { merge: true });
    }
    // delete user


    //================
    // BOOKING
    //================
    // create booking
    createBooking(BOOKING: iBooking) {
        let BOOKING_TMP = BOOKING;
        return new Promise((resolve, reject) => {
            console.log(BOOKING);
            firebase.firestore().collection('BOOKINGS').add(BOOKING)
                .then((res) => {
                    BOOKING_TMP.B_ID = res.id;
                    return res.update({ B_ID: res.id })
                })
                .then((res) => {
                    this.appService.toastMsg('New Booking success', 3000);
                    resolve({ MSG: 'Booking created', BOOKING: BOOKING_TMP })
                })
                .catch((err) => reject(err))
        })
    }
    // read booking
    // update booking
    updateBooking(BOOKING: iBooking) {
        return firebase.firestore().doc('BOOKINGS/' + BOOKING.B_ID).update(BOOKING).then(() => {
            this.appService.toastMsg('Update Booking successfully', 3000);
        })
    }
    // delete booking


    // BOOKING_TIME

    createBookingTime(BT: iBookingTime) {
        return firebase.firestore().doc('BOOKINGTIMES/' + BT.BT_BOOK_ID).set(BT);
    }

    updateBookingState(LOC: iLocation, TIME_START: number, TIME_END: number, GUIDE_ID: string) {
        let TIMES = [];
        let time = TIME_START;
        while (time <= TIME_END) {
            TIMES.push(time);
            if (time % 100) {
                time += 70;
            } else {
                time += 30;
            }
        }
        console.log(TIMES);
        let PROMISES = [];
        TIMES.forEach((TIME, index) => {
            PROMISES[index] = firebase.firestore().doc('GUIDESINCITY/' + LOC.L_ID + '/DATETIMES/' + TIME).set({
                [GUIDE_ID]: true
            })
        })

        Promise.all(PROMISES).then((res) => {
            console.log('All update');
        })
    }

    updateBookedTimesIntoUser(BOOKING: iBooking, GUIDE: iUser) {
        let TMP_GUIDE = GUIDE;
        let BOOKED_TIMES = typeof (GUIDE.U_BOOKED_TIME) == 'undefined' ? {} : GUIDE.U_BOOKED_TIME;
        let TIMES = [];
        let time = BOOKING.B_FROM_TIME_NO;
        while (time <= BOOKING.B_TO_TIME_NO) {
            TIMES.push(time);
            if (time % 100) {
                time += 70;
            } else {
                time += 30;
            }

            let BT: iBookingTime = {
                BT_BOOK_ID: BOOKING.B_ID,
                BT_STATUS: 'Booked',
            }

            BOOKED_TIMES[time] = BT;
        }
        console.log(BOOKED_TIMES);
        TMP_GUIDE.U_BOOKED_TIME = BOOKED_TIMES;
        return firebase.firestore().doc('USERS/' + GUIDE.U_ID).set(TMP_GUIDE)

    }

    //     // CRUD account to use app
    // //     // 1. Create account

    accountSignUp(EMAIL: string, PASSWORD: string) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(EMAIL, PASSWORD).then((res) => {
                let UID = res.user.uid
                resolve({ res: res, UID: UID });
            }).catch((err) => {
                reject(err);
                console.log(err);
            })
        })
    }
    //     // 2. Read Account

    //     // 3. Update Account

    //     // 4. delete Account

    accountDelete() {

    }

    accountRemoveRoleFromShop(USER_ID, SHOP_ID) {
        // 1. Remove User's Role from Shop
        let pro1 = firebase.firestore().doc('SHOPS/' + SHOP_ID + '/ADMINS/' + USER_ID).delete()
        // 2. Remove Shop-Role from User
        let pro2 = firebase.firestore().doc('USERS/' + USER_ID + '/AD_SHOPS/' + SHOP_ID).delete();
        return Promise.all([pro1, pro2])
    }

    // create manager/staff account
    createAdminWithNewAccount(EMAIL: string, PASS: string, NAME: string, SHOP_ID: string, ROLE: string) {
        // 1. create new account;
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(EMAIL, PASS)
                .then((res) => {
                    let UID = 'res.uid';
                    let pro1 = firebase.firestore().doc('SHOPS/' + SHOP_ID + '/ADMINS/' + UID)
                        .set({
                            EMAIL: EMAIL,
                            ROLE: ROLE,
                            UID: UID
                        })
                        .then((res) => { console.log(res); })
                        .catch((err) => { console.log(err); })

                    let pro2 = firebase.firestore().doc('USERS/' + UID)
                        .set({
                            U_NAME: NAME,
                            U_EMAIL: EMAIL,
                            U_ID: UID,
                        }, { merge: true })
                        .then((res) => { console.log(res); })
                        .catch((err) => { console.log(err); })

                    let pro3 = firebase.firestore().doc('USERS/' + UID + '/AD_SHOPS/' + SHOP_ID)
                        .set({
                            ROLE: ROLE,
                            SHOP_ID: SHOP_ID,
                        })
                        .then((res) => { console.log(res); })
                        .catch((err) => { console.log(err); })

                    Promise.all([pro1, pro2, pro3]).then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    })
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    createAdminWithExistingAccount(EMAIL: string, ROLE: string, SHOP_ID: string) {
        console.log(EMAIL, ROLE, SHOP_ID);
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('USERS').where('U_EMAIL', '==', EMAIL).get().then((qSnap) => {
                console.log(qSnap);
                if (!qSnap.empty) {
                    qSnap.forEach(q => {
                        if (q.exists) {
                            let USER = <iUser>q.data();
                            let UID = <String>q.id;
                            console.log(USER, UID);

                            // add ROLE of USER into SHOP info
                            let pro1 = firebase.firestore().doc('SHOPS/' + SHOP_ID + '/ADMINS/' + UID)
                                .set({
                                    EMAIL: EMAIL,
                                    ROLE: ROLE,
                                    UID: UID
                                })
                                .then((res) => { console.log(res); })
                                .catch((err) => { console.log(err); })

                            // 2. Add ROLE of SHOP to USER Account
                            let pro2 = firebase.firestore().doc('USERS/' + UID + '/AD_SHOPS/' + SHOP_ID)
                                .set({
                                    ROLE: ROLE,
                                    SHOP_ID: SHOP_ID,
                                })
                                .then((res) => { console.log(res); })
                                .catch((err) => { console.log(err); })

                            Promise.all([pro1, pro2]).then((res) => {
                                resolve({ MSG: 'Add existing user s role done', RES: res });
                            }).catch((err) => {
                                console.log(err);
                                reject(err);
                            });
                        } else {
                            console.log(EMAIL + ' is not existing');
                            reject({ MSG: EMAIL + ' is not existed' });
                        }
                    })
                } else {
                    reject({ MSG: EMAIL + 'is not existed' });
                }
            })
        })
    }

    ratingCreate(RATING: iRating) {
        return firebase.firestore().doc('RATINGS/' + RATING.RT_ID).set(RATING)
            .then((res) => {
                this.appService.toastMsg('Rating success', 3000);
            })
    }

    ratingRead(RATING_ID: string) {
        return firebase.firestore().doc('RATINGS/' + RATING_ID).get();
    }

    ratingUpdate(RATING: iRating) {
        return firebase.firestore().doc('RATINGS/' + RATING.RT_ID).update(RATING)
            .then((res) => {
                this.appService.toastMsg('Rating updated success', 3000);
            })
    }

    // LOCATION CRUD

    readLocations() {
        let LOCATIONS = [];
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('LOCATIONS').get()
                .then((qSnap) => {
                    qSnap.forEach(doc => {
                        let LOCATION = <iLocation>doc.data();
                        LOCATIONS.push(LOCATION);
                    })
                })
                .then(() => {
                    resolve({ MSG: 'success', LOCATIONS: LOCATIONS })
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    // SEARCH GUIDE WITH CONDITION
    searchGuides() {

    }

    // from: 201807151200-201807151530
    getGuidesAvailableWithTimeFrame(START_TIME: number, END_TIME: number, LOC: iLocation) {
        console.log(START_TIME, END_TIME);
        // firebase.firestore().collection('BOOKINGTIMES')
        // .where('B_LOCATION.L_CITY','==', LOC.L_CITY)
        // // .where('U_GUIDE_STAT', '==', 'VERIFIED')
        // .where('BT_TIME_START','<',END_TIME)
        // // .where('BT_TIME_START','<',START_TIME)

        // .get()
        // .then((qSnap)=>{
        //     qSnap.forEach(doc=>{
        //         console.log(doc.data())
        //     })
        // })

        return new Promise((resolve, reject) => {
            firebase.firestore().collection('USERS/')
                .where('U_LOCATION.L_ID', '==', LOC.L_ID)
                .where('U_GUIDE_STAT', '==', 'VERIFIED')
                .get()
                .then((qSnap) => {
                    let USERS = [];
                    qSnap.forEach(doc => {
                        let USER = <iUser>doc.data();
                        console.log(USER)
                        if (USER.U_BOOKED_TIME) {
                            let isAvailable = true;
                            Object.keys(USER.U_BOOKED_TIME).forEach(KEY => {
                                console.log(KEY);
                                if (KEY > START_TIME.toString() && KEY < END_TIME.toString()) {
                                    isAvailable = false;
                                }

                            })
                            if (isAvailable) {
                                USERS.push(USER);
                            }

                        }
                    })

                    console.log(USERS);
                    setTimeout(() => {
                        resolve({ MSG: 'success', GUIDES: USERS });
                    }, 2000);
                })
                .catch((err) => { reject(err) })
        })
    }



    //     createAdminWithExistingAccount(EMAIL: string, ROLE: string, SHOP_ID: string) {
    //         console.log(EMAIL, ROLE, SHOP_ID);
    //         return new Promise((resolve, reject) => {
    //             this.afService.getListWithCondition('UserProfiles/', 'PROFILE_EMAIL', EMAIL, 1).subscribe((data: any) => {
    //                 console.log(data);
    //                 if (data.length > 0) {
    //                     // 1. get USER_ID from email
    //                     let USER_ID = data[0].$key;
    //                     console.log(USER_ID);
    //                     // 1.1 get current owner of uid if already manage this shop or not
    //                     this.dbService.getListReturnPromise_ArrayOfData('Admins/' + USER_ID).then((list: string[]) => {
    //                         console.log(list);
    //                         let index = list.indexOf(SHOP_ID);
    //                         if (index < 0) {
    //                             // not manage shop yet
    //                             let DATA = {
    //                                 UID: USER_ID,
    //                                 ROLE: ROLE
    //                             };
    //                             console.log(DATA);
    //                             // 2. insert into AdminsOfShop
    //                             this.dbService.insertElementIntoArray('AdminsOfShop/' + SHOP_ID, DATA)
    //                                 .then((res) => {
    //                                     console.log('add AdminsOfShop success');
    //                                 })
    //                                 .then(() => {
    //                                     // 3. insert into Admins/UID/[Shop_list]
    //                                     return this.dbService.insertElementIntoArray('Admins/' + USER_ID, SHOP_ID)
    //                                 })
    //                                 .then(() => {
    //                                     console.log('add Admins success');
    //                                     resolve();
    //                                 })
    //                                 .catch((err) => {
    //                                     console.log('Fail:', err);
    //                                 })
    //                         } else {
    //                             reject({ message: 'This user already manages this shop' })
    //                         }
    //                     })
    //                 } else {
    //                     reject({ message: 'email is not registered yet, or profile not updated yet' })
    //                 }
    //             })
    //         })
    //     }

    //     removeAdminOfUserFromShop(SHOP_ID, ADMIN, USER_ID) {
    //         return new Promise((resolve, reject) => {
    //             this.dbService.getListReturnPromise_ArrayOfData('AdminsOfShop/' + SHOP_ID).then((admins: any[]) => {
    //                 console.log(admins);
    //                 let index = admins.findIndex(x => x.UID === USER_ID);
    //                 console.log(index);
    //                 if (index < 0) {
    //                     // not exist
    //                     console.log('item not found');
    //                 } else {
    //                     admins.splice(index, 1);
    //                     console.log(admins);
    //                     this.dbService.insertAnObjectAtNode('AdminsOfShop/' + SHOP_ID, admins)
    //                 }
    //             })
    //                 .then(() => {
    //                     this.dbService.getListReturnPromise_ArrayOfData('Admins/' + USER_ID).then((shop_list: any[]) => {
    //                         console.log(shop_list);
    //                         let index = shop_list.indexOf(SHOP_ID);
    //                         if (index < 0) {
    //                             // not exist
    //                             console.log('item not found');
    //                             resolve();
    //                         } else {
    //                             shop_list.splice(index, 1);
    //                             this.dbService.insertAnObjectAtNode('Admins/' + USER_ID, shop_list).then(() => {
    //                                 console.log('Admins/' + USER_ID, 'updated');
    //                                 resolve();
    //                             })

    //                         }
    //                     })
    //                 })
    //                 .catch((err) => {
    //                     reject(err);
    //                 })


    //             // // remove from AdminsOfShop
    //             // this.dbService.removeElementFromArray('AdminsOfShop/' + SHOP_ID, ADMIN)
    //             //     .then((ress) => {
    //             //         console.log(ress);
    //             //         // remove from Admins/UID/[list]
    //             //         return this.dbService.removeElementFromArray('Admins/' + USER_ID, SHOP_ID);
    //             //     })
    //             //     .then((res) => {
    //             //         console.log(res);
    //             //         resolve();
    //             //     })
    //             //     .catch((err) => {
    //             //         console.log(err);
    //             //         reject(err);
    //             //     })
    //         })
    //     }

    //     // PROFILE - CREATE - READ - UPDATE - DELETE

    //     createProfile(PROFILE: iProfile){
    //         return this.dbService.updateAnObjectAtNode('UserProfiles/'+PROFILE.PROFILE_UID, PROFILE)
    //     }

    // //-------------------------------------------------
    // //        FOR  SHOP
    // //
    // //----- SHOP CREATE - READ - UPDATE - DELETE -----
    // createNewShop(SHOP1: iShop, images: string[]) {
    //     let SHOP = SHOP1;
    //     // let USER: iUser = null;
    //     // var SHOP_ID: string = null;
    //     // var URLS: string[] = [];
    //     return new Promise((resolve, reject) => {

    //         firebase.firestore().collection('SHOPS').add(SHOP)
    //             .then((res) => {
    //                 SHOP.SHOP_ID = res.id;
    //                 console.log('Shop added', SHOP, SHOP.SHOP_ID, res.path);
    //                 // SHOP_ID = res.id;

    //                 // 1. update shopID

    //                 // res.update({ SHOP_ID: SHOP.SHOP_ID });

    //                 // 2. upload and update images
    //                 let pro1 = this.dbService.uploadBase64Images2FBReturnPromiseWithArrayOfURL('SIMG/' + SHOP.SHOP_ID, images, SHOP.SHOP_ID)
    //                     .then((urls) => {
    //                         console.log('uploading images ...');
    //                         // 3. update SHOP_IMAGES
    //                         SHOP.SHOP_IMAGES = urls;
    //                         res.set(SHOP);
    //                     })
    //                     .catch((err) => {
    //                         reject(err);
    //                     })

    //                 // 3. update SHOPS/SHOP_ID/ADMINS/UID { EMAIL: email, ROLE: role, UID: uid }
    //                 let pro2 = firebase.firestore().doc('SHOPS/' + SHOP.SHOP_ID + '/ADMINS/' + SHOP.SHOP_OWNER)
    //                     .set({
    //                         EMAIL: firebase.auth().currentUser.email,
    //                         ROLE: 'Manager',
    //                         UID: SHOP.SHOP_OWNER
    //                     })
    //                     .catch((err) => {
    //                         reject(err);
    //                     })

    //                 // // 4. update USERS/UID/USER { U_AD_SHOPS}
    //                 // let pro3 = firebase.firestore().doc('USERS/' + SHOP.SHOP_OWNER).get()
    //                 //     .then((docSnap) => {
    //                 //         USER = <iUser>docSnap.data()
    //                 //         if (USER.U_AD_SHOPS || typeof(USER.U_AD_SHOPS) !== 'undefined') {
    //                 //             USER.U_AD_SHOPS.push({ ROLE: 'Manager', SHOP_ID: SHOP.SHOP_ID });
    //                 //         } else {
    //                 //             USER.U_AD_SHOPS = [{ ROLE: 'Manager', SHOP_ID: SHOP.SHOP_ID }];
    //                 //         }
    //                 //         firebase.firestore().doc('USERS/' + SHOP.SHOP_OWNER)
    //                 //             .set(USER)
    //                 //             .then((res) => {
    //                 //                 console.log('Add Manager role done');
    //                 //             })
    //                 //             .catch((err) => {
    //                 //                 reject(err);
    //                 //             })
    //                 //     })
    //                 //     .catch((err) => {
    //                 //         reject(err);
    //                 //     })


    //                 // 4. add USERS/UID/AD_SHOPS/SHOP_ID/ { ROLE: role, SHOP_ID: shop_ID }
    //                 let pro3 = firebase.firestore().doc('USERS/' + SHOP.SHOP_OWNER + '/AD_SHOPS/' + SHOP.SHOP_ID).set({
    //                     ROLE: 'Manager',
    //                     SHOP_ID: SHOP.SHOP_ID
    //                 }).catch((err) => {
    //                     reject(err);
    //                 })

    //                 // 5. Set USER.U_AD_SHOPS = true;
    //                 let pro4 = firebase.firestore().doc('USERS/' + SHOP.SHOP_OWNER).update({
    //                     U_AD_SHOPS: true
    //                 })

    //                 // // 4. 

    //                 // // 2. upload image;

    //                 // let pro1x = this.dbService.uploadBase64Images2FBReturnPromiseWithArrayOfURL('SIMG/' + SHOP.SHOP_ID, images, SHOP.SHOP_ID)
    //                 //     .then((urls) => {
    //                 //         console.log('uploading images ...');
    //                 //         // 3. update SHOP_IMAGES
    //                 //         URLS = urls;
    //                 //         return res.update({ SHOP_IMAGES: URLS })
    //                 //     })
    //                 //     .then(() => {
    //                 //         console.log('3. update SHOP_IMAGES done')

    //                 //         // 4. update USER admin
    //                 //         firebase.firestore().doc('USERS/' + SHOP.SHOP_OWNER).get().then((docSnap) => {
    //                 //             let USER = <iUser>docSnap.data()
    //                 //             if (USER.U_AD_SHOPS) {
    //                 //                 USER.U_AD_SHOPS.push({ ROLE: 'Manager', SHOP_ID: SHOP.SHOP_ID });
    //                 //             } else {
    //                 //                 USER.U_AD_SHOPS[0] = { ROLE: 'Manager', SHOP_ID: SHOP.SHOP_ID };
    //                 //             }
    //                 //             // add ROLE into USER
    //                 //             firebase.firestore().doc('USERS/' + SHOP.SHOP_OWNER)
    //                 //                 .set(USER, { merge: true })
    //                 //                 .then((res) => {
    //                 //                     console.log('Add Manager role done');
    //                 //                 })
    //                 //         })
    //                 //     })
    //                 //     .catch((err) => {
    //                 //         console.log(err);
    //                 //     })
    //                 // // insert SHOPS/SHOP_ID/ADMINS/USER_ID/
    //                 // let pro2 = firebase.firestore().doc('SHOPS/' + SHOP.SHOP_ID + '/ADMINS/' + SHOP.SHOP_OWNER).set({
    //                 //     EMAIL: ,
    //                 //     ROLE: 'Manager',
    //                 //     UID: SHOP.SHOP_OWNER
    //                 // })

    //                 Promise.all([pro1, pro2, pro3, pro4])
    //                     .then((res) => {
    //                         console.log('NEW SHOP', SHOP);
    //                         resolve({ message: 'add new shop successfull', SHOP_ID: SHOP.SHOP_ID });
    //                     })
    //                     .catch((err) => {
    //                         reject(err);
    //                     })
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             })


    //         // //1. Insert new Shop
    //         // this.dbService.insertOneNewItemReturnPromise(SHOP, 'Shops')
    //         //     .then((res) => {
    //         //         console.log('1. Insert new shop')
    //         //         console.log(res, res.key);
    //         //         let SHOP_ID = res.key;
    //         //         // 2. Update SHOP_ID
    //         //         let pro1 = this.dbService.updateAnObjectAtNode('Shops/' + SHOP_ID + '/SHOP_ID', SHOP_ID)
    //         //             .then(() => { '2. Update SHOP_ID' });

    //         //         // 3. upload images
    //         //         let name = SHOP_ID;
    //         //         let pro2 = this.dbService.uploadBase64Images2FBReturnPromiseWithArrayOfURL('ShopImages/' + SHOP_ID, images, name)
    //         //             .then((urls) => {
    //         //                 console.log('3. upload images');

    //         //                 // 4. update SHOP_IMAGES
    //         //                 return this.dbService.updateAnObjectAtNode('Shops/' + SHOP_ID + '/SHOP_IMAGES', urls)
    //         //             })
    //         //             .then(() => { console.log('4. update SHOP_IMAGES') });

    //         //         // 5. add manager role to creater
    //         //         let pro3 = this.appService.createAdmin(SHOP_ID, SHOP.SHOP_OWNER, 'manager')
    //         //             .then(() => { console.log('5. add manager role to creater') });

    //         //         // 6. add admin right to user
    //         //         let pro4 = this.dbService.insertElementIntoArray('Admins/' + SHOP.SHOP_OWNER, SHOP_ID)
    //         //             .then(() => { console.log('6. add admin right to user') });

    //         //         // 7. add ShopsLOCATION
    //         //         let DATA = {
    //         //             ID: SHOP_ID,
    //         //             // LOC: SHOP.SHOP_LOCATION
    //         //             lat: SHOP.SHOP_LOCATION.lat,
    //         //             lng: SHOP.SHOP_LOCATION.lng
    //         //         }
    //         //         let pro5 = this.dbService.insertAnObjectAtNode('ShopsLOCATION/' + SHOP_ID, DATA)
    //         //             .then(() => { console.log('7. add ShopsLOCATION') });

    //         //         Promise.all([pro1, pro2, pro3, pro4, pro5])
    //         //             .then(() => {
    //         //                 resolve({ message: 'add new shop successfull', SHOP_ID: SHOP_ID });
    //         //             })
    //         //             .catch((err) => {
    //         //                 reject(err);
    //         //             })
    //         //     })
    //         //     .catch((err) => {
    //         //         reject(err);
    //         //     })

    //     })
    // }

    // // UPDATE SHOP
    // updateShop(SHOP: iShop) {
    //     // 1: update Shop info
    //     let pro1 = firebase.firestore().doc('SHOPS/' + SHOP.SHOP_ID).set(SHOP, { merge: true })

    //     // let pro1 = this.dbService.updateAnObjectAtNode('Shops/' + SHOP.SHOP_ID, SHOP);

    //     // // 2: update Location of Shop
    //     // let data = {
    //     //     ID: SHOP.SHOP_ID,
    //     //     lat: SHOP.SHOP_LOCATION.lat,
    //     //     lng: SHOP.SHOP_LOCATION.lng
    //     // }
    //     // let pro2 = this.dbService.updateAnObjectAtNode('ShopsLOCATION/' + SHOP.SHOP_ID, data);
    //     return Promise.all([pro1])
    //         .then(() => {
    //             this.appService.toastMsg('Update successfully', 3000);
    //         })
    //         .catch((err) => {
    //             this.appService.toastMsg('Error occur', 3000);
    //         })
    // }

    // //     deleteShop(SHOP: iShop) {
    // //         // delete SHOP

    // //         // Delete Shop Image

    // //         // Delete Shop's item

    // //         // Delete Shop's admin

    // //     }


    // // ADMIN OF SHOP: CRUD
    // createAdmin(SHOP_ID: string, USER_ID: string, role: string) {
    //     let data = {
    //         UID: USER_ID,
    //         ROLE: role,
    //     }
    //     return this.dbService.insertElementIntoArray('AdminsOfShop/' + SHOP_ID, data);
    // }

    // //----- ITEMS CREATE - READ - UPDATE - DELETE -----

    // // CREATE ITEM
    // createItem(ITEM: iItem, IMAGES: string[]) {
    //     return new Promise((resolve, reject) => {
    //         var ITEM_New = ITEM;
    //         // 1. Create ITEMS/ITEM_ID/{}
    //         firebase.firestore().collection('ITEMS').add(ITEM)
    //             .then((res) => {
    //                 let ITEM_ID = res.id;
    //                 ITEM_New.ITEM_ID = ITEM_ID;
    //                 console.log('Item added ', ITEM_ID, res.path);

    //                 if (ITEM.ITEM_IMG_SHARED) {
    //                     // 2. SHOPS/SHOP_ID/ITEMS/ITEM_ID/{}
    //                     firebase.firestore().doc('SHOPS/' + ITEM.ITEM_SHOP_ID + '/ITEMS/' + ITEM_ID).set(ITEM_New)
    //                         .then(() => {
    //                             console.log('Item inserted into Shop successfully');
    //                             resolve();
    //                         })
    //                         .catch((err) => {
    //                             reject(err);
    //                         })
    //                 } else {
    //                     // UPLOAD NEW IMAGES with ITEM_ID+ TIMESTAMP
    //                     let ID = ITEM_ID + Date.now();
    //                     this.dbService.uploadBase64Images2FBReturnPromiseWithArrayOfURL('IMAGES/' + ID, IMAGES, ID)
    //                         .then((urls) => {
    //                             ITEM_New.ITEM_IMAGES = urls;
    //                             // UPDATE ITEMS/ITEM_ID/{}
    //                             return res.update({ ITEM_IMAGES: urls, ITEM_ID: ITEM_ID });
    //                         })
    //                         .then(() => {
    //                             console.log('Item updated done')
    //                             // UPDATE SHOPS/SHOP_ID/ITEMS/ITEM_ID/{}
    //                             return firebase.firestore().doc('SHOPS/' + ITEM.ITEM_SHOP_ID + '/ITEMS/' + ITEM_ID).set(ITEM_New)
    //                         })
    //                         .then(() => {
    //                             console.log('Item inserted into Shop successfully');
    //                             let IMAGE: iImage = {
    //                                 IMG_URLS: ITEM_New.ITEM_IMAGES,
    //                                 IMG_KEYWORD: ITEM_New.ITEM_NAME_EN + ' ' + ITEM_New.ITEM_NAME_LOCAL,
    //                                 IMG_ID: ID,
    //                                 IMG_SHARE_STAT: 'NEW',
    //                                 IMG_TIMESTAMP: Date.now()
    //                             }
    //                             // update DB/IMAGES/IMAGE_ID/{IMAGE}
    //                             return firebase.firestore().doc('IMAGES/' + ID).set(IMAGE)

    //                         })
    //                         .then(() => {
    //                             resolve();
    //                         })
    //                         .catch((err) => {
    //                             reject(err);
    //                         })
    //                 }
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             })
    //     })
    // }

    // /**
    //  * Add ITEM into ITEMS/ITEM_ID/{ITEM}
    //  * Upload image to 
    //  */

    // updateItem(ITEM: iItem) {
    //     let pro1 = firebase.firestore().doc('SHOPS/' + ITEM.ITEM_SHOP_ID + '/ITEMS/' + ITEM.ITEM_ID).set(ITEM);
    //     let pro2 = firebase.firestore().doc('ITEMS/' + ITEM.ITEM_ID).set(ITEM);
    //     return Promise.all([pro1, pro2]);
    // }

    // deleteItem(ITEM: iItem) {
    //     return new Promise((resolve, reject) => {
    //         let pro1 = firebase.firestore().doc('SHOPS/' + ITEM.ITEM_SHOP_ID + '/ITEMS/' + ITEM.ITEM_ID).delete();
    //         let pro2 = firebase.firestore().doc('ITEMS/' + ITEM.ITEM_ID).delete();
    //         let index1 = ITEM.ITEM_IMAGES[0].indexOf('firebase');
    //         let index2 = ITEM.ITEM_IMAGES[1].indexOf('firebase');
    //         if (!ITEM.ITEM_IMG_SHARED && index1 >= 0) {
    //             this.dbService.deleteFileFromFireStorageWithHttpsURL(ITEM.ITEM_IMAGES[0]).catch((err) => {
    //                 reject(err);
    //             })
    //         }
    //         if (!ITEM.ITEM_IMG_SHARED && index2 >= 0) {
    //             this.dbService.deleteFileFromFireStorageWithHttpsURL(ITEM.ITEM_IMAGES[1]).catch((err) => {
    //                 reject(err);
    //             })
    //         }
    //         Promise.all([pro1, pro2]).then(() => {
    //             resolve();
    //         })
    //             .catch((err) => {
    //                 reject(err);
    //             })
    //     })
    // }

    // getItemsFromShop(SHOP_ID: string) {
    //     return new Promise((resolve, reject) => {
    //         let ITEMS: iItem[] = [];
    //         // firebase.firestore().collection('SHOPS/' + SHOP_ID + '/ITEMS').get().then((qSnap) => {
    //         //     qSnap.docs.forEach((doc) => {
    //         //         if (doc.exists) {
    //         //             ITEMS.push(<iItem>doc.data());
    //         //         }
    //         //     })
    //         //     resolve({ ITEMS: ITEMS })
    //         // })
    //         //     .catch((err) => {
    //         //         reject((err));
    //         //     })
    //         firebase.firestore().collection('ITEMS')
    //             .where('ITEM_SHOP_ID', '==', SHOP_ID)
    //             .get()
    //             .then((qSnap) => {
    //                 qSnap.docs.forEach((doc) => {
    //                     ITEMS.push(<iItem>doc.data());
    //                 })
    //                 resolve({ ITEMS: ITEMS })
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             })
    //     })
    // }

    // //     createItem(SHOP_ID: string, ITEM: iItem, imagesData: any[]) {
    // //         let isIMGShared = ITEM.ITEM_IMG_SHARED;
    // //         if (isIMGShared) {
    // //             return new Promise((resolve, reject) => {
    // //                 // 1. Create new item
    // //                 this.dbService.insertOneNewItemReturnPromise(ITEM, 'Items/')
    // //                     .then((res: any) => {
    // //                         console.log(res);
    // //                         let ITEM_ID = res.key;
    // //                         //2. update Key
    // //                         let pro1 = this.dbService.updateAnObjectAtNode('Items/' + ITEM_ID + '/ITEM_ID', ITEM_ID);

    // //                         //3. update shop's item_ID
    // //                         let pro2 = this.dbService.insertElementIntoArray('Shop_Items/' + SHOP_ID, ITEM_ID);
    // //                         Promise.all([pro1, pro2])
    // //                             .then(() => {
    // //                                 resolve();
    // //                             })
    // //                             .catch((err) => { reject(err) });
    // //                     })
    // //                     .catch((err) => { reject(err) })
    // //             })
    // //         } else {
    // //             return new Promise((resolve, reject) => {
    // //                 // 1. Create new item
    // //                 this.dbService.insertOneNewItemReturnPromise(ITEM, 'Items/')
    // //                     .then((res: any) => {
    // //                         console.log(res);
    // //                         let ITEM_ID = res.key;
    // //                         //2. update Key
    // //                         let pro1 = this.dbService.updateAnObjectAtNode('Items/' + ITEM_ID + '/ITEM_ID', ITEM_ID);

    // //                         //3. update shop's item_ID
    // //                         let pro2 = this.dbService.insertElementIntoArray('Shop_Items/' + SHOP_ID, ITEM_ID);

    // //                         //4. upload image
    // //                         // let name = new Date().getTime().toString();
    // //                         let name = ITEM_ID;
    // //                         console.log(imagesData);
    // //                         let pro3 = this.dbService.uploadBase64Images2FBReturnPromiseWithArrayOfURL('ItemImages/' + ITEM_ID, imagesData, name)
    // //                             .then((urls) => {
    // //                                 console.log('upload item images --> done');
    // //                                 console.log(urls);
    // //                                 return this.dbService.updateAnObjectAtNode('Items/' + ITEM_ID + '/ITEM_IMAGES', urls);
    // //                             })
    // //                         Promise.all([pro1, pro2, pro3]).then(() => {
    // //                             resolve();
    // //                         })
    // //                             .catch((err) => { reject(err) });
    // //                     })
    // //                     .catch((err) => { reject(err) })
    // //             })
    // //         }
    // //     }

    // //     updateItem(ITEM: iItem) {
    // //         console.log(ITEM);
    // //         this.dbService.updateAnObjectAtNode('Items/' + ITEM.ITEM_ID, ITEM)
    // //             .then((res) => {
    // //                 this.appService.toastMsg('Update successfully', 3000);
    // //             })
    // //             .catch((err) => {
    // //                 this.appService.toastMsg('Error occur', 3000);
    // //             })
    // //     }

    // //     deleteItem(ITEM: iItem) {
    // //         // delete Shop_Items/SHOP_ID/ITEM_ID
    // //         this.dbService.removeElementFromArray('Shop_Items/'+ ITEM.ITEM_SHOP_ID,ITEM.ITEM_ID)
    // //         .then((res)=>{
    // //             console.log(res);
    // //             console.log('Item ID', ITEM.ITEM_ID, ' just remove from shop');
    // //         })
    // //         .catch((err)=>{ console.log( err)});
    // //         // Delete Items/ITEM_ID
    // //         this.dbService.updateAnObjectAtNode('Items/'+ITEM.ITEM_ID, null)
    // //         .then((res)=>{ 
    // //             console.log( res);
    // //             console.log('Item was deleted');
    // //         })
    // //         .catch((err)=>{ console.log( err )});
    // //         // Delete storage if have images
    // //         let index1 = ITEM.ITEM_IMAGES[0].indexOf('ItemImages');
    // //         console.log(index1);
    // //         // if(index1<0){
    // //         //     this.dbService.deleteFilesFromFireStorageWithHttpsURL(ITEM.ITEM_IMAGES)
    // //         //     .then((res)=>{
    // //         //         console.log(res);
    // //         //         console.log('Images deleted from storage');
    // //         //     })
    // //         //     .catch((err)=>{
    // //         //         console.log(err);
    // //         //     })
    // //         // }


    // //     }

    // //     cloneItem(ITEM: iItem, SourceShopID, DestShopID) {
    // //         return new Promise((resolve, reject) => {
    // //             console.log('start cloning..');
    // //             ITEM['ITEM_SHOP_ID'] = DestShopID;
    // //             this.dbService.insertOneNewItemReturnPromise(ITEM, 'Items/')
    // //                 .then((res: any) => {
    // //                     console.log(res);
    // //                     let KEY = res.key;
    // //                     // update item with new key
    // //                     let pro1 = this.dbService.updateAnObjectAtNode('Items/' + KEY + '/ITEM_ID', KEY)
    // //                         .then((res) => {
    // //                             console.log('update item with new key... done')
    // //                         })
    // //                     // insert key to Shop_Items/
    // //                     let pro2 = this.dbService.insertElementIntoArray('Shop_Items/' + DestShopID, KEY)
    // //                         .then((res) => {
    // //                             console.log('insert key to Shop_Items... done');
    // //                         })
    // //                     Promise.all([pro1, pro2]).then((res) => {
    // //                         console.log(res);
    // //                         resolve({ result: 'cloning successful' });
    // //                     })
    // //                         .catch((err) => {
    // //                             console.log(err);
    // //                             reject(err);
    // //                         })
    // //                 })
    // //                 .catch((err) => {
    // //                     reject(err);
    // //                 })
    // //         })
    // //     }


    // // ISSUE
    // createIssue(ISSUE: iIssue) {
    //     return firebase.firestore().collection('ISSUES').add(ISSUE).then((res) => {
    //         res.update({
    //             ISSUE_ID: res.id
    //         })
    //     })
    //     // return this.dbService.insertOneNewItemReturnPromise(issue, 'Issues/')
    //     //     .then((res) => {
    //     //         console.log(res);
    //     //     })
    //     //     .catch((err) => {
    //     //         console.log(err);
    //     //     })
    // }

    // readIssues() {
    //     // let ISSUES = [];
    //     return firebase.firestore().collection('ISSUES').get()
    //     // .then((qSnap)=>{
    //     //     qSnap.docs.forEach((doc)=>{
    //     //         ISSUES.push(doc.data());
    //     //     })
    //     // })
    //     // return this.dbService.getListReturnPromise_ArrayOfObjectWithKey_Data('Issues/')
    // }

    // updateIssue(ISSUE: iIssue) {
    //     return firebase.firestore().doc('ISSUES/' + ISSUE.ISSUE_ID).set(ISSUE);
    //     // return this.dbService.updateAnObjectAtNode('Issues/' + KEY, ISSUE)
    // }

    // deleteIssue(ISSUE: iIssue) {
    //     return firebase.firestore().doc('ISSUES/' + ISSUE.ISSUE_ID).delete();
    //     // this.dbService.removeAnObjectAtNode('Issues/' + ISSUE_key);
    // }

    // //     // ORDER
    // //     createOrder(ORDER: iOrder, SHOP_ID, USER_ID, DATE) {
    // //         return new Promise((resolve, reject) => {
    // //             // 1. Insert item to OrdersOfShop
    // //             this.afService.addItem2List('OrdersOfShop/' + SHOP_ID + '/' + DATE, ORDER)
    // //                 .then((res) => {
    // //                     // 2. update ITEM_ID into OrdersOfShop/SHOP_ID/ITEM_ID
    // //                     let ORDER_ID = res.key;
    // //                     let pro1 = this.afService.updateObjectData('OrdersOfShop/' + SHOP_ID + '/' + DATE + '/' + ORDER_ID + '/ORDER_ID', ORDER_ID)
    // //                         .then((resp) => {
    // //                             console.log('Order sending success');
    // //                         })
    // //                     // 3. add to array of Orders of user
    // //                     let pro2 = this.dbService.insertElementIntoArray('OrdersOfUser/' + USER_ID + '/' + DATE, 'OrdersOfShop/' + SHOP_ID + '/' + DATE + '/' + ORDER_ID)
    // //                         .then((res) => {
    // //                             console.log('add to array of Orders of user', res);
    // //                         })
    // //                     //4. insert ActiveOrdersOfUser/USER_ID/SHOP_ID
    // //                     let ActiveORDER = ORDER
    // //                     ActiveORDER['ORDER_ID'] = ORDER_ID;
    // //                     let pro3 = this.dbService.insertAnObjectAtNode('ActiveOrdersOfUser/' + USER_ID + '/' + SHOP_ID + '/' + ORDER_ID, ActiveORDER)
    // //                         .then((res) => console.log('active orders of user updated'));

    // //                     Promise.all([pro1, pro2, pro3])
    // //                         .then((res) => {
    // //                             console.log('done', res);
    // //                             resolve({ created_ORDER_ID: ORDER_ID });
    // //                         })
    // //                         .catch((err) => {
    // //                             console.log('error:', err)
    // //                             reject(err);
    // //                         })
    // //                 })
    // //         })
    // //     }

    // //     updateOrder(ORDER_LIST, TABLE, Order2Update) {
    // //         return new Promise((resolve, reject) => {
    // //             console.log(ORDER_LIST);
    // //             console.log(Order2Update);
    // //             Order2Update.ORDER_LIST = ORDER_LIST;
    // //             Order2Update.ORDER_STATUS = 'UPDATED';
    // //             Order2Update.ORDER_TABLE = TABLE;
    // //             let DATE = Order2Update.ORDER_DATE_CREATE.substr(0, 10);
    // //             // update OrdersOfShop
    // //             let pro1 = this.afService.updateObjectData('OrdersOfShop/' + Order2Update.ORDER_SHOP_ID + '/' + DATE + '/' + Order2Update.ORDER_ID, Order2Update);
    // //             // update ActiveOrdersOfUser
    // //             let pro2 = this.afService.updateObjectData('ActiveOrdersOfUser/' + Order2Update.ORDER_USER_ID + '/' + Order2Update.ORDER_SHOP_ID + '/' + Order2Update.ORDER_ID, Order2Update);
    // //             Promise.all([pro1, pro2]).then((res) => {
    // //                 resolve({ result: 'OK' });
    // //             })
    // //                 .catch((err) => { reject(err) });
    // //         })
    // //     }

    // //     deleteOrder() {

    // //     }


    // //     // FAVORITE CREATE, READ, UPDATE, DELETE

    // // IMAGE CRUD

    // createImage(IMAGE: iImage) {
    //     return new Promise((resolve, reject) => {
    //         firebase.firestore().collection('IMAGES').add({
    //             IMG_KEYWORD: IMAGE.IMG_KEYWORD
    //         })
    //             .then((res) => {
    //                 console.log(res);
    //                 this.dbService.uploadBase64Images2FBReturnPromiseWithArrayOfURL('IMAGES/' + res.id, IMAGE.IMG_URLS, res.id)
    //                     .then((urls) => {
    //                         // res.update({IMG_URLS: urls})
    //                         res.update({
    //                             IMG_URLS: urls,
    //                             IMG_ID: res.id
    //                         })
    //                             .then(() => {
    //                                 resolve();
    //                             }).catch((err) => { reject(err) })
    //                     }).catch((err) => { reject(err) })
    //             }).catch((err) => { reject(err) })
    //     })
    // }

    // // READ IMAGES
    // getSharedImages() {
    //     firebase.firestore().collection('IMAGES').get().then((qSnap) => {
    //         qSnap.docs.forEach((doc) => {
    //             console.log(doc.data());
    //         })
    //     })
    // }
    // //     // SAMPLE-IMAGE 
    // //     // Create
    // //     createImage(IMAGE: iImage) {
    // //         return this.dbService.insertOneNewItemReturnPromise(IMAGE, 'Images/')
    // //     }

    // //     // Read
    // //     getImages() {
    // //         return this.dbService.getListReturnPromise_ArrayOfObjectWithKey_Data('Images');
    // //     }

    // //     // Read & result return async
    // //     getImagesAsync() {
    // //         return this.afService.getList('Images');
    // //     }

    // //     // Update
    // //     updateImage(IMAGE: iImage, IMG_ID) {
    // //         return this.dbService.updateAnObjectAtNode('Images/' + IMG_ID, IMAGE)
    // //     }

    // //     // Delete


}
