const test = require("ava");

// POST tests

// Test case to validate successful creation of a new playlist for a valid user
test('POST /playlist creates a new playlist successfully', async (t) => {
  const userId = 1001; // Example valid user ID
  const newPlaylist = { 
    userId: userId,  // Assigning user ID to the new playlist
    name: 'New Playlist' // Playlist name
  };
  // Send POST request to create a new playlist
  const { body, statusCode } = await t.context.got.post('playlist', { json: newPlaylist });

  // Assert that the response message confirms successful creation
  t.is(body.message, 'Playlist created successfully');
  // Assert that the HTTP status code is 201 (Created)
  t.is(statusCode, 201);
});

// Test case to validate error handling when the user does not exist
test('POST /playlist returns error when user not found', async (t) => {
  const userId = 999; // Non-existent user ID
  const newPlaylist = { 
    userId: userId,  // Assigning invalid user ID to the playlist
    name: 'New Playlist' // Playlist name
  };
  try {
    // Attempt to create a playlist for a non-existent user
    await t.context.got.post('playlist', { json: newPlaylist });
  } catch (error) {
    // Assert that the error message indicates the user is not found
    t.is(error.response.body.message, 'User not found');
    // Assert that the HTTP status code is 404 (Not Found)
    t.is(error.response.statusCode, 404);
  }
});

// Test case to validate error handling when the playlist name is missing
test('POST /playlist returns error when name is missing', async (t) => {
  const userId = 1001; // Example valid user ID
  const newPlaylist = { userId: userId }; // Missing the "name" field
  try {
    // Attempt to create a playlist without providing a name
    await t.context.got.post('playlist', { json: newPlaylist });
  } catch (error) {
    // Assert that the error message indicates the playlist name is required
    t.is(error.response.body.message, 'Playlist name is required');
    // Assert that the HTTP status code is 400 (Bad Request)
    t.is(error.response.statusCode, 400);
  }
});
