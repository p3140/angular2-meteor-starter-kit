import { Component }   from '@angular/core';
import { ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { Meteor } from 'meteor/meteor';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {AdminDashboard} from './admin-dashboard/admin-dashboard.ts';
import {UsersPanel} from './users-panel/users-panel.ts';

@Component({
  selector: 'admin-panel',
  templateUrl: '/client/imports/admin-panel/admin-panel.html',
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/dashboard', as: 'Dashboard', component: AdminDashboard },
  { path: '/users/...', as: 'Users', component: UsersPanel, useAsDefault: true },
  { path: '/**', redirectTo: ['Dashboard'] }
])
@InjectUser()
export class AdminPanel extends MeteorComponent{
  user: Meteor.User;

  constructor() {
    super();
  }

  changeSortOrder(value){
    console.log(value);
  }
}