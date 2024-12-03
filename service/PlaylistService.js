'use strict';


/**
 * Create a playlist
 * FR-4 A logged in user must be able to create a playlist
 *
 * body NewPlaylist 
 * returns Playlist
 **/
exports.createPlaylist = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a playlist
 * US-11 Edit Playlist
 *
 * userId Long ID of the playlistAuthor
 * playlistId Long ID of the playlist to delete
 * no response value expected for this operation
 **/
exports.deletePlaylist = function(userId,playlistId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit a playlist
 * FR-12 A logged in user must be able to edit his playlist
 *
 * body NewPlaylist 
 * userId Long ID of the playlistAuthor
 * playlistId Long ID of the playlist to edit
 * returns Playlist
 **/
exports.editPlaylist = function(body,userId,playlistId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns all the Playlists of a user
 * US-11 Edit Playlist
 *
 * userId Long ID of the user
 * returns List
 **/
exports.showUserPlaylists = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "", "" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

