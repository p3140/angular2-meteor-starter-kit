import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Meteor} from 'meteor/meteor';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {Mongo} from 'meteor/mongo';
import { RouterLink }  from '@angular/router-deprecated';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Random } from 'meteor/random';

@Component({
  moduleId: module.id,
  selector: 'users-add',
  templateUrl: 'users-add.html',
  styleUrls: ['users-lists.scss'],
  directives: [MATERIAL_DIRECTIVES, MdToolbar, RouterLink, MD_INPUT_DIRECTIVES],
  pipes: [TranslatePipe]
})
export class UsersAdd extends MeteorComponent {
  user: {} = {
    name: '',
    role: '',
    email: '',

  };
  inviteUserForm: ControlGroup;

  constructor(){
    super();
    let fb = new FormBuilder();

    this.inviteUserForm = fb.group({
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
      invitation_date: ['']
    });
  }

  inviteUser(user) {
    if (this.inviteUserForm.valid) {
      if (Meteor.userId()) { // needs to validate right permissions
        console.log(user);
        // Invitations.insert(<Object>{
        // company: user.company,
        // name: user.name,
        // last_name: user.last_name,
        // email: user.email,
        // role: user.role,
        // phone: user.phone,
        // address: user.address,
        // city: user.city,
        // state: user.state,
        // postal_code: user.postal_code,
        // token: user.token,
        // invitation_date: user.invitation_date,
        //   invited_by: Meteor.userId()
        // });

        // (<Control>this.inviteUserForm.controls['company']).updateValue('');
        (<Control>this.inviteUserForm.controls['name']).updateValue('');
        (<Control>this.inviteUserForm.controls['last_name']).updateValue('');
        (<Control>this.inviteUserForm.controls['email']).updateValue('');
        (<Control>this.inviteUserForm.controls['role']).updateValue('');
        (<Control>this.inviteUserForm.controls['phone']).updateValue('');
        (<Control>this.inviteUserForm.controls['address']).updateValue('');
        (<Control>this.inviteUserForm.controls['city']).updateValue('');
        (<Control>this.inviteUserForm.controls['state']).updateValue('');
        (<Control>this.inviteUserForm.controls['postal_code']).updateValue('');

      } else {
        alert('Please log in to add a party');
      }
    }
  }
}