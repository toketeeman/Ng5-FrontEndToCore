import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { User } from "../_models/User";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import 'rxjs/add/operator/catch';
import { AuthService } from "../_services/auth.service";


@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid)  // Note: this name id field is NOT camel-cased!   
                              .catch(error => {
                                this.alertify.error('Problem retrieving data');
                                this.router.navigate(['/members']);
                                return Observable.of(null);
                              })
  }
}