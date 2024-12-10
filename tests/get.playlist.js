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


// GET tests
test('GET /user/:userId/playlist returns correct response and status code', async (t) => {
    const userId = 1;
    const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

    t.is(body.message, 'Playlists retrieved successfully');
    t.is(statusCode, 200);
});

test('GET /user/:userId/playlist returns error when user not found', async (t) => {
    const userId = 999;
    const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

    t.is(body.message, 'User not found');
    t.is(statusCode, 200);
});

test('GET /user/:userId/playlist returns empty array when user has no playlists', async (t) => {
    const userId = 2;
    const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

    t.is(body.message, 'No playlists found for this user');
    t.is(statusCode, 200);
});
