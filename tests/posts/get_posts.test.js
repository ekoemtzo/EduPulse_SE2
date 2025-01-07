const test = require('ava');

/**
 * Test for invalid userId (negative number)
 * This test checks the scenario where a user ID is negative, which is invalid.
 */
test("Retrieval with invalid userId (Negative Integer)", async (t) => {
  const userId = -1; // Invalid user ID (negative integer)

  try {
    // Attempt to retrieve posts for the invalid userId
    const response = await t.context.got.get(`user/${userId}/posts`);
    t.fail("Expected error for invalid userId"); // Test should fail if no error is thrown
  } catch (error) {
    // Asserting that the status code is 400, indicating a bad request
    t.is(error.response.statusCode, 400, "Negative userId should return 400");
    // Asserting the correct error message indicating that the userId must be a positive integer
    t.is(error.response.body.message, "'userId' must be a positive integer.", "Correct error message should be returned");
  }
});

/**
 * Test for non-existent userId
 * This test simulates the case where the userId provided does not exist in the database.
 */
test("Retrieval of posts for non-existent user", async (t) => {
  const userId = 9999; // A non-existent user ID

  try {
    // Attempt to retrieve posts for a non-existent userId
    const response = await t.context.got.get(`user/${userId}/posts`);
    t.fail("Expected error for non-existent userId"); // Test should fail if no error is thrown
  } catch (error) {
    // Asserting that the status code is 404, indicating that the user was not found
    t.is(error.response.statusCode, 404, "Non-existent userId should return 404");
    // Asserting the correct error message indicating the user was not found
    t.is(error.response.body.error, "User not found", "Correct error message should be returned");
  }
});

/**
 * Test for valid userId (Happy Path)
 * This test checks the successful scenario where a valid userId is provided.
 */
test("Retrieval of posts for valid userId", async (t) => {
  const userId = 1; // A valid user ID (make sure this user exists in the test database)

  // Sending GET request to retrieve posts for the valid userId
  const response = await t.context.got.get(`user/${userId}/posts`);
  
  // Asserting that the response status code is 200, indicating successful retrieval
  t.is(response.statusCode, 200, "Valid userId should return status 200");
  
  // Asserting that the response body is an array, as it should contain a list of posts
  t.true(Array.isArray(response.body), "Response body should be an array of posts");
});
