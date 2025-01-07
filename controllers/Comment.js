'use strict'; // Enforces strict mode

// Importing the utility module for writing JSON responses
var utils = require('../utils/writer.js');

// Importing the CommentService
var Comment = require('../service/CommentService');

module.exports.commentPost = function commentPost (req, res, next, body, postId) {
  // Calls the commentPost method from CommentService, passing the request body and post ID
  Comment.commentPost(body, postId)
    .then(function (response) {
      // Sends the response back to the client in JSON format on successful operation.
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Sends an error response back to the client in JSON format if the operation fails.
      utils.writeJson(res, response);
    });
};

module.exports.deletePostComment = function deletePostComment (req, res, next, postId, commentId) {
  // Calls the deletePostComment method from CommentService, passing the postId and commentId.
  Comment.deletePostComment(postId, commentId)
    .then(function (response) {
      // Sends the response back to the client in JSON format on successful operation.
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Sends an error response back to the client in JSON format if the operation fails.
      utils.writeJson(res, response);
    });
};
