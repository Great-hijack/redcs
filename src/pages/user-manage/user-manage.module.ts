import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserManagePage } from './user-manage';

@NgModule({
  declarations: [
    UserManagePage,
  ],
  imports: [
    IonicPageModule.forChild(UserManagePage),
  ],
})
export class UserManagePageModule {}
