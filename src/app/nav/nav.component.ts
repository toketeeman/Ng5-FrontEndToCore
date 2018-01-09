import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private titleCase: TitleCasePipe) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error(error);   // Previous observable throws come here.
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  TitledUserName() {
    return this.titleCase.transform(this.authService.decodedToken.unique_name);
  }


}