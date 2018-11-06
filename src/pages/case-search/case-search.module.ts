import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseSearchPage } from './case-search';

@NgModule({
  declarations: [
    CaseSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseSearchPage),
  ],
})
export class CaseSearchPageModule {}
