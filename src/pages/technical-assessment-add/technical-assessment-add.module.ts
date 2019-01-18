import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechnicalAssessmentAddPage } from './technical-assessment-add';

@NgModule({
  declarations: [
    TechnicalAssessmentAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TechnicalAssessmentAddPage),
  ],
})
export class TechnicalAssessmentAddPageModule {}
