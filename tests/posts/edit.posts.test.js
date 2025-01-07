const test = require("ava");

// Test case for successfully updating a post (Happy Path)
test("editPost - Successful update of post", async (t) => {
    const userId = 1; // User ID for the test
    const postId = 1; // Post ID for the test
  
    // Prepare the request body with updated data
    const requestBody = {
      title: "Updated Post Title", // Updated title of the post
      category: "Updated Category", // Updated category of the post
    };
  
    // Send PUT request to update the post
    const response = await t.context.got.put(`user/${userId}/posts/${postId}`, { json: requestBody });
  
    // Assertions to verify that the update was successful
    t.is(response.statusCode, 200, "Should return 200 OK for successful update"); // Check for 200 OK status
    t.truthy(response.body, "Response body should be present"); // Ensure response body is not empty
    t.is(response.body.postId, postId, "Post ID in response should match the request"); // Verify that postId in response matches the request
    t.is(response.body.userId, userId, "User ID in response should match the request"); // Verify that userId in response matches the request
    t.is(response.body.title, requestBody.title, "Title should match the updated value"); // Verify that the title was updated
    t.is(response.body.category, requestBody.category, "Category should match the updated value"); // Verify that the category was updated
  });

// Test case for attempting to edit a non-existent post (Unhappy Path)
test("editPost - Post not found", async (t) => {
    const userId = 1; // Valid user ID for the test
    const invalidPostId = 999; // Non-existent Post ID
  
    const requestBody = {
      title: "New Title", // New title for the post
      category: "New Category", // New category for the post
    };
  
    try {
      // Send PUT request to update a non-existent post
      await t.context.got.put(`user/${userId}/posts/${invalidPostId}`, { json: requestBody });
      t.fail("Expected editPost to throw an error due to non-existent postId"); // Test should fail if no error is thrown
    } catch (error) {
      // Asserting that the status code is 404 for non-existent post
      t.is(error.response.statusCode, 404, "Should return 404 for non-existent post");
      // Asserting the correct error message for non-existent post
      t.is(
        error.response.body.message,
        `No post found with postId: ${invalidPostId} for userId: ${userId}.`,
        "Error message should indicate the post was not found"
      );
    }
  });

// Test case for invalid userId or postId (non-integer values) in the request
test("editPost - Invalid userId or postId (non-integer)", async (t) => {
    const userId = "one"; // Invalid userId (non-integer)
    const postId = 1; // Valid postId
  
    const requestBody = {
      title: "New Title", // New title for the post
      category: "New Category", // New category for the post
    };
  
    try {
      // Send PUT request with an invalid userId (non-integer)
      await t.context.got.put(`user/${userId}/posts/${postId}`, { json: requestBody });
      t.fail("Expected editPost to throw an error due to non-integer userId"); // Test should fail if no error is thrown
    } catch (error) {
      // Asserting that the status code is 400 for invalid userId
      t.is(error.response.statusCode, 400, "Should return 400 for invalid userId");
      // Asserting the correct error message for invalid userId
      t.is(
        error.response.body.message,
        "request.params.userId should be integer",
        "Error message should indicate invalid userId and postId"
      );
    }
  });

// Test case for missing required fields (title) in the update request
test("editPost - Missing required fields", async (t) => {
    const userId = 1; // Valid userId
    const postId = 1; // Valid postId
  
    // Prepare the request body with missing title (category is provided)
    const requestBody = {
      category: "Updated Category", // Category is provided, but title is missing
    };
  
    try {
      // Send PUT request with missing title
      await t.context.got.put(`user/${userId}/posts/${postId}`, { json: requestBody });
      t.fail("Expected editPost to throw an error due to missing title"); // Test should fail if no error is thrown
    } catch (error) {
      // Asserting that the status code is 400 for missing required fields
      t.is(error.response.statusCode, 400, "Should return 400 for missing required fields");
      // Asserting the correct error message for missing title
      t.is(
        error.response.body.message,
        "Both title and category are required to edit a post.",
        "Error message should indicate missing fields"
      );
    }
  });
