'use strict';
const { respondWithCode } = require("../utils/writer");

const mockData = {
  Playlist: {
    details: {
      title: "Chill Vibes Playlist",
      description: "A playlist full of chill and relaxing music for unwinding.",
      category: "Relaxation",
      visibility: "Private"
    },
    posts: [
      {
        file: "path/to/songfile1.mp3",
        postAuthorId: 101,
        details: {
          form: "audio",
          title: "Summer Breeze",
          category: "Chill",
          description: "A soothing track perfect for a sunny afternoon.",
          visibility: "Public",
          commentsection: true,
          picture: "path/to/albumcover1.jpg"
        },
        postId: 1
      },
      {
        file: "path/to/songfile2.mp3",
        postAuthorId: 102,
        details: {
          form: "audio",
          title: "Ocean Waves",
          category: "Relaxation",
          description: "A calming instrumental to help you meditate.",
          visibility: "Private",
          commentsection: false,
          picture: "path/to/albumcover2.jpg"
        },
        postId: 2
      }
    ],
    playlistAuthorId: 1001,
    playlistId: 123456,
  }
};

const mockUsers = {
  users:[
  {userId: 1000},
  {userId: 1001},
  {userId: 1002},
]
};

exports.createPlaylist = function(body) {
  return new Promise(function(resolve, reject) {
    try {
      if (!body || !body.name) {
        reject(respondWithCode(400, { message: 'Playlist name is required' }));
        return;
      }

      if (parseInt(body.userId) !== mockData.Playlist.playlistAuthorId) {
        reject(respondWithCode(404, { message: 'User not found' }));
        return;
      }

      const newPlaylist = {
        playlistId: 103,
        details: {
          title: body.name,
          description: "",
          category: "",
          visibility: "Private"
        },
        posts: [],
        playlistAuthorId: parseInt(body.userId)
      };

      mockData.Playlist = newPlaylist;
      resolve(respondWithCode(201, {
        message: 'Playlist created successfully',
        playlist: newPlaylist
      }));
    } catch (error) { reject(error); }
  });
};


exports.deletePlaylist = function(userId, playlistId) {
  return new Promise(function(resolve, reject) {
    try {
      if( userId !== mockData.Playlist.playlistAuthorId) {
        return reject(respondWithCode(404, { message: 'User not found' }));
      }
      if (!mockData.Playlist || playlistId !== mockData.Playlist.playlistId) {
        return reject(respondWithCode(404, { message: 'Playlist not found' }));
      }

      // for the purpose of this project we will not be really deleting the playlist 
      // in the mock data, so that it can be used in many different tests

      resolve(respondWithCode(200, { message: 'Playlist deleted successfully' }));
    } catch (error) { reject(error); }
  });
};


exports.editPlaylist = function(body, userId, playlistId) {
  return new Promise(function(resolve, reject) {
    try {
      if (parseInt(userId) !== mockData.Playlist.playlistAuthorId) {
        reject(respondWithCode(404, { message: 'User not found' }));
        return;
      }
      if (!mockData.Playlist || parseInt(playlistId) !== mockData.Playlist.playlistId) {
        reject(respondWithCode(404, { message: 'Playlist not found' }));
        return;
      }

      mockData.Playlist.details.title = body.name;
      resolve(respondWithCode(200, {
        message: 'Playlist updated successfully',
        playlist: mockData.Playlist
      }));
    } catch (error) { reject(error); }
  });
};


exports.showUserPlaylists = function(userId) {
  return new Promise(function(resolve, reject) {
    try {
      if ( !mockUsers.users.some((user) => user.userId === userId) ) {
        return reject(respondWithCode(404, { message: 'User not found' }));
      }

      if (userId !== mockData.Playlist.playlistAuthorId) {
        return reject(respondWithCode(404, {
          message: 'No playlists found for this user',
          playlists: []
        }));
      }

      resolve(respondWithCode(200, {
        message: 'Playlists retrieved successfully',
        playlists: [mockData.Playlist]
      }));
    } catch (error) { reject(error); }
  });
};