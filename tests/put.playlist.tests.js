const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");

/**
 * Opens server, before tests.
 */
test.before(async (t) => {
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({
    responseType: "json",
    prefixUrl: `http://localhost:${port}`,
  });
});

/**
 * Closes server, after tests.
 */
test.after.always(async (t) => {
  t.context.server.close();
});


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