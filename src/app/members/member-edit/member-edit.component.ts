import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') childEditForm: NgForm;   // Need access to form to reset it upon submit.

  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {   // Grab the resolved user here.
      this.user = data['resolvedUser'];
    })
  }

  updateUser() {
    console.log(this.user);
    this.alertify.success('Profile Updated Successfully');
    this.childEditForm.reset(this.user);
  }

}
