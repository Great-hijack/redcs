import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionairesViewPage } from './questionaires-view';

@NgModule({
  declarations: [
    QuestionairesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionairesViewPage),
  ],
})
export class QuestionairesViewPageModule {}
