'use strict';

var utils = require('../utils/writer.js');
var Posts = require('../service/PostsService');

module.exports = {
  deletePost: function (res, userId, postId) {
    Posts.deletePost(userId, postId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  },

  editPost: function (res, body, userId, postId) {
    Posts.editPost(body, userId, postId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  },
