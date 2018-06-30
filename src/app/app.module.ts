import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InfoModalPage } from '../pages/info-modal/info-modal'
import { MarkerSelectPopoverPage } from '../pages/marker-select-popover/marker-select-popover'
import { JourneySelectPopoverPage } from '../pages/journey-select-popover/journey-select-popover'


import { HttpModule } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MarkersServiceProvider } from '../providers/markers-service/markers-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InfoModalPage,
    MarkerSelectPopoverPage,
    JourneySelectPopoverPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    InfoModalPage,
    MarkerSelectPopoverPage,
    JourneySelectPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MarkersServiceProvider
  ]
})
export class AppModule {}
