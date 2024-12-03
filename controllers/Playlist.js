'use strict';

var utils = require('../utils/writer.js');
var Playlist = require('../service/PlaylistService');

module.exports.createPlaylist = function createPlaylist (req, res, next, body) {
  Playlist.createPlaylist(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePlaylist = function deletePlaylist (req, res, next, userId, playlistId) {
  Playlist.deletePlaylist(userId, playlistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editPlaylist = function editPlaylist (req, res, next, body, userId, playlistId) {
  Playlist.editPlaylist(body, userId, playlistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showUserPlaylists = function showUserPlaylists (req, res, next, userId) {
  Playlist.showUserPlaylists(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
