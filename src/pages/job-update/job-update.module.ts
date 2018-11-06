import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobUpdatePage } from './job-update';

@NgModule({
  declarations: [
    JobUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(JobUpdatePage),
  ],
})
export class JobUpdatePageModule {}
