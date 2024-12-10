const test = require('ava').default;
const listen = require('test-listen');
const got = require('got');
const http = require('node:http');

const app = require('../index');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = 'http://localhost:8080';
    t.context.got = got.extend({
        http2: true,
        throwHttpErrors: false,
        responseType: 'json',
        prefixUrl: t.context.prefixUrl,
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
    const userId = 2;
    const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

    t.is(body.message, 'No playlists found for this user');
    t.is(statusCode, 200);
});
