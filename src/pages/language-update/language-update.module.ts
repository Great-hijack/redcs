import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguageUpdatePage } from './language-update';

@NgModule({
  declarations: [
    LanguageUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(LanguageUpdatePage),
  ],
})
export class LanguageUpdatePageModule {}
