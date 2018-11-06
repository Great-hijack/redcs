import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseQuestionsPage } from './case-questions';

@NgModule({
  declarations: [
    CaseQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseQuestionsPage),
  ],
})
export class CaseQuestionsPageModule {}
