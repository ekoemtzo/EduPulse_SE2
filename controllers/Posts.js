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

  findPosts: function (res, title, category) {
    Posts.findPosts(title, category)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  },

  showPost: function (res, postId) {
    // Check if postId is a valid positive integer
    if (isNaN(postId) || postId <= 0) {
      return res.status(400).json({ message: "'postId' must be a positive integer." });
    }

    // Call service to get the post
    Posts.showPost(postId)
      .then(function (response) {
        if (!response) {
          // If no post is found, return a 404 Not Found
          return res.status(404).json({ error: "Post not found" });
        }
        // If post is found, return it as the response
        utils.writeJson(res, response);
      })
      .catch(function (error) {
        // Handle any unexpected errors
        utils.writeJson(res, error);
      });
  },

  showUserPosts: function (res, userId) {
    // Check if userId is a valid positive integer
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ message: "'userId' must be a positive integer." });
    }

    // Call service to get the posts
    Posts.showUserPosts(userId)
      .then(function (response) {
        if (!response || response.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        utils.writeJson(res, response);
      })
      .catch(function (error) {
        utils.writeJson(res, error);
      });
  },

  uploadPost: function (res, body) {
    Posts.uploadPost(body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }

  // Call service to get the post
  Posts.showPost(postId)
    .then(function (response) {
      if (!response) {
        // If no post is found, return a 404 Not Found
        return res.status(404).json({ error: "Post not found" });
      }
      // If post is found, return it as the response
      utils.writeJson(res, response);
    })
    .catch(function (error) { 
      utils.writeJson(res, error); // Handle any unexpected errors
    });
};


module.exports.showUserPosts = function showUserPosts (req, res, next, userId) {
  // Check if userId is a valid positive integer
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).json({ message: "'userId' must be a positive integer." });
  }

  // Call service to get the posts
  Posts.showUserPosts(userId)
    .then(function (response) {
      if (!response || response.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error);
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
