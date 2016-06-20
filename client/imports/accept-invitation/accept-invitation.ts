import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { RouteParams, RouterLink, Router } from '@angular/router-deprecated';
import {Invitations} from '../../../collections/invitations.ts';
import { Meteor } from 'meteor/meteor';
import { RequireUser, InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { Mongo } from 'meteor/mongo';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import { TranslatePipe } from 'ng2-translate/ng2-translate';


@Component({
  selector: 'accept-invitation',
  templateUrl: '/client/imports/accept-invitation/accept-invitation.html',
  directives: [RouterLink, MATERIAL_DIRECTIVES, MD_INPUT_DIRECTIVES],
  pipes: [TranslatePipe]
})
export class AcceptInvitation extends MeteorComponent {
  invitation: Mongo.Cursor<Invitation>;
  acceptInvitationForm: ControlGroup;

  constructor(params: RouteParams, private router: Router) {
    super();
    let fb = new FormBuilder();
    var token = params.get('token');

    this.subscribe('invitation', token, () => {
      this.autorun(() => {
        this.invitation = Invitations.findOne({token:token});
        // console.log(this.invitation);
      },   true);
    });

    this.acceptInvitationForm = fb.group({
      // company: ['', Validators.required],
      company: ['test'],
      name: [''],
      last_name: [''],
      email: [''],
      role: [''],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      postal_code: [''],
      token: Random.hexString( 16 ),
      invitation_date: [''],
      password: ['']
    });
  }

  acceptInvitation(user){
    console.log(user);
    let profile = {
      company: user.company,
      name: user.name,
      last_name: user.last_name,
      role: user.role,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      postal_code: user.postal_code,
      token: user.token,
      invitation_date: user.invitation_date
    };
      Accounts.createUser({ email: user.email, password: user.password, profile: profile}, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          this.router.navigate(['/AdminPanel/UsersList']);
        }
      });
  }
}