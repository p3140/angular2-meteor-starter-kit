import { Meteor } from 'meteor/meteor';


export function loadUsers() {
  if (Meteor.users.find().count() === 0) {  
    let usersToCreate = 100;

    for (var i = 0; i < usersToCreate; i++) {
      let profile = {
            company: 'My Company',
            name: 'User '+ i,
            last_name: '',
            role: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            postal_code: '',
            token: '',
            invitation_date: '',
            active: true
          };
            Accounts.createUser({ email: 'user'+i+"@test.com", password: '12345', profile: profile});
    }
  }
}