'use strict';

var utils = require('../utils/writer.js');
var Playlist = require('../service/PlaylistService');

module.exports.createPlaylist = function createPlaylist (_, res, _, body) {
  Playlist.createPlaylist(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePlaylist = function deletePlaylist (_, res, _, userId, playlistId) {
  Playlist.deletePlaylist(userId, playlistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editPlaylist = function editPlaylist (_, res, _, body, userId, playlistId) {
  Playlist.editPlaylist(body, userId, playlistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showUserPlaylists = function showUserPlaylists (_, res, _, userId) {
  Playlist.showUserPlaylists(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
