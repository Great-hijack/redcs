import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountRegisterPage } from './account-register';

@NgModule({
  declarations: [
    AccountRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountRegisterPage),
  ],
})
export class AccountRegisterPageModule {}
