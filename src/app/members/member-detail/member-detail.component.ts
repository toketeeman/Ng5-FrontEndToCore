import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, 
              private alertify: AlertifyService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Old way, without resolver.
    //
    //this.loadUser();

    this.route.data.subscribe(data => {     // Grab the resolved user here.
      this.user = data['resolvedUser'];
    })
  }

  // Old way, without resolver.
  //
  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {this.user = user;},
  //                                                                          error => {this.alertify.error(error)});
  // }

}
