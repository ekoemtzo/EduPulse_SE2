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


// PUT tests
test('PUT /user/:userId/playlist/:playlistId successfully updates playlist', async (t) => {
    const userId = 1;
    const playlistId = 101;
    const updateData = { name: 'Updated Playlist' };
    
    const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });

    t.is(body.message, 'Playlist updated successfully');
    t.is(statusCode, 200);
});

test('PUT /user/:userId/playlist/:playlistId returns user not found', async (t) => {
    const userId = 999; 
    const playlistId = 301;
    const updateData = { name: 'Updated Playlist' };
    
    const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });

    t.is(body.message, 'User not found');
    t.is(statusCode, 200);
});

test('PUT /user/:userId/playlist/:playlistId returns playlist not found', async (t) => {
    const userId = 1;
    const playlistId = 999;
    const updateData = { name: 'Updated Playlist' };
    
    const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });

    t.is(body.message, 'Playlist not found');
    t.is(statusCode, 200);
});
