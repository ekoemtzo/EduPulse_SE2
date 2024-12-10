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
