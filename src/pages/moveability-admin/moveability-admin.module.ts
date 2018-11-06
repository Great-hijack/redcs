import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoveabilityAdminPage } from './moveability-admin';

@NgModule({
  declarations: [
    MoveabilityAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(MoveabilityAdminPage),
  ],
})
export class MoveabilityAdminPageModule {}
