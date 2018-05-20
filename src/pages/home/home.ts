import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, PopoverController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { InfoModalPage } from '../info-modal/info-modal';
import { MarkerSelectPopoverPage } from '../marker-select-popover/marker-select-popover'
import { Http } from '@angular/http';

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
    public geo: Geolocation
  ) {

  }

  ionViewWillEnter(){
    this.loadMap();
    this.getMarkersFromDb();
  }

  toggleMarkerDrop() {
    this.markerToggle = !this.markerToggle
    if (this.markerToggleColor === 'primary') {
      this.markerToggleColor = 'danger'
    } else {
      this.markerToggleColor = 'primary'
    }
  }

  addMarker(event){
    if (this.markerToggle) {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: 'assets/icons/map-marker.png',
        position: event.latLng
      });
      this.toggleMarkerDrop();
      this.createMarkerInDb(event);
    }

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
      google.maps.event.addListener(newMarker, 'click', () => {
        let modal = this.modalCtrl.create(InfoModalPage)
        modal.present();
      });
    }
  }



  getMarkersFromDb() {
    return this.http.get('http://localhost:3000/markers')
      .map(res => res.json())
      .subscribe(data => {
        console.log("RETURNED", data)
        data.forEach(marker => {
          this.dropExistingMarker(marker);
        });
      });
  }


  createMarkerInDb(event) {
    console.log("NNNN",  event.ra)
    this.http.post('http://localhost:3000/markers', { lat: event.latLng.lat(), lng: event.latLng.lng() })
      .map(res => res.json())
      .subscribe(data => {
      console.log(data)
    })
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      let modal = this.modalCtrl.create(InfoModalPage)
      modal.present();
      // infoWindow.open(this.map, marker);
      google.maps.event.addListener(marker, 'mouseout', function(){
          // infoWindow.close();
       });
    });

  }

  openMarkerSelectPopover(event) {
    if (this.markerToggle) {
      let popover = this.popoverCtrl.create(MarkerSelectPopoverPage, { event: event });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(newMarker => {
        this.dropExistingMarker(newMarker)
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
