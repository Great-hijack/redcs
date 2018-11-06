import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseDocsPage } from './case-docs';

@NgModule({
  declarations: [
    CaseDocsPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseDocsPage),
  ],
})
export class CaseDocsPageModule {}
