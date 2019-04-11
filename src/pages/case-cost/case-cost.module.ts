import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseCostPage } from './case-cost';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CaseCostPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseCostPage),
    PipesModule
  ],
})
export class CaseCostPageModule { }
