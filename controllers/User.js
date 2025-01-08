'use strict'; // Enforces strict mode

// Importing the utility module for writing JSON responses
var utils = require('../utils/writer.js');
// Importing the UserService
var User = require('../service/UserService');


module.exports.getUser = function getUser(__, res, _, userId) {
  // Validate userId by checking if the userId is a positive integer.
  if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
    // If userId is invalid, respond with a 400 status and an appropriate error message.
    return utils.writeJson(
      res,
      { message: "'userId' must be a positive integer." },
      400
    );
  }

  // Call the getUser method from UserService, passing the userId.
  User.getUser(userId)
    .then(function (response) {
      // If no user is found, respond with a 404 status and an error message.
      if (!response) {
        return utils.writeJson(
          res,
          { error: "User not found" },
          404
        );
      }
      // If a user is found, respond with the user data in JSON format.
      utils.writeJson(res, response);
    })
    .catch(function (_) {
      // If an error occurs during the process, respond with a 500 status and an internal server error message.
      utils.writeJson(res, { error: "Internal Server Error" }, 500);
    });
};
