import { Injectable } from '@angular/core';
import { iUsr } from '../interfaces/usr.interface';
@Injectable()
export class HomeModel {
        //index 0: en; 1: vn
        tittle: any = [];
        btnContinue: any=[];
        btnSignOut: any=[]; 
        btnLogin: any=[];
        btnSignUp: any=[]; 

    constructor(
        // public navCtrl: NavController,
        // private afService: AngularFireService
        //private appService: AppService
    ) { 
        this.tittle=["Home","Trang Chủ"];
        this.btnContinue=["Continue", "Tiếp tục"];
        this.btnSignOut=["Sign Out","Đăng xuất"];
        this.btnLogin=["Login","Đăng Nhập"];
        this.btnSignUp=["Sign Up","Đăng ký"];
    }
}