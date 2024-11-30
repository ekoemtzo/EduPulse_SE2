'use strict';


/**
 * Comment on a post
 * FR-6 A logged in user must be able to comment on a post
 *
 * body NewComment 
 * postId Long ID of the post to comment on
 * returns Comment
 **/
exports.commentPost = function(body,postId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a post's comment
 * US-6 Comment
 *
 * postId Long ID of the post
 * commentId Long ID of the comment to delete
 * no response value expected for this operation
 **/
exports.deletePostComment = function(postId,commentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

