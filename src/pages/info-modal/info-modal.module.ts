import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoModalPage } from './info-modal';

@NgModule({
  declarations: [
    InfoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoModalPage),
  ],
})
export class InfoModalPageModule {}
