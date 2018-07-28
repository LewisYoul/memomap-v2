import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MarkersProvider } from '../../providers/markers/markers';

/**
 * Generated class for the InfoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html',
})
export class InfoModalPage {

  marker: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public markersService: MarkersProvider
  ) {}

  ionViewWillEnter() {
    this.marker = this.navParams.get('marker')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoModalPage');
  }

  deleteMarker() {
    this.marker.setMap(null)
    this.markersService.deleteMarker(this.marker.id).subscribe(res => {
        console.log(`Marker with id ${this.marker.id} deleted successfully`)
      }, err => {
        console.log(err)
      });
    this.viewCtrl.dismiss()
  }

}
