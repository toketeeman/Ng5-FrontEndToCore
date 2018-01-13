import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { User } from '../_models/User';

@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {
    return this.http.get(this.baseUrl + 'users', 
                         this.jwt()).map(response => <User[]>response.json()).catch(this.handleError);
  }

  private jwt() {
    let token = localStorage.getItem('token');
    if (token) {
      let headers = new Headers({'authorization': 'Bearer ' + token});
      headers.append('Content-Type', 'application/json');
      return new RequestOptions({headers: headers});
    }  
  }

  private handleError(error: Response) {         // The error parameter here is actually a response object.
    const applicationError = error.headers.get('Application-Error');  // Thus error has a headers property.
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();     // json() jsonifies only the error's body.
    let modelStateErrors = '';            // Empty string is falsy.
    if (serverError) {
      for (const key in serverError) {    // Model state errors arrive as an array of messages.
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    )
  }

}
