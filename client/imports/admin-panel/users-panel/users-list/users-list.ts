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
import { PaginationService, PaginatePipe, PaginationControlsCmp } from 'angular2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

@Component({
  moduleId: module.id,
  selector: 'users-list',
  templateUrl: 'users-list.html',
  styleUrls: ['users-lists.scss'],
  viewProviders: [PaginationService],
  directives: [MATERIAL_DIRECTIVES, MdToolbar, Menu, RouterLink, PaginationControlsCmp],
  pipes: [ DisplayName, TranslatePipe, PaginatePipe ]
})
export class UsersList extends MeteorComponent {

  selection: string;
  count: number;
  users: Mongo.Cursor<Object>;
  pageSize: number = 10;
  curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
  emailOrder: ReactiveVar<number> = new ReactiveVar<number>(1);
  email: ReactiveVar<string> = new ReactiveVar<string>(null);
  private items: MenuItem[];
  selectedUsers: any;
  usersSize: number = 0;
  
  constructor(){
    super();
    this.autorun(() => {
      let options = {
        limit: this.pageSize,
        skip: (this.curPage.get() - 1) * this.pageSize,
        // sort: { 'emails.address': this.emailOrder.get() }
      };
      this.subscribe('usersList2',options, this.email.get(), ()=>{
            this.users = Meteor.users.find({}/*, {sort:{'emails.address': this.emailOrder.get()}}*/);
            console.log(this.users);
          });
    }, true);

    this.autorun(() => {
      this.usersSize = Counts.get('numberOfUsers');
      console.log(this.usersSize);
    }, true);

  }

  onPageChanged(page: number) {
    this.curPage.set(page);
  }

  deleteUsers(){
    this.call('deleteUsers', {users:this.selectedUsers});
    this.selectedUsers = [];
    this.selection = "";
    this.count = 0;
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
    let _ids = [];
    this.users.forEach((user: any) => {
      if (data.values.indexOf(user._id) !== -1) {
        names.push(user.emails[0].address);
        _ids.push(user._id);
      }
    });
    this.selectedUsers = _ids;
    this.selection = names.join(', ');
    this.count = names.length;
  }

}