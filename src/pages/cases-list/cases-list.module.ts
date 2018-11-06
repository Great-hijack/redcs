import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasesListPage } from './cases-list';

@NgModule({
  declarations: [
    CasesListPage,
  ],
  imports: [
    IonicPageModule.forChild(CasesListPage),
  ],
})
export class CasesListPageModule {}
