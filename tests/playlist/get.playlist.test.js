const test = require("ava");

// GET tests

// Test case to validate successful retrieval of playlists for a valid user ID
test('GET /user/:userId/playlist returns correct response and status code', async (t) => {
  const userId = 1001; // Example user ID
  const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

  // Assert that the response message confirms playlists were retrieved successfully
  t.is(body.message, 'Playlists retrieved successfully');
  // Assert that the HTTP status code is 200 (OK)
  t.is(statusCode, 200);
});

// Test case to validate error handling when the user does not exist
test('GET /user/:userId/playlist returns error when user not found', async (t) => {
  const userId = 999; // Non-existent user ID
  try {
    // Attempt to retrieve playlists for a non-existent user
    const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);
  } catch (error) {
    // Assert that the error message indicates the user is not found
    t.is(error.response.body.message, 'User not found');
    // Assert that the HTTP status code is 404 (Not Found)
    t.is(error.response.statusCode, 404);
  }
});

// Test case to validate behavior when a valid user has no playlists
test('GET /user/:userId/playlist returns empty array when user has no playlists', async (t) => {
  const userId = 1002; // Valid user ID with no playlists
  try {
    // Attempt to retrieve playlists for a user with no playlists
    const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);
  } catch (error) {
    // Assert that the error message indicates no playlists were found
    t.is(error.response.body.message, 'No playlists found for this user');
    // Assert that the HTTP status code is 404 (Not Found)
    t.is(error.response.statusCode, 404);
  }
});
