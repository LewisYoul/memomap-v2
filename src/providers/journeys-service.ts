import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class JourneysService {

  constructor(
    public http: Http,
  ) {}

  // index(filterParams) {
  //   return this.userRepo.getCurrentUser().then(user => {
  //     return this.http.get(`${this.endpoint}/charges?t=${user.token}`, filterParams)
  //       .map(res => res.json())
  //       .toPromise();
  //   });
  // }

  index() {
    return Promise.resolve(this.http.get('http://localhost:3000/markers')
      .map(res => res.json()))
  }

}
