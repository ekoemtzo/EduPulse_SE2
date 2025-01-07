const test = require("ava");

// DELETE tests
// Test case to validate successful deletion of a playlist for a valid user and playlist ID
test('DELETE /user/:userId/playlist/:playlistId returns correct response and status code', async (t) => {
  const userId = 1001; // Example user ID
  const playlistId = 123456; // Example playlist ID
  const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

  // Assert that the response message confirms successful deletion
  t.is(body.message, 'Playlist deleted successfully');
  // Assert that the HTTP status code is 200 (OK)
  t.is(statusCode, 200);
});

// Test case to validate error handling when the user does not exist
test('DELETE /user/:userId/playlist/:playlistId returns error when user not found', async (t) => {
  const userId = 999; // Non-existent user ID
  const playlistId = 123456; // Example playlist ID
  try {
    await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);
  } catch (error) {
    // Assert that the error message indicates the user is not found
    t.is(error.response.body.message, 'User not found');
    // Assert that the HTTP status code is 404 (Not Found)
    t.is(error.response.statusCode, 404);
  }
});

// Test case to validate error handling when the playlist does not exist
test('DELETE /user/:userId/playlist/:playlistId returns error when playlist not found', async (t) => {
  const userId = 1001; // Valid user ID
  const playlistId = 999999; // Non-existent playlist ID
  try {
    await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);
  } catch (error) {
    // Assert that the error message indicates the playlist is not found
    t.is(error.response.body.message, 'Playlist not found');
    // Assert that the HTTP status code is 404 (Not Found)
    t.is(error.response.statusCode, 404);
  }
});
