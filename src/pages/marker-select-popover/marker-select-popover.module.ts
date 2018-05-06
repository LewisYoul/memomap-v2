import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkerSelectPopoverPage } from './marker-select-popover';

@NgModule({
  declarations: [
    MarkerSelectPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkerSelectPopoverPage),
  ],
})
export class MarkerSelectPopoverPageModule {}
