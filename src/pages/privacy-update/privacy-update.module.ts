import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyUpdatePage } from './privacy-update';

@NgModule({
  declarations: [
    PrivacyUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyUpdatePage),
  ],
})
export class PrivacyUpdatePageModule {}
