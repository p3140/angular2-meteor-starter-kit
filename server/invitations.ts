import {Parties} from '../collections/parties';
import {Invitations} from '../collections/invitations';
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

function buildQuery(token:string): Object {
  // var isAvailable = {
  //   $and: [
  //     { 'token': token },
  //     {
  //       $and: [
  //         { owner: this.userId },
  //         { owner: { $exists: true } }
  //       ],
  //     },
  //     {
  //       $and: [
  //         { invited: this.userId },
  //         { invited: { $exists: true } }
  //       ]
  //     }
  //   ]
  // };

  if (token) {
    return { $and: [{ token: token }] };
    console.log(token);
  }
}

Meteor.publish('invitation', function(token: string) {
  return Invitations.find(buildQuery.call(this, token));
});