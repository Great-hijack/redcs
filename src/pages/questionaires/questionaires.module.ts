import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionairesPage } from './questionaires';

@NgModule({
  declarations: [
    QuestionairesPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionairesPage),
  ],
})
export class QuestionairesPageModule {}
