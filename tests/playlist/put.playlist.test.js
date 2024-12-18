const test = require("ava");

// PUT tests
test('PUT /user/:userId/playlist/:playlistId successfully updates playlist', async (t) => {
  const userId = 1001;
  const playlistId = 123456;
  const updateData = { name: 'Updated Playlist' };
  
  const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
      json: updateData
  });

  t.is(body.message, 'Playlist updated successfully');
  t.is(statusCode, 200);
});

test('PUT /user/:userId/playlist/:playlistId returns user not found', async (t) => {
  const userId = 999;
  const playlistId = 123456;
  const updateData = { name: 'Updated Playlist' };
  
  try {
    await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });
  } catch (error) {
    t.is(error.response.body.message, 'User not found');
    t.is(error.response.statusCode, 404);
  }
});

test('PUT /user/:userId/playlist/:playlistId returns playlist not found', async (t) => {
  const userId = 1001;
  const playlistId = 999999;
  const updateData = { name: 'Updated Playlist' };
  
  try {
    await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });
  } catch (error) {
    t.is(error.response.body.message, 'Playlist not found');
    t.is(error.response.statusCode, 404);
  }
});