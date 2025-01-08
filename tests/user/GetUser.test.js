const test = require('ava');

// Test for successful retrieval of a user (Happy Path)
test("Successful retrieval of a user (Happy Path)", async (t) => {
  const userId = 1; // Assuming this userId exists in the database
  // Make a GET request to retrieve the user details
  const response = await t.context.got.get(`user/${userId}`);
  
  // Check that the status code is 200 for a valid userId
  t.is(response.statusCode, 200, "Should return status 200 for a valid userId");
  
  // Ensure the response body contains a username
  t.truthy(response.body.username, "Response should contain a username");
});

// Test for retrieval with an invalid userId (Negative Integer)
test("Retrieval with invalid userId (Negative Integer)", async (t) => {
  const userId = -1; // Invalid userId (negative integer)

  try {
    // Attempt to make a GET request with an invalid userId
    const response = await t.context.got.get(`user/${userId}`);
    // If no error is thrown, fail the test
    t.fail("Expected error for invalid userId");
  } catch (error) {
    // Verify that the response status code is 400 for a negative userId
    t.is(error.response.statusCode, 400, "Negative userId should return 400");
    
    // Confirm the error message matches the expected text
    t.is(
      error.response.body.message,
      "'userId' must be a positive integer.",
      "Correct error message should be returned"
    );
  }
});

// Test for retrieval with a non-existent userId
test("Retrieval with non-existent userId", async (t) => {
  const userId = 9999; // Assuming this userId doesn't exist in the database

  try {
    // Attempt to make a GET request for a non-existent userId
    const response = await t.context.got.get(`user/${userId}`);
    // If no error is thrown, fail the test
    t.fail("Expected error for non-existent userId");
  } catch (error) {
    // Verify that the response status code is 404 for a non-existent userId
    t.is(error.response.statusCode, 404, "Non-existent userId should return 404");
    
    // Confirm the error message matches the expected text
    t.is(
      error.response.body.error,
      "User not found",
      "Correct error message should be returned"
    );
  }
});

// Test for retrieval with a non-numeric userId
test("Retrieval with non-numeric userId", async (t) => {
  const userId = "invalid"; // Non-numeric userId

  try {
    // Attempt to make a GET request with a non-numeric userId
    const response = await t.context.got.get(`user/${userId}`);
    // If no error is thrown, fail the test
    t.fail("Expected error for non-numeric userId");
  } catch (error) {
    // Verify that the response status code is 400 for a non-numeric userId
    t.is(error.response.statusCode, 400, "Non-numeric userId should return 400");
    
    // Confirm the error message matches the expected text
    t.is(
      error.response.body.message,
      "request.params.userId should be integer",
      "Correct error message should be returned"
    );
  }
});
