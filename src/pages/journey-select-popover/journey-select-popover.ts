import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JourneysService } from '../../providers/journeys-service'

/**
 * Generated class for the JourneySelectPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journey-select-popover',
  templateUrl: 'journey-select-popover.html',
})
export class JourneySelectPopoverPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public journeysService: JourneysService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneySelectPopoverPage');
    this.journeysService.index()
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

}
