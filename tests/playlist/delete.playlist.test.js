const test = require("ava");

// DELETE tests
test('DELETE /user/:userId/playlist/:playlistId returns correct response and status code', async (t) => {
  const userId = 1001;
  const playlistId = 123456;
  const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

  t.is(body.message, 'Playlist deleted successfully');
  t.is(statusCode, 200);
});

test('DELETE /user/:userId/playlist/:playlistId returns error when user not found', async (t) => {
  const userId = 999;
  const playlistId = 123456;
  try {
    await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);
  } catch (error) {
    t.is(error.response.body.message, 'User not found');
    t.is(error.response.statusCode, 404);
  }
});

test('DELETE /user/:userId/playlist/:playlistId returns error when playlist not found', async (t) => {
  const userId = 1001;
  const playlistId = 999999;
  try {
    await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);
  } catch (error) {
    t.is(error.response.body.message, 'Playlist not found');
    t.is(error.response.statusCode, 404);
  }
});