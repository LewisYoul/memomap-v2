import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the MarkersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MarkersProvider {

  constructor(public http: Http) {
    console.log('Hello MarkersProvider Provider');
  }

  getMarkers() {
    return this.http.get('http://localhost:3000/api/markers')
      .map(res => res.json())
  }

  createMarker(newMarker) {
    console.log("you created a marker")
    return this.http.post('http://localhost:3000/api/markers', newMarker)
      .map(response => response.json())
  }

  deleteMarker(markerId) {
    return this.http.delete(`http://localhost:3000/api/markers/${markerId}`)
      .map(res => res.json())
  }

}
