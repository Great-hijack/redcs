import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReferralAdminPage } from './referral-admin';

@NgModule({
  declarations: [
    ReferralAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ReferralAdminPage),
  ],
})
export class ReferralAdminPageModule {}
