import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-marker-select-popover',
  templateUrl: 'marker-select-popover.html',
})
export class MarkerSelectPopoverPage {

  src: string = 'assets/icons/'
  possibleMarkers: object[] = [
    { category: "beach", img: `${this.src}beach.png` },
    { category: "marker", img: `${this.src}marker.png` },
    { category: "waypoint", img: `${this.src}waypoint.png` },
    { category: "home", img: `${this.src}home.png` },
    { category: "food", img: `${this.src}food.png` },
  ]

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {}

  createMarker(marker) {
    this.viewCtrl.dismiss(marker.category);
  }

}
