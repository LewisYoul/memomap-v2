import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, PopoverController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { InfoModalPage } from '../info-modal/info-modal';
import { MarkerSelectPopoverPage } from '../marker-select-popover/marker-select-popover'
import { JourneySelectPopoverPage } from '../journey-select-popover/journey-select-popover'
import { Http } from '@angular/http';

import { MarkersProvider } from '../../providers/markers/markers'



import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markerToggle: boolean = false;
  markerToggleColor: string = 'danger'

  constructor(
    public http: Http,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public geo: Geolocation,
    public markersService: MarkersProvider
  ) {
  }

  ionViewWillEnter(){
    this.loadMap();
    this.getMarkersFromDb();
  }

  toggleMarkerDrop() {
    this.markerToggle = !this.markerToggle;
    this.toggleMarkerDropColor();
  }

  toggleMarkerDropColor() {
    if (this.markerToggleColor === 'primary') {
      this.markerToggleColor = 'danger'
    } else {
      this.markerToggleColor = 'primary'
    }
  }

  openJourneysPopover(event) {
    let popover = this.popoverCtrl.create(JourneySelectPopoverPage)
    popover.present({
      ev: event
    });
  }

  dropExistingMarker(marker) {
    if (marker) {
      let point = new google.maps.LatLng(marker.lat, marker.lng);
      let newMarker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: `assets/icons/${marker.category}.png`,
        position: point
      });
      newMarker['id'] = marker.id
      google.maps.event.addListener(newMarker, 'click', () => {
        let modal = this.modalCtrl.create(InfoModalPage, { marker: newMarker })
        modal.present();
      });
    }
  }

  getMarkersFromDb() {
    return this.markersService.getMarkers()
      .subscribe(markers => {
        markers.forEach(marker => {
          this.dropExistingMarker(marker);
        }, err => {
          console.log(err)
        })
      })
  }

  openMarkerSelectPopover(event) {
    if (this.markerToggle) {
      let popover = this.popoverCtrl.create(MarkerSelectPopoverPage, { event: event });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(category => {
        if (category) {
          const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            category: category
          }

          this.markersService.createMarker(newMarker)
            .subscribe(
              marker => this.dropExistingMarker(marker),
              err => console.log(err)
          );
        }
      });
    }
  }

  loadMap(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000,
      maximumAge: 0
    };

      let latLng = new google.maps.LatLng(51.593008, -0.136754);

      let mapOptions = {
        center: latLng,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }


      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('click', (event) => {
        this.openMarkerSelectPopover(event);
      });
  }
}
