import 'reflect-metadata';
import 'zone.js/dist/zone';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {MATERIAL_PROVIDERS, MATERIAL_DIRECTIVES} from 'ng2-material';
import 'primeui/primeui-ng-all.min.js';
import {MdToolbar} from '@angular2-material/toolbar';
import {MeteorComponent} from 'angular2-meteor';
import {TRANSLATE_PROVIDERS, TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Component, provide } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';
import { AdminPanel } from './imports/admin-panel/admin-panel.ts';
import { PartiesList } from './imports/parties-list/parties-list.ts';
import { PartyDetails } from './imports/party-details/party-details.ts';
import '../collections/methods.ts';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {LoginButtons} from 'angular2-meteor-accounts-ui';
import '../node_modules/@angular2-material/toolbar/toolbar.css';
import {RouterLink} from '@angular/router-deprecated';
import {DisplayName} from './imports/pipes/pipes.ts';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {Login} from './imports/auth/login.ts';
import {Signup} from './imports/auth/signup.ts';
import {Recover} from './imports/auth/recover.ts';
import {AcceptInvitation} from './imports/accept-invitation/accept-invitation.ts';
import {appInjector} from './imports/auth/app-injector';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [ROUTER_DIRECTIVES, LoginButtons, MATERIAL_DIRECTIVES, MdToolbar, RouterLink],
  pipes: [DisplayName]
})
@RouteConfig([
  { path: '/admin/...', as: 'AdminPanel', component: AdminPanel, useAsDefault: true },
  { path: '/parties', as: 'PartiesList', component: PartiesList },
  { path: '/party/:partyId', as: 'PartyDetails', component: PartyDetails },
  { path: '/login', as: 'Login', component: Login },
  { path: '/signup', as: 'Signup', component: Signup },
  { path: '/acceptinvitation/:token', as: 'AcceptInvitation', component: AcceptInvitation },
  { path: '/recover', as: 'Recover', component: Recover },
  { path: '/**', redirectTo: ['AdminPanel/Dashboard'] }
])
@InjectUser('')
class Socially extends MeteorComponent {
  param: string = "world";
  currentUser: Meteor.User;
  constructor(public translate: TranslateService) {
    super();
    this.subscribe('usersList', () => {
      this.autorun(() => {
        this.currentUser = Meteor.user();
          var userLang = navigator.language.split('-')[0]; // use navigator lang if available
          // console.log(this.user, this.currentUser, Meteor.User, Meteor.user(), Meteor.userId());
          userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';

          // this.autorun(() => {
            // console.log(this.currentUser);
            if(this.currentUser && this.currentUser.profile  && this.currentUser.profile.language){
              userLang = this.currentUser.profile.language;
            }
          // });

          // the lang to use, if the lang isn't available, it will use the current loader to get them
          this.translate.use(userLang);
      },   true);
    });

  }

  switchLang(userLang){
    userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
    let profile = {language: ''};
    if(this.currentUser.profile == undefined) {
      profile = {
        language: userLang
      }; 
    } else {
      profile = this.currentUser.profile;
      profile.language = userLang;
    }
    Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
    this.translate.use(userLang);
  }

  logout() {
    this.autorun(() => {
      Meteor.logout();
    });
  }
}

bootstrap(Socially, 
          [
            TRANSLATE_PROVIDERS, 
            HTTP_PROVIDERS, 
            provide(TranslateLoader, 
                    {
                       useFactory: (http: Http) => new TranslateStaticLoader(http, '/client/assets/i18n', '.html'),
                       deps: [Http]
                    }
                  ),
    // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
            TranslateService, 
            MATERIAL_PROVIDERS, 
            ROUTER_PROVIDERS, 
            ANGULAR2_GOOGLE_MAPS_PROVIDERS, 
            provide(APP_BASE_HREF, { useValue: '/' })
          ]
        ).then((appRef) => appInjector(appRef.injector));
