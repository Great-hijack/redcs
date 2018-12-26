import { Injectable } from '@angular/core';
import { iUsr } from '../interfaces/usr.interface';
@Injectable()
export class LoginModel {
    //index 0: en; 1: vn
    tittle: any = ["Login", "Đăng nhập"];
    email: any = ["Email", "Email"];
    password: any = ["Password", "Mật khẩu"];
    btnLogin: any = ["Login", "Đăng nhập"];
    btnCancel: any = ["Cancel", "Huỷ bỏ"];


    constructor(
        // public navCtrl: NavController,
        // private afService: AngularFireService
        //private appService: AppService

    ) {
        this.tittle = ["Login", "Đăng nhập"];
        this.email = ["Email", "Email"];
        this.password = ["Password", "Mật khẩu"];
        this.btnLogin = ["Login", "Đăng nhập"];
        this.btnCancel = ["Cancel", "Huỷ bỏ"];
    }
}