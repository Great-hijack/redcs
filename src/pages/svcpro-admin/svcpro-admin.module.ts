import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SvcproAdminPage } from './svcpro-admin';

@NgModule({
  declarations: [
    SvcproAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(SvcproAdminPage),
  ],
})
export class SvcproAdminPageModule {}
