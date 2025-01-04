'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.getUser = function getUser(_req, res, _next, userId) {
  // Validate userId
  if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
    return utils.writeJson(
      res,
      { message: "'userId' must be a positive integer." },
      400
    );
  }

  User.getUser(userId)
    .then(function (response) {
      if (!response) {
        return utils.writeJson(
          res,
          { error: "User not found" },
          404
        );
      }
      utils.writeJson(res, response);
    })
    .catch(function (_) {
      utils.writeJson(res, { error: "Internal Server Error" }, 500);
    });
};
