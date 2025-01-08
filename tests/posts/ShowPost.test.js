const test = require('ava');

/**
 * Test for successful retrieval of a post
 * This test verifies that a valid postId returns the correct post details.
 */
test("Successful retrieval of post (Happy Path)", async (t) => {
  const postId = 1; // Valid postId
  try {
    // Make GET request to retrieve post by postId
    const response = await t.context.got.get(`posts/${postId}`);

    // Assertions: Check for a successful response and verify the returned data
    t.is(response.statusCode, 200, "Should return status 200 for valid postId");
    t.is(response.body.postId, postId, "Should return the correct postId");
    t.is(response.body.title, "Post 1", "Should return correct post title");

  } catch (error) {
    t.fail(`Test failed: ${error.message}`);
  }
});

/**
 * Test for invalid postId (negative integer)
 * This test verifies that an invalid (negative) postId returns a 400 error with the correct message.
 */
test("Retrieval with invalid postId (Negative Integer)", async (t) => {
  const postId = -1; // Invalid postId (negative)

  try {
    // Attempt to retrieve post with negative postId (should fail)
    const response = await t.context.got.get(`posts/${postId}`);
    t.fail("Expected error for invalid postId");
  } catch (error) {
    // Validate error response
    t.is(error.response.statusCode, 400, "Negative postId should return 400");
    t.is(error.response.body.message, "'postId' must be a positive integer.", "Correct error message should be returned");
  }
});

/**
 * Test for invalid postId (non-numeric string)
 * This test verifies that a non-numeric postId returns a 400 error with the correct message.
 */
test("Retrieval with invalid postId (Non-Numeric)", async (t) => {
  const postId = "invalid"; // Invalid postId (non-numeric)

  try {
    // Attempt to retrieve post with non-numeric postId (should fail)
    const response = await t.context.got.get(`posts/${postId}`);
    t.fail("Expected error for non-numeric postId");
  } catch (error) {
    // Validate error response
    t.is(error.response.statusCode, 400, "Non-numeric postId should return 400");
    t.is(error.response.body.message, "request.params.postId should be integer", "Correct error message should be returned");
  }
});

/**
 * Test for retrieving a non-existent post
 * This test verifies that a request for a non-existent postId returns a 404 error with the correct message.
 */
test("Retrieval of posts for non-existent postId", async (t) => {
  const postId = 9999; // Non-existent postId

  try {
    // Attempt to retrieve a post with a non-existent postId (should fail)
    const response = await t.context.got.get(`posts/${postId}`);
    t.fail("Expected error for non-existent postId");
  } catch (error) {
    // Validate error response
    t.is(error.response.statusCode, 404, "Non-existent postId should return 404");
    t.is(error.response.body.error, "Post not found", "Correct error message should be returned");
  }
});
