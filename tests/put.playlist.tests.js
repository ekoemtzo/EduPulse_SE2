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

// PUT tests
test('PUT /user/:userId/playlist/:playlistId successfully updates playlist', async (t) => {
    const userId = 4; // New user for testing
    const playlistId = 301; // Existing playlist for the new user
    const updateData = { name: 'Updated Playlist' };
    
    const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });

    t.is(body.message, 'Playlist updated successfully');
    t.is(statusCode, 200);
});

test('PUT /user/:userId/playlist/:playlistId returns user not found', async (t) => {
    const userId = 999; // Non-existent user
    const playlistId = 301; // Existing playlist for a different user
    const updateData = { name: 'Updated Playlist' };
    
    const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });

    t.is(body.message, 'User not found');
    t.is(statusCode, 200);
});

test('PUT /user/:userId/playlist/:playlistId returns playlist not found', async (t) => {
    const userId = 4; // Existing user
    const playlistId = 999; // Non-existent playlist
    const updateData = { name: 'Updated Playlist' };
    
    const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
        json: updateData
    });

    t.is(body.message, 'Playlist not found');
    t.is(statusCode, 200);
});