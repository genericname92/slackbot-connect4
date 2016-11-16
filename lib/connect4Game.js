/* jshint node: true */
"use strict";

var util = require('util');
var path = require('path');
var BOARD_SIZE = 7;
var EMPTY_SQUARE = ':white_large_square:';

var Connect4Game = function Constructor (settings) {
  this.activePlayer = settings.activePlayer;
  this.nonActivePlayer = settings.nonActivePlayer;
  this._initializeBoard();
};

Connect4Game.prototype.processMove = function (player, column) {
  if (player === this.activePlayer && this.setMove(player, column)) {
    if (!this._isWinner(player)) {
      this.switchActivePlayer();
    }
    return true;
  }
  return false;
};

Connect4Game.prototype.renderBoard = function () {
  var message = "";
  if (this.winner) {
    message += "Game Over! @" + this.winner.username + " has won vs @" + this.nonActivePlayer.username + "\n";
  }
  for (var numRow = 0; numRow < BOARD_SIZE; numRow++) {
    for (var numColumn = 0; numColumn < BOARD_SIZE; numColumn++) {
      message += this.gameState[numRow][numColumn];
    }
    message += "\n";
  }
  if (!this.winner) {
    message += "Make your move. Choose a # between 1-7 to select a column";
  }
  return message;
};

Connect4Game.prototype.setMove = function (player, column) {
  for (var numRow = BOARD_SIZE - 1; numRow >= 0; numRow--) {
    if (this.gameState[numRow][column] === EMPTY_SQUARE) {
      this.gameState[numRow][column] = player.color;
      return true;
    }
  }
  return false;
};

Connect4Game.prototype.switchActivePlayer = function () {
  var temp = this.activePlayer;
  this.activePlayer = this.nonActivePlayer;
  this.nonActivePlayer = temp;
};

Connect4Game.prototype._initializeBoard = function () {
  this.gameState = [];
  for (var numRows = 0; numRows < BOARD_SIZE; numRows++) {
    var row = [];
    for (var point = 0; point < BOARD_SIZE; point++) {
      row.push(EMPTY_SQUARE);
    }
    this.gameState.push(row);
  }
};

Connect4Game.prototype._checkDiagonalWins = function (player) {
  /* top left to bottom right*/
  for (var numRow = 0; numRow < BOARD_SIZE - 3; numRow++) {
    for (var numColumn = 0; numColumn < BOARD_SIZE - 3; numColumn++) {
      if (this.gameState[numRow][numColumn] === player.color &&
          this.gameState[numRow + 1][numColumn + 1] === player.color &&
          this.gameState[numRow + 2][numColumn + 2] === player.color &&
          this.gameState[numRow + 3][numColumn + 3] === player.color
      ) {
        return true;
      }
    }
  }
  // bottom left to top right
  for (var numRow = BOARD_SIZE - 1; numRow > 2; numRow--) {
    for (var numColumn = 0; numColumn < BOARD_SIZE - 3; numColumn++) {
      if (this.gameState[numRow][numColumn] === player.color &&
          this.gameState[numRow - 1][numColumn + 1] === player.color &&
          this.gameState[numRow - 2][numColumn + 2] === player.color &&
          this.gameState[numRow - 3][numColumn + 3] === player.color
      ) {
        return true;
      }
    }
  }
  return false;
};

Connect4Game.prototype._checkHorizontalWins = function (player) {
  for (var numRow = 0; numRow < BOARD_SIZE; numRow++) {
    var row = this.gameState[numRow];
    for (var firstPosition = 0; firstPosition < BOARD_SIZE - 3; firstPosition++) {
      if (row[firstPosition] === player.color &&
          row[firstPosition + 1] === player.color &&
          row[firstPosition + 2] === player.color &&
          row[firstPosition + 3] === player.color
      ) {
        return true;
      }
    }
  }
  return false;
};

Connect4Game.prototype._checkLineWins = function (player) {
  return this._checkHorizontalWins(player) || this._checkVerticalWins(player);
};

Connect4Game.prototype._checkVerticalWins = function (player) {
  var gameState = this.gameState;
  for (var numRow = 0; numRow < BOARD_SIZE; numRow++) {
    for (var firstPosition = 0; firstPosition < BOARD_SIZE - 3; firstPosition++) {
      if (gameState[firstPosition][numRow] === player.color &&
          gameState[firstPosition + 1][numRow] === player.color &&
          gameState[firstPosition + 2][numRow] === player.color &&
          gameState[firstPosition + 3][numRow] === player.color
      ) {
        return true;
      }
    }
  }
  return false;
};

Connect4Game.prototype._isWinner = function (player) {
  if (this._checkLineWins(player) || this._checkDiagonalWins(player)) {
    this.winner = player;
    return true;
  } else {
    return false;
  }
};

module.exports = Connect4Game;
