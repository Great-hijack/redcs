import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailViewPage } from './user-detail-view';

@NgModule({
  declarations: [
    UserDetailViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailViewPage),
  ],
})
export class UserDetailViewPageModule {}
