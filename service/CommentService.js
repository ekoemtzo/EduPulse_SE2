'use strict';
const { respondWithCode } = require("../utils/writer");

const mockDatabase = {
  comments:[
    {commentId: 1, authorId: 32, postId: 51, content: "Mind-blowwwwnnnn"},
    {commentId: 2, authorId: 29, postId: 8, content: "Loved this episode :)"},
    {commentId: 3, authorId: 11, postId: 72, content: "Great content... lol"},
    {commentId: 4, authorId: 32, postId: 8, content: "Wow! So inspiring"},
    {commentId: 5, authorId: 32, postId: 43, content: "Looking forward to more articles like this."} 
  ],
  // using only some of the property names of the post schema for this mockDatabase
  posts:[
    {postId: 51, postAuthorId: 7},
    {postId: 8, postAuthorId: 67},
    {postId: 72, postAuthorId: 13},
    {postId: 43, postAuthorId: 9},
    {postId: 26, postAuthorId: 31},
  ]
};

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
    try{
      // Returns a bad request if any parameters are missing
      if ( !postId || !body.content || !body.authorId ){
        return reject(
          respondWithCode(400, {message: "The postId, authorId and content are required to post a comment."})
        );
      }

      // Returns a bad request if the postId doesn't match any existing posts
      if( !mockDatabase.posts.some((post) => post.postId === postId) ){
        return reject(
          respondWithCode(404, {message: "Post could not be found."})
        );
      }
      
      // Create the new Comment
      const newComment = {
        commentId: mockDatabase.comments.length + 1, // Assign the commentId based on the existing comments
        authorId: body.authorId,
        postId: postId,
        content: body.content
      }

      // Add the new Comment to the mockDatabase
      mockDatabase.comments.push(newComment);

      // Return the new Comment
      resolve(newComment);

    }
    catch(error){ reject( respondWithCode(500, "Internal Server Error") ); }
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
    try{
      // Returns a bad request if the postId doesn't match any existing posts
      if( !mockDatabase.posts.some((post) => post.postId === postId) ){
        return reject(
          respondWithCode(404, {message: "Post could not be found."})
        );
      }

      // Finds the commentIndex of the comment with commentId
      const commentIndex = mockDatabase.comments.findIndex((comment) => comment.commentId === commentId);

      if(commentIndex === -1) {
        // Returns a bad request if the commentId doesn't match any existing comments
        return reject(
          respondWithCode(404, {message: "Comment could not be found."})
        );
      }
      else{
        // If the commentId matches an existing comment, that comment is deleted from the mockDatabase
        mockDatabase.comments.splice(commentIndex,1);
        resolve({message: "Comment deleted successfully."}); 
      }

    }
    catch(error){ reject( respondWithCode(500, "Internal Server Error") ); }
  });
}

