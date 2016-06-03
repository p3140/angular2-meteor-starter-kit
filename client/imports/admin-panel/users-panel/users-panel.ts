import { Component }   from '@angular/core';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { Meteor } from 'meteor/meteor';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import { Counts } from 'meteor/tmeasday:publish-counts';

import {UsersList} from './users-list/users-list.ts';
import {UsersAdd} from './users-add/users-add.ts';

@Component({
  selector: 'users-panel',
  templateUrl: '/client/imports/admin-panel/users-panel/users-panel.html',
  directives: [MATERIAL_DIRECTIVES,ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/list', as: 'List', component: UsersList, useAsDefault: true },
  { path: '/add', as: 'Add', component: UsersAdd },
  { path: '/**', redirectTo: ['List'] }
])

@InjectUser()
export class UsersPanel extends MeteorComponent{
  user: Meteor.User;

  constructor(){
  	super();

  }
}