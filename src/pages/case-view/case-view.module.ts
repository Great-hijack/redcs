import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseViewPage } from './case-view';

@NgModule({
  declarations: [
    CaseViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseViewPage),
  ],
})
export class CaseViewPageModule {}
