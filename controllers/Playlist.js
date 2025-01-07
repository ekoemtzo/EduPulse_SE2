'use strict'; // Enforces strict mode

// Importing the utility module for writing JSON responses
var utils = require('../utils/writer.js');

// Importing the PlaylistService
var Playlist = require('../service/PlaylistService');

module.exports.createPlaylist = function createPlaylist (__, res, _ , body) {
  // Calls the createPlaylist method from PlaylistService, passing the request body.
  Playlist.createPlaylist(body)
    .then(function (response) {
      // Sends the response back to the client in JSON format on successful operation.
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Sends an error response back to the client in JSON format if the operation fails.
      utils.writeJson(res, response);
    });
};

module.exports.deletePlaylist = function deletePlaylist (__, res, _, userId, playlistId) {
  // Calls the deletePlaylist method from PlaylistService, passing the userId and playlistId.
  Playlist.deletePlaylist(userId, playlistId)
    .then(function (response) {
      // Sends the response back to the client in JSON format on successful operation.
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Sends an error response back to the client in JSON format if the operation fails.
      utils.writeJson(res, response);
    });
};

module.exports.editPlaylist = function editPlaylist (__, res, _, body, userId, playlistId) {
  // Calls the editPlaylist method from PlaylistService, passing the request body, userId and playlistId.
  Playlist.editPlaylist(body, userId, playlistId)
    .then(function (response) {
      // Sends the response back to the client in JSON format on successful operation.
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Sends an error response back to the client in JSON format if the operation fails.
      utils.writeJson(res, response);
    });
};

module.exports.showUserPlaylists = function showUserPlaylists (__, res, _, userId) { 
  // Calls the showUserPlaylists method from PlaylistService, passing the userId.
  Playlist.showUserPlaylists(userId)
    .then(function (response) {
      // Sends the response back to the client in JSON format on successful operation.
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Sends an error response back to the client in JSON format if the operation fails.
      utils.writeJson(res, response);
    });
};
