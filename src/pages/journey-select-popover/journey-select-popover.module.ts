import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneySelectPopoverPage } from './journey-select-popover';

@NgModule({
  declarations: [
    JourneySelectPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneySelectPopoverPage),
  ],
})
export class JourneySelectPopoverPageModule {}
