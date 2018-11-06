import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasePrecheckPage } from './case-precheck';

@NgModule({
  declarations: [
    CasePrecheckPage,
  ],
  imports: [
    IonicPageModule.forChild(CasePrecheckPage),
  ],
})
export class CasePrecheckPageModule {}
