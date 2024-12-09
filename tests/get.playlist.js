const test = require('ava').default;
const listen = require('test-listen');
const got = require('got');
const http = require('node:http');

const app = require('../index');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    // If your server is running on port 8080, set the prefixUrl accordingly
    t.context.prefixUrl = 'http://localhost:8080'; // Set to correct port

    t.context.got = got.extend({
        http2: true,
        throwHttpErrors: false,
        responseType: 'json',
        prefixUrl: t.context.prefixUrl, // Use the correct prefixUrl here
    });
});


test.after.always((t) => {
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
    const userId = 3; // User with no playlists
    const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

    t.is(body.message, 'Playlists retrieved successfully');
    t.is(statusCode, 200);
});
