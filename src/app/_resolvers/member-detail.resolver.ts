import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { User } from "../_models/User";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import 'rxjs/add/operator/catch';


@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id'])     
                              .catch(error => {
                                this.alertify.error('Problem retrieving data');
                                this.router.navigate(['/members']);
                                return Observable.of(null);
                              })
  }
}
