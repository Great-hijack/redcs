import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseMilestonesPage } from './case-milestones';

@NgModule({
  declarations: [
    CaseMilestonesPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseMilestonesPage),
  ],
})
export class CaseMilestonesPageModule {}
