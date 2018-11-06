import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseCostPage } from './case-cost';

@NgModule({
  declarations: [
    CaseCostPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseCostPage),
  ],
})
export class CaseCostPageModule {}
