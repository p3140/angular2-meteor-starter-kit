import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let Invitations = new Mongo.Collection<Invitation>('invitations');
// let InvitationsSchema = new SimpleSchema({
//   email: {
//     type: String,
//     label: "Email to send invitation to."
//   },
//   token: {
//     type: String,
//     label: "Invitation token."
//   },
//   role: {
//     type: String,
//     label: "Role to apply to the user."
//   },
//   date: {
//     type: String,
//     label: "Invitation Date"
//   }
// });
Invitations.allow({
  insert: function() {
    let user = Meteor.user();
    
    return !!user;
  },
  update: function() {
    let user = Meteor.user();
    
    return !!user;
  },
  remove: function() {
    let user = Meteor.user();
    
    return !!user;
  }
});
