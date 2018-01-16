import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response) => {  // Returns an observable.
      const user = response.json();                       // Carry out some side effects before passing on the observable to caller.
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        this.userToken = user.tokenString;
      }
    }).catch(this.handleError);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);  // Returns an observable.
  }

  loggedIn() {
    return tokenNotExpired('token');  // 'token' is the default for angular2-jwt. So we can just use '' instead. 
  }

  private requestOptions() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    return new RequestOptions({headers: headers});
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
