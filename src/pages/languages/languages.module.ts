import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguagesPage } from './languages';

@NgModule({
  declarations: [
    LanguagesPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguagesPage),
  ],
})
export class LanguagesPageModule {}
