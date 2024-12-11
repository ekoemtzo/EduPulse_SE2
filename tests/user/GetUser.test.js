const test = require('ava');

test("Successful retrieval of a user (Happy Path)", async (t) => {
  const userId = 1; // Assuming this userId exists in the database
  const response = await t.context.got.get(`user/${userId}`);
  t.is(response.statusCode, 200, "Should return status 200 for a valid userId");
  t.truthy(response.body.username, "Response should contain a username");
});

test("Retrieval with invalid userId (Negative Integer)", async (t) => {
  const userId = -1; // Invalid userId
  try {
    const response = await t.context.got.get(`user/${userId}`);
    t.fail("Expected error for invalid userId");
  } catch (error) {
    t.is(error.response.statusCode, 400, "Negative userId should return 400");
    t.is(
      error.response.body.message,
      "'userId' must be a positive integer.",
      "Correct error message should be returned"
    );
  }
});

test("Retrieval with non-existent userId", async (t) => {
  const userId = 9999; // Assuming this userId doesn't exist in the database
  try {
    const response = await t.context.got.get(`user/${userId}`);
    t.fail("Expected error for non-existent userId");
  } catch (error) {
    t.is(error.response.statusCode, 404, "Non-existent userId should return 404");
    t.is(
      error.response.body.error,
      "User not found",
      "Correct error message should be returned"
    );
  }
});

test("Retrieval with non-numeric userId", async (t) => {
  const userId = "invalid"; // Non-numeric userId
  try {
    const response = await t.context.got.get(`user/${userId}`);
    t.fail("Expected error for non-numeric userId");
  } catch (error) {
    t.is(error.response.statusCode, 400, "Non-numeric userId should return 400");
    t.is(
      error.response.body.message,
      "request.params.userId should be integer",
      "Correct error message should be returned"
    );
  }
});
