const test = require("ava");

// PUT tests

// Test case to validate successful update of a playlist for a valid user and playlist ID
test('PUT /user/:userId/playlist/:playlistId successfully updates playlist', async (t) => {
  const userId = 1001; // Valid user ID
  const playlistId = 123456; // Valid playlist ID
  const updateData = { name: 'Updated Playlist' }; // Data to update the playlist name

  // Send PUT request to update the playlist
  const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
      json: updateData
  });

  // Assert that the response message confirms the playlist was updated successfully
  t.is(body.message, 'Playlist updated successfully');
  // Assert that the HTTP status code is 200 (OK)
  t.is(statusCode, 200);
});

// Test case to validate error handling when the user does not exist
test('PUT /user/:userId/playlist/:playlistId returns user not found', async (t) => {
  const userId = 999; // Non-existent user ID
  const playlistId = 123456; // Example playlist ID
  const updateData = { name: 'Updated Playlist' }; // Data to update the playlist name

  try {
    // Attempt to update a playlist for a non-existent user
    await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });
  } catch (error) {
    // Assert that the error message indicates the user is not found
    t.is(error.response.body.message, 'User not found');
    // Assert that the HTTP status code is 404 (Not Found)
    t.is(error.response.statusCode, 404);
  }
});

// Test case to validate error handling when the playlist does not exist
test('PUT /user/:userId/playlist/:playlistId returns playlist not found', async (t) => {
  const userId = 1001; // Valid user ID
  const playlistId = 999999; // Non-existent playlist ID
  const updateData = { name: 'Updated Playlist' }; // Data to update the playlist name

  try {
    // Attempt to update a non-existent playlist for a valid user
    await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });
  } catch (error) {
    // Assert that the error message indicates the playlist is not found
    t.is(error.response.body.message, 'Playlist not found');
    // Assert that the HTTP status code is 404 (Not Found)
    t.is(error.response.statusCode, 404);
  }
});
