import {Parties} from '../collections/parties.ts';
import { Meteor } from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

Meteor.publish('uninvited', function (partyId:string) {
  let party = Parties.findOne(partyId);

  if (!party)
    throw new Meteor.Error('404', 'No such party!');

  return Meteor.users.find({
    _id: {
      $nin: party.invited || [],
      $ne: this.userId
    }
  });
});

// Meteor.publish("userList", function() {

//     var user = Meteor.users.findOne({
//         _id: this.userId
//     });


//     if (true){//Roles.userIsInRole(user, ["admin"])) {
//         return Meteor.users.find({});
//     }
//     return false;
// });

Meteor.publish('usersList', function(options: Object) {
  Counts.publish(this, 'numberOfUsers',
     Meteor.users.find({}), { noReady: true });
  return Meteor.users.find({}, options);
});