/* jshint node: true */
"use strict";

var util = require('util');
var path = require('path');
var Bot = require('slackbots');

var Connect4Bot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'connect4';

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
  return message.user === this.user;
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
