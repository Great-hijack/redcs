import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionaireAddPage } from './questionaire-add';

@NgModule({
  declarations: [
    QuestionaireAddPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionaireAddPage),
  ],
})
export class QuestionaireAddPageModule {}
