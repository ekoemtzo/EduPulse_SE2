'use strict';

var utils = require('../utils/writer.js');
var Playlist = require('../service/PlaylistService');

module.exports.createPlaylist = function createPlaylist (_, res, __, body) {
  Playlist.createPlaylist(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePlaylist = function deletePlaylist (_, res, __, userId, playlistId) {
  Playlist.deletePlaylist(userId, playlistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editPlaylist = function editPlaylist (_, res, __, body, userId, playlistId) {
  Playlist.editPlaylist(body, userId, playlistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showUserPlaylists = function showUserPlaylists (_, res, __, userId) {
  Playlist.showUserPlaylists(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
