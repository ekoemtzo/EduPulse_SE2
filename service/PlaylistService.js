'use strict';

//mock data to provide different cases for testing
const mockData = {
  users: [
    {
      userId: 1,
      playlists: [
        { playlistId: 101, name: 'Playlist 1' },
        { playlistId: 102, name: 'Playlist 2' }
      ]
    },
    {
      userId: 2, 
      playlists: []
    }
  ]
};

exports.mockData = mockData;


/**
 * Create a playlist
 * FR-4 A logged in user must be able to create a playlist
 *
 * body NewPlaylist 
 * returns Playlist
 **/
exports.createPlaylist = function(body) {
  return new Promise(function(resolve) {
    if (!body || !body.name) {
      return resolve({ 
        message: 'Playlist name is required',
        statusCode: 200 
      });
    }

    const user = mockData.users.find(user => user.userId === parseInt(body.userId));
    if (!user) {
      return resolve({ 
        message: 'User not found',
        statusCode: 200 
      });
    }

    const newPlaylist = { 
      playlistId: 103,
      name: body.name 
    };

    user.playlists.push(newPlaylist);

    return resolve({ 
      message: 'Playlist created successfully',
      playlist: {
        name: body.name
      },
      statusCode: 200 
    });
  });
};


/**
 * Delete a playlist
 * US-11 Edit Playlist
 *
 * userId Long ID of the playlistAuthor
 * playlistId Long ID of the playlist to delete
 * no response value expected for this operation
 **/
exports.deletePlaylist = function(userId, playlistId) {
  return new Promise(function(resolve, reject) {
    const user = mockData.users.find(user => user.userId === parseInt(userId));
    if (!user) {
      return resolve({ message: 'User not found', statusCode: 200 });
    }

    const playlistIndex = user.playlists.findIndex(playlist => playlist.playlistId === parseInt(playlistId));
    if (playlistIndex === -1) {
      return resolve({ message: 'Playlist not found', statusCode: 200 });
    }

    user.playlists.splice(playlistIndex, 1);
    resolve({ message: 'Playlist deleted successfully', statusCode: 400 });
  });
};


/**
 * Edit a playlist
 * FR-12 A logged in user must be able to edit his playlist
 *
 * body NewPlaylist 
 * userId Long ID of the playlistAuthor
 * playlistId Long ID of the playlist to edit
 * returns Playlist
 **/
exports.editPlaylist = function(body, userId, playlistId) {
  return new Promise(function(resolve, reject) {
      const user = mockData.users.find(user => user.userId === parseInt(userId));
      if (!user) {
          return resolve({ message: 'User not found', statusCode: 200 });
      }

      const playlist = user.playlists.find(playlist => playlist.playlistId === parseInt(playlistId));
      if (!playlist) {
          return resolve({ message: 'Playlist not found', statusCode: 200 });
      }

      playlist.name = body.name;
      resolve({ message: 'Playlist updated successfully', playlist, statusCode: 200 });
  });
};


/**
 * Returns all the Playlists of a user
 * US-11 Edit Playlist
 *
 * userId Long ID of the user
 * returns List
 **/
exports.showUserPlaylists = function(userId) {
  return new Promise(function(resolve) {
    const user = mockData.users.find(user => user.userId === parseInt(userId));
    if (!user) {
      return resolve({ 
        message: 'User not found',
        statusCode: 200 
      });
    }

    if (user.playlists.length === 0) {
      return resolve({ 
        message: 'No playlists found for this user',
        playlists: [],
        statusCode: 200 
      });
    }

    return resolve({ 
      message: 'Playlists retrieved successfully',
      playlists: user.playlists,
      statusCode: 200 
    });
  });
};
