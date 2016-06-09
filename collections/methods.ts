import {Parties} from './parties.ts';
import {Invitations} from './invitations.ts';
import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import { Random } from 'meteor/random';

function getContactEmail(user:Meteor.User):string {
  if (user.emails && user.emails.length)
    return user.emails[0].address;

  return null;
}

Meteor.methods({
  deleteUsers: function(options: any){
    console.log(options.users);
    options.users.forEach((user:any)=>{
      let r = Meteor.users.remove({_id: user});
      console.log(r);
    });
  },
  invite: function (user: Invitation) {
    // check(partyId, String);
    // check(userId, String);

    // let party = Parties.findOne(partyId);

    // if (!party)
    //   throw new Meteor.Error('404', 'No such party!');

    // if (party.public)
    //   throw new Meteor.Error('400', 'That party is public. No need to invite people.');

    // if (party.owner !== this.userId)
    //   throw new Meteor.Error('403', 'No permissions!');

      // Parties.update(partyId, {$addToSet: {invited: userId}});
      let token = Random.hexString( 16 );
      let message = {
        subject: "Invitation",
        text: `Hi, I just invited you to be an user in my brand new app!.
                        \n\nCome check it out: ${Meteor.absoluteUrl()}acceptinvitation/${token}\n`
      };

      Invitations.insert({
      // company: ['', Validators.required],
      company: user.company,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      postal_code: user.postal_code,
      token: token,
      invitation_date: user.invitation_date,
      message: message,
      invited_by: Meteor.userId
    });
      let _from = "your@e.mail";
      let to = user.email;
      
      // console.log(to, Meteor.isServer, user, token);
      if (Meteor.isServer && to) {
        Email.send({
          from: _from,
          to: to,
          replyTo: _from || undefined,
          subject: message.subject,
          text: message.text
        });
        // console.log(token);
      }
  },
  reply: function(partyId: string, rsvp: string) {
    check(partyId, String);
    check(rsvp, String);

    if (!this.userId)
      throw new Meteor.Error('403', 'You must be logged-in to reply');

    if (['yes', 'no', 'maybe'].indexOf(rsvp) === -1)
      throw new Meteor.Error('400', 'Invalid RSVP');

    let party = Parties.findOne({ _id: partyId });

    if (!party)
      throw new Meteor.Error('404', 'No such party');

    if (party.owner === this.userId)
      throw new Meteor.Error('500', 'You are the owner!');

    if (!party.public && (!party.invited || party.invited.indexOf(this.userId) == -1))
      throw new Meteor.Error('403', 'No such party'); // its private, but let's not tell this to the user

    let rsvpIndex = party.rsvps ? party.rsvps.findIndex((rsvp) => rsvp.userId === this.userId) : -1;

    if (rsvpIndex !== -1) {
      // update existing rsvp entry
      if (Meteor.isServer) {
        // update the appropriate rsvp entry with $
        Parties.update(
          { _id: partyId, 'rsvps.userId': this.userId },
          { $set: { 'rsvps.$.response': rsvp } });
      } else {
        // minimongo doesn't yet support $ in modifier. as a temporary
        // workaround, make a modifier that uses an index. this is
        // safe on the client since there's only one thread.
        let modifier = { $set: {} };
        modifier.$set['rsvps.' + rsvpIndex + '.response'] = rsvp;

        Parties.update(partyId, modifier);
      }
    } else {
      // add new rsvp entry
      Parties.update(partyId,
        { $push: { rsvps: { userId: this.userId, response: rsvp } } });
    }
  }
});