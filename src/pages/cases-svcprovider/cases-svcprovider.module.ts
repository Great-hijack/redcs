import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasesSvcproviderPage } from './cases-svcprovider';

@NgModule({
  declarations: [
    CasesSvcproviderPage,
  ],
  imports: [
    IonicPageModule.forChild(CasesSvcproviderPage),
  ],
})
export class CasesSvcproviderPageModule {}
