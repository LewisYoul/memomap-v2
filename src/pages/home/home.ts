import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markerToggle: boolean = false;

  constructor(public navCtrl: NavController, public geo: Geolocation) {

  }

  ionViewDidLoad(){
    console.log("anything")
    this.loadMap();
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

      this.addInfoWindow(marker, content);
    }

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  loadMap(){

    let options = {
      enableHighAccuracy: true,
      timeout: 25000,
      maximumAge: 0
    };

      let latLng = new google.maps.LatLng(-34.9290, 138.6010);

      let mapOptions = {
        center: latLng,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('click', (event) => {
        this.addMarker(event);
      });
  }

}
