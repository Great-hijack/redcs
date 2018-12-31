import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasesViewPage } from './cases-view';

@NgModule({
  declarations: [
    CasesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CasesViewPage),
  ],
})
export class CasesViewPageModule {}
