/* jshint node: true */
"use strict";

var util = require('util');
var path = require('path');
var Bot = require('slackbots');
var connect4Game = require('./connect4Game');

var Connect4Bot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'connect4';

  this.ongoingGames = [];
  this.user = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(Connect4Bot, Bot);

Connect4Bot.prototype._onStart = function () {
  this._loadBotUser();
  this._setGeneralChannel();
};

Connect4Bot.prototype._onMessage = function (message) {
  if (this._isChatMessage(message) &&
    !this._isFromBot(message) &&
    message.channel !== this.generalChannel
  ) {
    this._checkActions(message);
  }
};

Connect4Bot.prototype._checkActions = function (message) {
  console.log(message);
  if (message.text.match(/play/)) {
    this._initializeGame(message);
  } else if (message.text.match(/^\d$/)) {
    var game = this._findGame(message.user);
    var column = Number(message.text) - 1;
    if (game && game.processMove(game.activePlayer, column)) {
      if (game.winner) {
        this._endGame(game);
      } else {
        this.postMessageToUser(
          game.activePlayer.username,
          game.renderBoard(),
          {username: this.user.name}
        );
      }
    }
  }
};

Connect4Bot.prototype._deleteGame = function (game) {
  var idx = 0;
  for (idx; idx < this.ongoingGames.length; idx++) {
    if (game === this.ongoinGames[idx]) {
      break;
    }
  }
  this.ongoingGames.splice(idx, 1);
};

Connect4Bot.prototype._endGame = function (game) {
  // message all parties & general that the game is over
  this.postMessageToUser(
    game.activePlayer.username,
    game.renderBoard(),
    {username: this.user.name}
  );
  this.postMessageToUser(
    game.nonActivePlayer.username,
    game.renderBoard(),
    {username: this.user.name}
  );
  this.postMessageToChannel(
    'general',
    game.renderBoard(),
    {username: this.user.name}
  );
  // splice game out of list
  this._deleteGame(game);
};

Connect4Bot.prototype._findGame = function (userId) {
  for (var idx = 0; idx < this.ongoingGames.length; idx++) {
    if (this.ongoingGames[idx].activePlayer.user === userId && !this.ongoingGames[idx].winner) {
      return this.ongoingGames[idx];
    }
  }
  return null;
};

Connect4Bot.prototype._findUserFromId = function (id) {
  var users =  this.users.filter(function (user) {
    return user.id === id;
  });
  return users[0];
};

Connect4Bot.prototype._initializeGame = function (message) {
  var startingPlayer = {
    color: ':red_circle:',
    user: message.user,
    username: this._findUserFromId(message.user).name
  };
  var secondPlayerUser = message.text.split(/\s+/)[1];
  secondPlayerUser = secondPlayerUser.slice(2, secondPlayerUser.length - 1);
  var secondPlayer = {
    color: ':large_blue_circle:',
    user: secondPlayerUser,
    username: this._findUserFromId(secondPlayerUser).name
  };
  var newGame = new connect4Game({
    activePlayer: startingPlayer,
    nonActivePlayer: secondPlayer
  });
  this.ongoingGames.push(newGame);
  this.postMessageToUser(
    startingPlayer.username,
    newGame.renderBoard(),
    {username: this.user.name}
  );
  this.postMessageToUser(
    secondPlayer.username,
    startingPlayer.username + " has challenged you to a game of Connect 4!",
    {username: this.user.name}
  );
};

Connect4Bot.prototype._loadBotUser = function () {
  var self = this;
  this.user = this.users.filter(function (user) {
    return user.name === self.name;
  })[0];
};

Connect4Bot.prototype._isChatMessage = function (message) {
  return message.type === 'message' && Boolean(message.text);
};

Connect4Bot.prototype._isFromBot = function (message) {
  return message.user === this.user || message.username === this.user.name;
};

Connect4Bot.prototype._setGeneralChannel = function () {
  var generalChannel = this.getChannelId('general');
  var self = this;
  generalChannel.then( function (value) {
    this.generalChannel = value;
  }.bind(self));
};

Connect4Bot.prototype.run = function () {
  Connect4Bot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
};

module.exports = Connect4Bot;
