import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the MarkersServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MarkersServiceProvider {

  constructor(public http: Http) {
    console.log('Hello MarkersServiceProvider Provider');
  }

  getMarkers() {
    return this.http.get('http://localhost:3000/markers')
      .map(res => res.json())
      .toPromise()
  }

}
