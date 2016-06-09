import {Injector} from 'angular2/core';
import {appInjector} from './app-injector';
// import {externalService} from './externalService'; <---------------------- //some external service
import {Router, ComponentInstruction} from 'angular2/router';
import {Meteor} from 'meteor/meteor';
// export const checkpermission= (next: ComponentInstruction, previous: ComponentInstruction) => {

//     let injector: Injector = appInjector(); // get the stored reference to the injector
//     let router: Router = injector.get(Router);

//     // return a boolean or a promise that resolves a boolean

//     return new Promise((resolve) => {

//                        //here you can play with externalService

//                         if(something is true)
//                            resolve(true);
//                         else 
//                            resolve(false);

//     });
// };


export const isLoggedIn = ()=>{
    // return new Promise((resolve) => {
      // console.log(Meteor.userId);
      let uid = Meteor.userId();
      if(uid != null){
        return true;
      }
      else {
        return false;
      }

    // });
};