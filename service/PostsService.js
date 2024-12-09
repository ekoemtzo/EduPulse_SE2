'use strict';
const { respondWithCode } = require("../utils/writer");

const mockDatabase = {
  posts: [
    { postId: 1, userId: 1, title: "Electronics", category: "Article" },
    { postId: 2, userId: 456, title: "All about chemistry", category: "Podcast" },
    { postId: 3, userId: 789, title: "Student Campus", category: "Podcast" },
    { postId: 4, userId: 101, title: "Fitness and Health", category: "Article" },
  ],
};


/**
 * Delete a post
 * US-3 Edit Post
 *
 * userId Long ID of the postAuthor
 * postId Long ID of the post to delete
 * no response value expected for this operation
 **/
exports.deletePost = function (userId, postId) {
  return new Promise(function (resolve, reject) {
    try {
      //Validate that postId and userId are valid integers
      if (postId <= 0 || userId <= 0) {
        return reject(
          respondWithCode(400, { message: "'postId' and 'userId' must be positive integers." })
        );
      }

      //Find the post to delete
      const postIndex = mockDatabase.posts.findIndex(
        (post) => post.postId === postId && post.userId === userId
      );

      if (postIndex !== -1) {
      //Post found, delete it
        mockDatabase.posts.splice(postIndex, 1);
        resolve({
          message: "Post deleted successfully",
        });
      } else {
        //Post not found
        return reject(
          respondWithCode(404, {
            message: `No post found with postId: ${postId} for userId: ${userId}`,
          })
        );
      }
    } catch (error) {
      reject(
        respondWithCode(500, {
          message: "Internal Server Error",
        })
      );
    }
  });
};

/**
 * Edit a post
 * FR-10 The admin must be able to edit his posts, FR-7 The admin must be able to assign his post to a category
 *
 * body NewPost 
 * userId Long ID of the postAuthor
 * postId Long ID of the post to edit
 * returns Post
 **/
exports.editPost = function (body, userId, postId) {
  return new Promise(function (resolve, reject) {
    try {
      // Validate userId and postId are integers
      if (!Number.isInteger(userId) || !Number.isInteger(postId)) {
        return reject(
          respondWithCode(400, {
            message: "userId and postId must be integers.",
          })
        );
      }

      // Find the post in the mock database
      const postIndex = mockDatabase.posts.findIndex(
        (post) => post.postId === postId && post.userId === userId
      );

      // If post not found, return 404
      if (postIndex === -1) {
        return reject(
          respondWithCode(404, {
            message: `No post found with postId: ${postId} for userId: ${userId}.`,
          })
        );
      }

      // Validate the body for required fields
      if (!body.title || !body.category) {
        return reject(
          respondWithCode(400, {
            message: "Both title and category are required to edit a post.",
          })
        );
      }

      // Update the post
      const updatedPost = {
        ...mockDatabase.posts[postIndex],
        title: body.title,
        category: body.category,
      };

      mockDatabase.posts[postIndex] = updatedPost;

      // Return the updated post
      resolve(updatedPost);
    } catch (error) {
      reject(
        respondWithCode(500, {
          message: "Internal Server Error",
        })
      );
    }
  });
};


/**
 * Find posts
 * FR-5 Any user must be able to search a post by category or name
 *
 * title String the title of the post I am searching (optional)
 * category String The category of the posts I am searching (optional)
 * returns List
 **/
exports.findPosts = function (title, category) {
  return new Promise(function (resolve, reject) {
    try {

      // Φιλτράρισμα των posts με βάση title και category
        const filteredPosts = mockDatabase.posts.filter((post) => {
        const matchesTitle = title ? post.title.includes(title) : true;
        const matchesCategory = category ? post.category === category : true;
        return matchesTitle && matchesCategory;
      });

      // Αν δεν υπάρχουν αποτελέσματα, επιστρέφουμε 404
      if (filteredPosts.length === 0) {
        return reject(
          respondWithCode(404, {
            message: "No posts found matching the given criteria.",
          })
        );
      }

      // Αν υπάρχουν αποτελέσματα, επιστρέφουμε τη λίστα
      resolve(filteredPosts);
    } catch (error) {
      // Αν υπάρχει κάποιο σφάλμα, επιστρέφουμε 500
      reject(
        respondWithCode(500, {
          message: "Internal Server Error",
        })
      );
    }
  });
};


/**
 * Returns a Post based on the postId
 * US-8 Notification
 *
 * postId Long ID of the post
 * returns Post
 **/
exports.showPost = function(postId) {
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
 * Returns all the Posts of a user
 * US-3 Edit Post
 *
 * userId Long ID of the user
 * returns List
 **/
exports.showUserPosts = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "", "" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Upload a post
 * FR-3 The admin must be able to upload a post
 *
 * body NewPost Post to be uploaded
 * returns Post
 **/
exports.uploadPost = function (body) {
  return new Promise(function (resolve, reject) {
    try {
      // Validate the incoming body for required fields
      if (!body.userId || !body.title || !body.category) {
        return reject(
          respondWithCode(400, {
            message: "userId, title, and category are required to upload a post.",
          })
        );
      }

      if (!Number.isInteger(body.userId)) {
        return reject(
          respondWithCode(400, {
            message: "userId must be an integer.",
          })
        );
      }

      // Create a new post object
      const newPost = {
        postId: mockDatabase.posts.length + 1, // Incrementing the post ID based on existing posts
        userId: body.userId, // Assuming userId is provided in the body
        title: body.title,
        category: body.category,
      };

      // Add the new post to the mock database
      mockDatabase.posts.push(newPost);

      // Return the created post
      resolve(newPost);
    } catch (error) {
      reject(
        respondWithCode(500, {
          message: "Internal Server Error",
        })
      );
    }
  });
};






