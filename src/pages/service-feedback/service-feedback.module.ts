import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceFeedbackPage } from './service-feedback';

@NgModule({
  declarations: [
    ServiceFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceFeedbackPage),
  ],
})
export class ServiceFeedbackPageModule {}
