import {FORM_DIRECTIVES} from '@angular/common';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Meteor} from 'meteor/meteor';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {Mongo} from 'meteor/mongo';
import { RouterLink }  from '@angular/router-deprecated';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'users-add',
  templateUrl: 'users-add.html',
  styleUrls: ['users-lists.scss'],
  directives: [MATERIAL_DIRECTIVES, MdToolbar, RouterLink, MD_INPUT_DIRECTIVES],
  pipes: [TranslatePipe]
})
export class UsersAdd extends MeteorComponent {
  user: {} = {name: '',role: '',email: ''};
  constructor(){
    super();
  }
}