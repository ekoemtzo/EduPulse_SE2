'use strict';


/**
 * Log In a User
 * FR-11 The system must be able to authenticate a user
 *
 * body User_userId_body 
 * userId Long ID of the user
 * returns User
 **/
exports.adminUser = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "isLoggedIn" : true,
  "isAdmin" : true,
  "userId" : 0,
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a user
 * US-8 Notification
 *
 * userId Long ID of the user
 * returns User
 **/
exports.getUser = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "isLoggedIn" : true,
  "isAdmin" : true,
  "userId" : 0,
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

