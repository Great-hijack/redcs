import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleVisionPage } from './google-vision';

@NgModule({
  declarations: [
    GoogleVisionPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleVisionPage),
  ],
})
export class GoogleVisionPageModule {}
