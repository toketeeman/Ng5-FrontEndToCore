import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';    // The AuthHttp service class to be configured upon instantiation/injection.

import { environment } from '../../environments/environment';
import { User } from '../_models/User';


@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  // Conventional Http approach.

  //constructor(private http: Http) { }
  
  // getUsers(): Observable<User[]> {
  //   return this.http
  //                 .get(this.baseUrl + 'users', this.headers())   // Pass headers (including JWT) as parameter.
  //                 .map(response => <User[]>response.json())
  //                 .catch(this.handleError);
  // }

  // private headers() {
  //   let token = localStorage.getItem('token');
  //   if (token) {
  //     let headers = new Headers({'authorization': 'Bearer ' + token});
  //     headers.append('Content-Type', 'application/json');
  //     return new RequestOptions({headers: headers});
  //   }  
  // }


  // Angular2-jwt approach.

  constructor(private authHttp: AuthHttp) { }           // AuthHttp injection here invokes service factory. See auth.module.

  getUsers(): Observable<User[]> {
    return this.authHttp
                  .get(this.baseUrl + 'users')                // Headers are passed automatically! See auth.module
                  .map(response => <User[]>response.json())
                  .catch(this.handleError);
  }

  getUser(id): Observable<User> {
    return this.authHttp 
                  .get(this.baseUrl + 'users/' + id)          // Headers are passed automatically! See auth.module
                  .map(response => <User>response.json())
                  .catch(this.handleError);
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
