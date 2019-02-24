import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseDetailViewPage } from './case-detail-view';

@NgModule({
  declarations: [
    CaseDetailViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseDetailViewPage),
  ],
})
export class CaseDetailViewPageModule {}
