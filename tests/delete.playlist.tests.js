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


// DELETE tests
test('DELETE /user/:userId/playlist/:playlistId returns correct response and status code', async (t) => {
    const userId = 1;
    const playlistId = 101;
    const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

    t.is(body.message, 'Playlist deleted successfully');
    t.is(statusCode, 200);
});

test('DELETE /user/:userId/playlist/:playlistId returns error when user not found', async (t) => {
    const userId = 999;
    const playlistId = 101;
    const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

    t.is(body.message, 'User not found');
    t.is(statusCode, 200);
});

test('DELETE /user/:userId/playlist/:playlistId returns error when playlist not found', async (t) => {
    const userId = 1;
    const playlistId = 999; 
    const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

    t.is(body.message, 'Playlist not found');
    t.is(statusCode, 200);
});
