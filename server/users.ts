import { Meteor } from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

function buildQuery(userId: string, email: string): Object {
  var isActive = {
    // $or: [
    //   { 'profile.active': true }
    // ]
  };

  if (userId) {
    return { $and: [{ _id: userId }] };
  }

  let searchRegEx = { '$regex': '.*' + (email || '') + '.*', '$options': 'i' };

  return { $and: [{ 'emails.address': searchRegEx }] };
}
Meteor.publish('users.list', function(options: Object, email: string) {
  // if(options != undefined){
  console.log("?", options);
  let _op = options;

    Counts.publish(this, 'numberOfUsers',
       Meteor.users.find({}), { noReady: true });
    return Meteor.users.find({}, _op);
  // }
});