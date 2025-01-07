'use strict';

var utils = require('../utils/writer.js');
var Comment = require('../service/CommentService');

module.exports.commentPost = function commentPost (__, res, _, body, postId) {
  Comment.commentPost(body, postId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePostComment = function deletePostComment (__, res, _, postId, commentId) {
  Comment.deletePostComment(postId, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
