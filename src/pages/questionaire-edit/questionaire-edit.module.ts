import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionaireEditPage } from './questionaire-edit';

@NgModule({
  declarations: [
    QuestionaireEditPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionaireEditPage),
  ],
})
export class QuestionaireEditPageModule {}
