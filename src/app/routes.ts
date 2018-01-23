import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes:Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},     // Always include this! Avoids confusion with the dummy empty path below.
  { path: 'home', component: HomeComponent},
  {
    path: '',     // Dummy empty path used for grouping.
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, resolve: {resolvedUsers: MemberListResolver}},
      { path: 'members/:id', component: MemberDetailComponent, resolve: {resolvedUser: MemberDetailResolver}},
      { path: 'member/edit', component: MemberEditComponent, 
                             resolve: {resolvedUser: MemberEditResolver},
                             canDeactivate: [PreventUnsavedChanges]},
      { path: 'messages', component: MessagesComponent},
      { path: 'lists', component: ListsComponent}
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
