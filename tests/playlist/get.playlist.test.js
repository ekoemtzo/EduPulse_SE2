const test = require("ava");

// GET tests
test('GET /user/:userId/playlist returns correct response and status code', async (t) => {
  const userId = 1001;
  const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

  t.is(body.message, 'Playlists retrieved successfully');
  t.is(statusCode, 200);
});

test('GET /user/:userId/playlist returns error when user not found', async (t) => {
  const userId = 999;
  try {
    const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);
  } catch (error) {
    t.is(error.response.body.message, 'User not found');
    t.is(error.response.statusCode, 404); 
  }
});

test('GET /user/:userId/playlist returns empty array when user has no playlists', async (t) => {
  const userId = 1002;
  try{
  const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);
  } catch(error) {
    t.is(error.response.body.message, 'No playlists found for this user');
    t.is(error.response.statusCode, 404);
  }
});