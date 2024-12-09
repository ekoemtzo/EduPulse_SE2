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

// DELETE tests
test('DELETE /user/:userId/playlist/:playlistId returns correct response and status code', async (t) => {
    const userId = 1;
    const playlistId = 101;
    const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

    t.is(body.message, 'Playlist deleted successfully');
    t.is(statusCode, 200);
});

test('DELETE /user/:userId/playlist/:playlistId returns error when user not found', async (t) => {
    const userId = 999; // Non-existent user
    const playlistId = 101;
    const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

    t.is(body.message, 'User not found');
    t.is(statusCode, 200);
});

test('DELETE /user/:userId/playlist/:playlistId returns error when playlist not found', async (t) => {
    const userId = 1;
    const playlistId = 999; // Non-existent playlist
    const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

    t.is(body.message, 'Playlist not found');
    t.is(statusCode, 200);
});