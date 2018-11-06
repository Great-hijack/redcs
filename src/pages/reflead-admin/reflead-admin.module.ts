import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefleadAdminPage } from './reflead-admin';

@NgModule({
  declarations: [
    RefleadAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(RefleadAdminPage),
  ],
})
export class RefleadAdminPageModule {}
