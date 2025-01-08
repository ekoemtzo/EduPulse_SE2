'use strict';
const { respondWithCode } = require("../utils/writer");

// Mock data for testing purposes
const mockData = {
  Playlist: {
    details: {
      title: "Chill Vibes Playlist", // Playlist title
      description: "A playlist full of chill and relaxing music for unwinding.", // Description of the playlist
      category: "Relaxation", // Playlist category
      visibility: "Private" // Visibility of the playlist (e.g., Private/Public)
    },
    posts: [ // List of posts (songs) in the playlist
      {
        file: "path/to/songfile1.mp3", // Path to the song file
        postAuthorId: 101, // Author of the post
        details: {
          form: "audio", // Format of the post (e.g., audio, video)
          title: "Summer Breeze", // Title of the post
          category: "Chill", // Category of the post
          description: "A soothing track perfect for a sunny afternoon.", // Description of the post
          visibility: "Public", // Visibility of the post
          commentsection: true, // Whether comments are allowed
          picture: "path/to/albumcover1.jpg" // Path to the album cover picture
        },
        postId: 1 // Unique identifier for the post
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
    playlistAuthorId: 1001, // Author of the playlist
    playlistId: 123456 // Unique identifier for the playlist
  }
};

// Mock user data for testing
const mockUsers = {
  users: [
    { userId: 1000 }, // Example user
    { userId: 1001 }, // Author of the playlist
    { userId: 1002 }  // Another user
  ]
};

// Create a new playlist
exports.createPlaylist = function(body) {
  return new Promise(function(resolve, reject) {
    try {
      if (!body || !body.name) {
        // Reject if the playlist name is missing
        reject(respondWithCode(400, { message: 'Playlist name is required' }));
        return;
      }

      if (parseInt(body.userId) !== mockData.Playlist.playlistAuthorId) {
        // Reject if the user ID doesn't match the playlist author ID
        reject(respondWithCode(404, { message: 'User not found' }));
        return;
      }

      // Create a new playlist object
      const newPlaylist = {
        playlistId: 103, // New playlist ID
        details: {
          title: body.name, // Playlist title
          description: "",
          category: "",
          visibility: "Private"
        },
        posts: [], // Initially no posts in the playlist
        playlistAuthorId: parseInt(body.userId) // Author of the playlist
      };

      // Replace the existing playlist with the new one
      mockData.Playlist = newPlaylist;
      resolve(respondWithCode(201, {
        message: 'Playlist created successfully',
        playlist: newPlaylist
      }));
    } catch (error) {
      reject(error); // Handle unexpected errors
    }
  });
};

// Delete an existing playlist
exports.deletePlaylist = function(userId, playlistId) {
  return new Promise(function(resolve, reject) {
    try {
      if (userId !== mockData.Playlist.playlistAuthorId) {
        // Reject if the user ID doesn't match the playlist author ID
        return reject(respondWithCode(404, { message: 'User not found' }));
      }
      if (!mockData.Playlist || playlistId !== mockData.Playlist.playlistId) {
        // Reject if the playlist doesn't exist
        return reject(respondWithCode(404, { message: 'Playlist not found' }));
      }

      // Playlist deletion is mocked; no actual deletion occurs
      resolve(respondWithCode(200, { message: 'Playlist deleted successfully' }));
    } catch (error) {
      reject(error); // Handle unexpected errors
    }
  });
};

// Edit an existing playlist
exports.editPlaylist = function(body, userId, playlistId) {
  return new Promise(function(resolve, reject) {
    try {
      if (parseInt(userId) !== mockData.Playlist.playlistAuthorId) {
        // Reject if the user ID doesn't match the playlist author ID
        reject(respondWithCode(404, { message: 'User not found' }));
        return;
      }
      if (!mockData.Playlist || parseInt(playlistId) !== mockData.Playlist.playlistId) {
        // Reject if the playlist doesn't exist
        reject(respondWithCode(404, { message: 'Playlist not found' }));
        return;
      }

      // Update the playlist title
      mockData.Playlist.details.title = body.name;
      resolve(respondWithCode(200, {
        message: 'Playlist updated successfully',
        playlist: mockData.Playlist
      }));
    } catch (error) {
      reject(error); // Handle unexpected errors
    }
  });
};

// Retrieve playlists for a specific user
exports.showUserPlaylists = function(userId) {
  return new Promise(function(resolve, reject) {
    try {
      if (!mockUsers.users.some((user) => user.userId === userId)) {
        // Reject if the user doesn't exist
        return reject(respondWithCode(404, { message: 'User not found' }));
      }

      if (userId !== mockData.Playlist.playlistAuthorId) {
        // Reject if no playlists are found for the user
        return reject(respondWithCode(404, {
          message: 'No playlists found for this user',
          playlists: []
        }));
      }

      // Return the playlist(s) for the user
      resolve(respondWithCode(200, {
        message: 'Playlists retrieved successfully',
        playlists: [mockData.Playlist]
      }));
    } catch (error) {
      reject(error); // Handle unexpected errors
    }
  });
};
