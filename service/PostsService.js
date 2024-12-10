'use strict';


/**
 * Delete a post
 * US-3 Edit Post
 *
 * userId Long ID of the postAuthor
 * postId Long ID of the post to delete
 * no response value expected for this operation
 **/
exports.deletePost = function(userId,postId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit a post
 * FR-10 The admin must be able to edit his posts, FR-7 The admin must be able to assign his post to a category
 *
 * body NewPost 
 * userId Long ID of the postAuthor
 * postId Long ID of the post to edit
 * returns Post
 **/
exports.editPost = function(body,userId,postId) {
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
 * Find posts
 * FR-5 Any user must be able to search a post by category or name
 *
 * title String the title of the post I am searching (optional)
 * category String The category of the posts I am searching (optional)
 * returns List
 **/
exports.findPosts = function(title,category) {
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
 * Returns a Post based on the postId
 * US-8 Notification
 *
 * postId Long ID of the post
 * returns Post
 **/
exports.showPost = function(postId) {
  return new Promise(function(resolve, reject) {
    // Simulate a check for post existence (you can replace this with your actual DB call)
    const postExists = postId === 1; // Assume only postId 1 exists (mock example)

    if (!postExists) {
      return resolve(null);  // Post not found
    }

    // Simulate a post object for postId 1
    const post = { postId: 1, title: 'Post 1', content: 'This is the content of post 1' };
    resolve(post);
  });
};

/**
 * Returns all the Posts of a user
 * US-3 Edit Post
 *
 * userId Long ID of the user
 * returns List
 **/
exports.showUserPosts = function(userId) {
  return new Promise(function(resolve, reject) {
    // Simulate a check for user existence (you can replace this with your actual DB call)
    const userExists = userId === 1; // Assume only userId 1 exists (mock example)
    
    if (!userExists) {
      return resolve(null);  // User not found
    }

    // Simulate finding posts for user 1
    const posts = [{ postId: 1, title: 'Post 1' }, { postId: 2, title: 'Post 2' }];
    resolve(posts);
  });
};



/**
 * Upload a post
 * FR-3 The admin must be able to upload a post
 *
 * body NewPost Post to be uploaded
 * returns Post
 **/
exports.uploadPost = function(body) {
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

