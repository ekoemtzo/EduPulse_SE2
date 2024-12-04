'use strict';

var utils = require('../utils/writer.js');
var Comment = require('../service/CommentService');

module.exports.commentPost = function commentPost (req, res, next, body, postId) {
  Comment.commentPost(body, postId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePostComment = function deletePostComment (req, res, next, postId, commentId) {
  Comment.deletePostComment(postId, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
