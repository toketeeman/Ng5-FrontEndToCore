import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { AuthModule } from './auth/auth.module';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
		MessagesComponent,
		MemberCardComponent,
		MemberDetailComponent
],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		BsDropdownModule.forRoot(),
		RouterModule.forRoot(appRoutes),
		AuthModule,
		TabsModule.forRoot()
	],
	providers: [
		AuthService,
		AlertifyService,
		TitleCasePipe,
		AuthGuard,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
