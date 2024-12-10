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


// POST tests
test('POST /playlist creates a new playlist successfully', async (t) => {
    const userId = 1;
    const newPlaylist = { 
        userId: userId,
        name: 'New Playlist'
    };
    const { body, statusCode } = await t.context.got.post('playlist', { json: newPlaylist });

    t.is(body.message, 'Playlist created successfully');
    t.is(statusCode, 200);
});

test('POST /playlist returns error when user not found', async (t) => {
    const userId = 999;
    const newPlaylist = { 
        userId: userId,
        name: 'New Playlist'
    };
    const { body, statusCode } = await t.context.got.post('playlist', { json: newPlaylist });

    t.is(body.message, 'User not found');
    t.is(statusCode, 200);
});

test('POST /playlist returns error when name is missing', async (t) => {
    const userId = 1;
    const newPlaylist = { userId: userId };
    const { body, statusCode } = await t.context.got.post('playlist', { json: newPlaylist });

    t.is(body.message, 'Playlist name is required');
    t.is(statusCode, 200);
});
