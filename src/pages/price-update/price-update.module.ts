import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceUpdatePage } from './price-update';

@NgModule({
  declarations: [
    PriceUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(PriceUpdatePage),
  ],
})
export class PriceUpdatePageModule {}
