import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseNotesPage } from './case-notes';

@NgModule({
  declarations: [
    CaseNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseNotesPage),
  ],
})
export class CaseNotesPageModule {}
