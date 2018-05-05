import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { InfoModalPage } from '../info-modal/info-modal';
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

  constructor(
    public http: Http,
    public modalCtrl: ModalController,
    public geo: Geolocation
  ) {

  }

  ionViewWillEnter(){
    console.log("anything")
    this.loadMap();
    this.getMarkers();
  }

  toggleMarkerDrop() {
    this.markerToggle = !this.markerToggle
  }

  addMarker(event){
    if (this.markerToggle) {
      console.log(event)
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: event.latLng
        // icon: 'http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png'
      });
      this.toggleMarkerDrop();
      let content = "<h4>Information!</h4>";
      this.createMarker(event);
      this.addInfoWindow(marker, content);
    }

  }

  getMarkers() {
    return this.http.get('http://localhost:3000/markers')
      .map(res => res.json())
      .subscribe(data => {
        console.log("RETURNED", data)
        data.forEach(marker => {
          this.dropExistingMarker(marker);
        });
      });
  }

  dropExistingMarker(marker) {
    let point = new google.maps.LatLng(marker.lat, marker.lng);
    console.log("point", point)
    let newMarker = new google.maps.Marker({
      map: this.map,
      position: point
    });
    google.maps.event.addListener(newMarker, 'click', () => {
      let modal = this.modalCtrl.create(InfoModalPage)
      modal.present();
      // infoWindow.open(this.map, marker);
    });
    console.log("newmarker", newMarker)
    console.log("map", this.map)
  }

  createMarker(event) {
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
        this.addMarker(event);
      });
  }

}
