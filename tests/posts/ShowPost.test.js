const test = require('ava');

test("Successful retrieval of post (Happy Path)", async (t) => {
  const postId = 1; // Valid postId
  const response = await t.context.got.get(`posts/${postId}`);
  t.is(response.statusCode, 200, "Should return status 200 for valid postId");
  t.is(response.body.postId, postId, "Should return the correct postId");
  t.is(response.body.title, "Post 1", "Should return correct post title");
});

test("Retrieval with invalid postId (Negative Integer)", async (t) => {
  const postId = -1; // Invalid postId (negative)
  try {
    const response = await t.context.got.get(`posts/${postId}`);
    t.fail("Expected error for invalid postId");
  } catch (error) {
    t.is(error.response.statusCode, 400, "Negative postId should return 400");
    t.is(error.response.body.message, "'postId' must be a positive integer.", "Correct error message should be returned");
  }
});

test("Retrieval with invalid postId (Non-Numeric)", async (t) => {
  const postId = "invalid"; // Invalid postId (non-numeric)
  try {
    const response = await t.context.got.get(`posts/${postId}`);
    t.fail("Expected error for non-numeric postId");
  } catch (error) {
    t.is(error.response.statusCode, 400, "Non-numeric postId should return 400");
    t.is(error.response.body.message, "request.params.postId should be integer", "Correct error message should be returned");
  }
});

test("Retrieval of posts for non-existent postId", async (t) => {
  const postId = 9999; // Non-existent postId
  try {
    const response = await t.context.got.get(`posts/${postId}`);
    t.fail("Expected error for non-existent postId");
  } catch (error) {
    t.is(error.response.statusCode, 404, "Non-existent postId should return 404");
    t.is(error.response.body.error, "Post not found", "Correct error message should be returned");
  }
});
