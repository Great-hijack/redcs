import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseImagesPage } from './case-images';

@NgModule({
  declarations: [
    CaseImagesPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseImagesPage),
  ],
})
export class CaseImagesPageModule {}
