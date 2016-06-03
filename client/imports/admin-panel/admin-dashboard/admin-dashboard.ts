import { Component }   from '@angular/core';
import { Mongo }       from 'meteor/mongo';
import { RouterLink }  from '@angular/router-deprecated';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { Meteor } from 'meteor/meteor';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

@Component({
  selector: 'admin-dashboard',
  templateUrl: '/client/imports/admin-panel/admin-dashboard/admin-dashboard.html',
  directives: [MATERIAL_DIRECTIVES, RouterLink, MD_INPUT_DIRECTIVES]
})
@InjectUser()
export class AdminDashboard extends MeteorComponent{
  user: Meteor.User;

  constructor() {
    super();
  }

  changeSortOrder(value){
    console.log(value);
  }
}