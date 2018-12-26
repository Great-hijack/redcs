import { Injectable } from '@angular/core';
import { LoginModel } from '../model/loginModel';
import { HomeModel } from '../model/homeModel';
import { EnModel } from '../model/en';
import { VnModel } from '../model/vn';

@Injectable()


export class LangService {
     index: any = '1';
     //login layout
     title: any;
     password: any;
     email: any;
     btnLogin: any;
     btnCancel: any;
     //login layout end

     //home layout
     title_home: any;
     btnContinue: any;
     btnSignOut: any;
     btnLoginHome: any;
     btnSignUp: any;
     //home layout end
     LangModel: any;

     constructor(
          private loginModel: LoginModel,
          private homeModel: HomeModel,
          // vnModel: VnModel,
          // enModel: EnModel,

     ) {
          //this.LangModel=enModel;
          //login model
          this.title = this.loginModel.tittle[this.index];
          this.password = this.loginModel.password[this.index];
          this.email = this.loginModel.email[this.index];
          this.btnLogin = this.loginModel.btnLogin[this.index];
          this.btnCancel = this.loginModel.btnCancel[this.index];

          //home model
          this.title_home = this.homeModel.tittle[this.index];
          this.btnContinue = this.homeModel.btnContinue[this.index];
          this.btnSignOut = this.homeModel.btnSignOut[this.index];
          this.btnLoginHome = this.homeModel.btnLogin[this.index];
          this.btnSignUp = this.homeModel.btnSignUp[this.index];

          switch (this.index) {
               case '0':
                    this.LangModel = VnModel;
                    break;
               case '1':
                    this.LangModel = EnModel;
                    break;
               default:
                    break;
          }

     }

}