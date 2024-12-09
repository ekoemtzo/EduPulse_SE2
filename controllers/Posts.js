'use strict';

var utils = require('../utils/writer.js');
var Posts = require('../service/PostsService');

module.exports.deletePost = function deletePost (req, res, next, userId, postId) {
  Posts.deletePost(userId, postId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editPost = function editPost (req, res, next, body, userId, postId) {
  Posts.editPost(body, userId, postId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findPosts = function findPosts (req, res, next, title, category) {
  Posts.findPosts(title, category)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showPost = function showPost (req, res, next, postId) {
  Posts.showPost(postId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showUserPosts = function showUserPosts(req, res, next, userId, injectedService = Posts) {
  injectedService.showUserPosts(userId)
    .then(function (response) {
      if (!response || response.length === 0) {
        utils.writeJson(res, { error: 'User not found' }, 404);
      } else {
        utils.writeJson(res, response, 200);
      }
    })
    .catch(function (err) {
      utils.writeJson(res, { error: err.message }, 500);
    });
};


module.exports.uploadPost = function uploadPost (req, res, next, body) {
  Posts.uploadPost(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
