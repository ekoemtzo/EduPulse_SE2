const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");


/**
 * Opens server, before tests.
 */
test.before(async (t) => {
  // Create server
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({
    responseType: "json",
    prefixUrl: `http://localhost:${port}`,
  });
});

/**
 * Closes server, after tests.
 */
test.after.always(async (t) => {
  // Close the server
  t.context.server.close();
});

test("editPost - Successful update of post", async (t) => {
    const userId = 1;
    const postId = 1;
  
    // Prepare the request body
    const requestBody = {
      title: "Updated Post Title",
      category: "Updated Category",
    };
  
    // Send PUT request
    const response = await t.context.got.put(`user/${userId}/posts/${postId}`, { json: requestBody });
  
    // Assertions
    t.is(response.statusCode, 200, "Should return 200 OK for successful update");
    t.truthy(response.body, "Response body should be present");
    t.is(response.body.postId, postId, "Post ID in response should match the request");
    t.is(response.body.userId, userId, "User ID in response should match the request");
    t.is(response.body.title, requestBody.title, "Title should match the updated value");
    t.is(response.body.category, requestBody.category, "Category should match the updated value");
  });
  

  test("editPost - Post not found", async (t) => {
    const userId = 1;
    const invalidPostId = 999;
  
    const requestBody = {
      title: "New Title",
      category: "New Category",
    };
  
    try {
      await t.context.got.put(`user/${userId}/posts/${invalidPostId}`, { json: requestBody });
      t.fail("Expected editPost to throw an error due to non-existent postId");
    } catch (error) {
      t.is(error.response.statusCode, 404, "Should return 404 for non-existent post");
      t.is(
        error.response.body.message,
        `No post found with postId: ${invalidPostId} for userId: ${userId}.`,
        "Error message should indicate the post was not found"
      );
    }
  });

  test("editPost - Invalid userId or postId (non-integer)", async (t) => {
    const userId = "one";
    const postId = 1;
  
    const requestBody = {
      title: "New Title",
      category: "New Category",
    };
  
    try {
      await t.context.got.put(`user/${userId}/posts/${postId}`, { json: requestBody });
      t.fail("Expected editPost to throw an error due to non-integer userId");
    } catch (error) {
      t.is(error.response.statusCode, 400, "Should return 400 for invalid userId");
      t.is(
        error.response.body.message,
        "request.params.userId should be integer",
        "Error message should indicate invalid userId and postId"
      );
    }
  });

  test("editPost - Missing required fields", async (t) => {
    const userId = 1;
    const postId = 1;
  
    const requestBody = {
      category: "Updated Category", // Title is missing
    };
  
    try {
      await t.context.got.put(`user/${userId}/posts/${postId}`, { json: requestBody });
      t.fail("Expected editPost to throw an error due to missing title");
    } catch (error) {
      t.is(error.response.statusCode, 400, "Should return 400 for missing required fields");
      t.is(
        error.response.body.message,
        "Both title and category are required to edit a post.",
        "Error message should indicate missing fields"
      );
    }
  });
  
  
  