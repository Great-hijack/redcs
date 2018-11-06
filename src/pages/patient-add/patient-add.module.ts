import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientAddPage } from './patient-add';

@NgModule({
  declarations: [
    PatientAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientAddPage),
  ],
})
export class PatientAddPageModule {}
