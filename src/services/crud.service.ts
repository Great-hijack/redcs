import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { LocalService } from './local.service';
import firebase from 'firebase';
import 'firebase/firestore';
import { iUsr } from '../interfaces/usr.interface';
import { iPatient} from '../interfaces/patient.interface';
import { iLoc } from '../interfaces/loc.interface';
import { MailService } from './mail.service';
@Injectable()

export class CrudService {

    constructor(
        private appService: AppService,
        private localService: LocalService,
        private mailService: MailService
    ) { }

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

    usrDelete(USR: iUsr) {
        return firebase.firestore().doc('USRS/' + USR.U_ID).delete();
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

    patientDelete(PATIENT_ID: string) {
        return firebase.firestore().doc('PATIENTS/' + PATIENT_ID).delete();
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

    patientsGetAllOfServiceProviderWithState(SVP_ID: string, PAT_STATE: string) {
        return firebase.firestore().collection('PATIENTS')
            .where('PAT_SVCPRO_ID', '==', SVP_ID)
            .where('PAT_STATE', '==', PAT_STATE)
            .get();
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



    patientsGetAllsInvitedInDateOfServiceProvider(DATE: string, SVP_ID: string) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('PATIENTS')
                .where('PAT_INV_FROM', '==', DATE)
                .where('PAT_STATE', '==', 'INVITED')
                .where('PAT_SVCPRO_ID', '==', SVP_ID)
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

    casesGetWithState(STATE: string, USER: iUsr) {

        switch (USER.U_ROLE) {
            case 'MoveAbility':
                return firebase.firestore().collection('PATIENTS')
                    .where('PAT_STATE', '==', STATE)
                    .where('PAT_MOVEABILITY', '==', 'MA1')
                    .get();
            case 'Referral':
                return firebase.firestore().collection('PATIENTS')
                    .where('PAT_STATE', '==', STATE)
                    .where('PAT_REFERRAL_ID', '==', USER.U_ID)
                    .get();
            case 'Referral Lead':
                return firebase.firestore().collection('PATIENTS')
                    .where('PAT_STATE', '==', STATE)
                    .where('PAT_REFLEAD_ID', '==', USER.U_ID)
                    .get();
            case 'Service Provider':
                return firebase.firestore().collection('PATIENTS')
                    .where('PAT_STATE', '==', STATE)
                    .where('PAT_SVCPRO_ID', '==', USER.U_ORG)
                    .get();
            default:
                break;
        }
    }

    getCasesOfUserWithStates(USER: iUsr, STATES: string[]) {
        // console.log(USER, STATES);
        return new Promise((resolve, reject) => {
            let PATIENTS = [];
            let Pros = Array(STATES.length);
            STATES.forEach((STATE, i) => {
                Pros[i] = this.casesGetWithState(STATE, USER)
                    .then(qSnap => {
                        let PATS = [];
                        qSnap.forEach(doc => {
                            let pat = <iPatient>doc.data();
                            // console.log(pat);
                            PATS.push(pat);
                        })
                        PATIENTS = PATIENTS.concat(PATS);
                    })

            })
            Promise.all(Pros)
                .then(res => {
                    console.log(res);
                    resolve({ PATIENTS: PATIENTS });
                })
                .catch(err => {
                    reject(err);
                })
        })

    }
}
