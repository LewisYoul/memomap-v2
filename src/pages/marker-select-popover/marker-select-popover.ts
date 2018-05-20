import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';

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
  possibleMarkers: object[] = [
    { category: "Beach", img: `${this.src}sunbathing.png` },
    { category: "Marker", img: `${this.src}map-marker.png` },
    { category: "Waypoint", img: `${this.src}signpost.png` },
    { category: "Home", img: `${this.src}home-black-shape.png` },
    { category: "Food", img: `${this.src}coconut-with-straw.png` },
  ]

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {}

  createMarker(marker) {
    console.log("MARKER", marker.category)
    const event = this.navParams.get('event')
    console.log("EVENT", event)
    this.http.post('http://localhost:3000/markers', {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      category: marker.category
    })
      .map(res => res.json())
      .subscribe(data => {
      this.viewCtrl.dismiss();
      console.log(data)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarkerSelectPopoverPage');
  }

}
