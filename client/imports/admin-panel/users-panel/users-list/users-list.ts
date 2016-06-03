import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Meteor} from 'meteor/meteor';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES, ITableSelectionChange} from 'ng2-material';
import {Mongo} from 'meteor/mongo';
import { DisplayName } from '../../../pipes/pipes.ts';
import {Menu, MenuItem} from 'primeng/primeng';
import { RouterLink }  from '@angular/router-deprecated';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'users-list',
  templateUrl: 'users-list.html',
  styleUrls: ['users-lists.scss'],
  directives: [MATERIAL_DIRECTIVES, MdToolbar, Menu, RouterLink],
  pipes: [ DisplayName, TranslatePipe ]
})
export class UsersList extends MeteorComponent {

  selection: string;
  count: number;
  users: Mongo.Cursor<Object>;
  private items: MenuItem[];
  
  constructor(){
    super();
    this.autorun(() => {
    this.subscribe('usersList',{}, ()=>{
          this.users = Meteor.users.find({});
        });
    });
  }

    ngOnInit(){
      this.items = [{
        label: 'Opciones',
        items:[
          {label: 'Crear usuario', icon: 'fa-plus', url: 'http://www.primefaces.org/primeng'},
          {label: 'Invitar usuario', icon: 'fa-plus', url: 'http://www.primefaces.org/primeng'}
        ]
      }];
    }

   change(data: ITableSelectionChange) {
    let names = [];
    this.users.forEach((user: any) => {
      if (data.values.indexOf(user._id) !== -1) {
        names.push(user.emails[0].address);
      }
    });
    this.selection = names.join(', ');
    this.count = names.length;
  }

}