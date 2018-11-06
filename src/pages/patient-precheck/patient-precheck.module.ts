import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientPrecheckPage } from './patient-precheck';

@NgModule({
  declarations: [
    PatientPrecheckPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientPrecheckPage),
  ],
})
export class PatientPrecheckPageModule {}
