import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CombinationSearchPage } from './combination-search';

@NgModule({
  declarations: [
    CombinationSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CombinationSearchPage),
  ],
})
export class CombinationSearchPageModule {}
