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

module.exports.showUserPosts = function showUserPosts (req, res, next, userId) {
  Posts.showUserPosts(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
