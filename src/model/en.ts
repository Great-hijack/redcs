import { Injectable } from '@angular/core';
import { iUsr } from '../interfaces/usr.interface';
@Injectable()
export class EnModel {
        //index 0: en; 1: vn

        //moveability-admin
        title: any = "Moveability";
        btnCase: any="CASES";
        btnNewCase: any="NEW CASES"; 
        btnWattingList: any="WAITING LIST";
        btnAppointment: any="APPOINTMENT"; 
        btnLanguages: any="LANGUAGES"; 
        btnPrivacy: any="PRIVACY"; 
        btnBeneficiary: any="BENEFICIARY QUESTIONAIRE"; 
        btnTechnical: any="TECHNICAL ASSESSMENT"; 
        btnReport: any="REPORTING"; 
        btnExpense: any="EXPENSE"; 
        btnCombination: any="COMBINATION SEARCH"; 

        //referral-admin
        title_referral: any = "Referral";

    constructor(
        // public navCtrl: NavController,
        // private afService: AngularFireService
        //private appService: AppService
    ) { 
        
    }
}