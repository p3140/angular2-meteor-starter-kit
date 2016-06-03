import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let InvitationsSchema = new Mongo.Collection<Object>('invitations');
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
InvitationsSchema.allow({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});
