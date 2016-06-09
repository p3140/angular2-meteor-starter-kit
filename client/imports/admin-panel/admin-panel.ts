import { Component }   from '@angular/core';
import { ROUTER_DIRECTIVES, RouteConfig, CanActivate, ComponentInstruction, Router } from '@angular/router-deprecated';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { Meteor } from 'meteor/meteor';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {AdminDashboard} from './admin-dashboard/admin-dashboard.ts';
import {UsersPanel} from './users-panel/users-panel.ts';
import {appInjector} from '../auth/app-injector';
import {isLoggedIn} from '../auth/isloggedin.ts';

// function checkPermissions(next: ComponentInstruction, previous: ComponentInstruction) {
//   // var partyId = instruction.params['partyId'];
//   // var party = Parties.findOne(partyId);
//   // 
//   console.log(next, previous);
//   let router = new Router; 
//   console.log(router);
//   // console.log(isLoggedIn());
//   // let userId = Meteor.userId();
//   console.log(userId);
//   if (userId != null){
//     return isLoggedIn();
//   } else {
//     router.navigateByUrl(['/Login']);
//   }
// }

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
@InjectUser('')
@CanActivate((next, prev)=>{
    let injector = appInjector();
    let router = injector.get(Router);
    // console.log(Meteor.userId(), Meteor.user());
    if(isLoggedIn()){
      return true;
    }
    router.navigate(['/Login']);
    return false;
  })
export class AdminPanel extends MeteorComponent{
  user: Meteor.User;

  constructor(private router: Router) {
    super();
  }

  changeSortOrder(value){
    console.log(value);
  }
}