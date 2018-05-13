import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MarkerSelectPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marker-select-popover',
  templateUrl: 'marker-select-popover.html',
})
export class MarkerSelectPopoverPage {

  src: string = 'assets/icons/'
  possibleMarkers: any = [
    { type: "Beach", img: `${this.src}sunbathing.png` },
    { type: "Marker", img: `${this.src}map-marker.png` },
    { type: "Waypoint", img: `${this.src}signpost.png` },
    { type: "Home", img: `${this.src}home-black-shape.png` },
    { type: "Food", img: `${this.src}coconut-with-straw.png` },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarkerSelectPopoverPage');
  }

}
