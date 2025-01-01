'use strict';

var utils = require('../utils/writer.js');
var Playlist = require('../service/PlaylistService');

module.exports.createPlaylist = function createPlaylist (_req, res, _next, body) {
  Playlist.createPlaylist(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePlaylist = function deletePlaylist (_req, res, _next, userId, playlistId) {
  Playlist.deletePlaylist(userId, playlistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editPlaylist = function editPlaylist (_req, res, _next, body, userId, playlistId) {
  Playlist.editPlaylist(body, userId, playlistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showUserPlaylists = function showUserPlaylists (_req, res, _next, userId) {
  Playlist.showUserPlaylists(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
