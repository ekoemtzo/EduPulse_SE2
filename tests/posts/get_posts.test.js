const test = require('ava');

/**
 * Test for invalid userId (negative number)
 */
test("Retrieval with invalid userId (Negative Integer)", async (t) => {
  const userId = -1;

  try {
    const response = await t.context.got.get(`user/${userId}/posts`);
    t.fail("Expected error for invalid userId");
  } catch (error) {
    t.is(error.response.statusCode, 400, "Negative userId should return 400");
    t.is(error.response.body.message, "'userId' must be a positive integer.", "Correct error message should be returned");
  }
});

/**
 * Test for non-existent userId
 */
test("Retrieval of posts for non-existent user", async (t) => {
  const userId = 9999; // A non-existent user ID

  try {
    const response = await t.context.got.get(`user/${userId}/posts`);
    t.fail("Expected error for non-existent userId");
  } catch (error) {
    t.is(error.response.statusCode, 404, "Non-existent userId should return 404");
    t.is(error.response.body.error, "User not found", "Correct error message should be returned");
  }
});

/**
 * Test for valid userId (Happy Path)
 */
test("Retrieval of posts for valid userId", async (t) => {
  const userId = 1; // A valid user ID (you should make sure this user exists in your test database)

  const response = await t.context.got.get(`user/${userId}/posts`);
  t.is(response.statusCode, 200, "Valid userId should return status 200");
  t.true(Array.isArray(response.body), "Response body should be an array of posts");
});
