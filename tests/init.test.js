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


test.after((t) => {
    t.context.server.close();
});


// // DELETE tests
// test('DELETE /user/:userId/playlist/:playlistId returns correct response and status code', async (t) => {
//     const userId = 1;
//     const playlistId = 101;
//     const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

//     t.is(body.message, 'Playlist deleted successfully');
//     t.is(statusCode, 200);
// });

// test('DELETE /user/:userId/playlist/:playlistId returns error when user not found', async (t) => {
//     const userId = 999; // Non-existent user
//     const playlistId = 101;
//     const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

//     t.is(body.message, 'User not found');
//     t.is(statusCode, 200);
// });

// test('DELETE /user/:userId/playlist/:playlistId returns error when playlist not found', async (t) => {
//     const userId = 1;
//     const playlistId = 999; // Non-existent playlist
//     const { body, statusCode } = await t.context.got.delete(`user/${userId}/playlist/${playlistId}`);

//     t.is(body.message, 'Playlist not found');
//     t.is(statusCode, 200);
// });

// // POST tests
// test('POST /playlist creates a new playlist successfully', async (t) => {
//     const userId = 1;
//     const newPlaylist = { 
//         userId: userId,
//         name: 'New Playlist'
//     };
//     const { body, statusCode } = await t.context.got.post('playlist', { json: newPlaylist });

//     t.is(body.message, 'Playlist created successfully');
//     t.is(statusCode, 200);
// });

// test('POST /playlist returns error when user not found', async (t) => {
//     const userId = 999;
//     const newPlaylist = { 
//         userId: userId,
//         name: 'New Playlist'
//     };
//     const { body, statusCode } = await t.context.got.post('playlist', { json: newPlaylist });

//     t.is(body.message, 'User not found');
//     t.is(statusCode, 200);
// });

// test('POST /playlist returns error when name is missing', async (t) => {
//     const userId = 1;
//     const newPlaylist = { userId: userId }; // Add userId but omit name
//     const { body, statusCode } = await t.context.got.post('playlist', { json: newPlaylist });

//     t.is(body.message, 'Playlist name is required');
//     t.is(statusCode, 200);
// });

// // GET tests
// test('GET /user/:userId/playlist returns correct response and status code', async (t) => {
//     const userId = 1;
//     const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

//     t.is(body.message, 'Playlists retrieved successfully');
//     t.is(statusCode, 200);
// });

// test('GET /user/:userId/playlist returns error when user not found', async (t) => {
//     const userId = 999;
//     const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

//     t.is(body.message, 'User not found');
//     t.is(statusCode, 200);
// });

// test('GET /user/:userId/playlist returns empty array when user has no playlists', async (t) => {
//     const userId = 3; // User with no playlists
//     const { body, statusCode } = await t.context.got.get(`user/${userId}/playlist`);

//     t.is(body.message, 'Playlists retrieved successfully');
//     t.is(statusCode, 200);
// });

// // PUT tests
// test('PUT /user/:userId/playlist/:playlistId successfully updates playlist', async (t) => {
//     const userId = 4; // New user for testing
//     const playlistId = 301; // Existing playlist for the new user
//     const updateData = { name: 'Updated Playlist' };
    
//     const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
//         json: updateData
//     });

//     t.is(body.message, 'Playlist updated successfully');
//     t.is(statusCode, 200);
// });

// test('PUT /user/:userId/playlist/:playlistId returns user not found', async (t) => {
//     const userId = 999; // Non-existent user
//     const playlistId = 301; // Existing playlist for a different user
//     const updateData = { name: 'Updated Playlist' };
    
//     const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
//         json: updateData
//     });

//     t.is(body.message, 'User not found');
//     t.is(statusCode, 200);
// });

// test('PUT /user/:userId/playlist/:playlistId returns playlist not found', async (t) => {
//     const userId = 4; // Existing user
//     const playlistId = 999; // Non-existent playlist
//     const updateData = { name: 'Updated Playlist' };
    
//     const { body, statusCode } = await t.context.got.put(`user/${userId}/playlist/${playlistId}`, {
//         json: updateData
//     });

//     t.is(body.message, 'Playlist not found');
//     t.is(statusCode, 200);
// });