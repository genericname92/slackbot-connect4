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
  if (player !== this.activePlayer) {
    return;
  }
  if (this.setMove(player, column)) {
    this.switchActivePlayer();
  }
};

Connect4Game.prototype.setMove = function (player, column) {
  for (var numRow = BOARD_SIZE -1; numRow > 0; numRow--) {
    if (this.gameState[numRow][column] === EMPTY_SQUARE) {
      this.gameState[numRow][column] = player;
      return true;
    }
  }
  return false;
};

Connect4Game.prototype.switchActivePlayer = function () {
  if (this.activePlayer === this.players[0]) {
    this.activePlayer = this.players[1];
  } else {
    this.activePlayer = this.players[0];
  }
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
    for (var numColumn = 0; numColumn < BOARD_SIZE - 3 - numRow; numColumn++) {
      if (this.gameState[numRow][numColumn] === player &&
          this.gameState[numRow + 1][numColumn + 1] === player &&
          this.gameState[numRow + 2][numColumn + 2] === player &&
          this.gameState[numRow + 3][numColumn + 3] === player
      ) {
        return true;
      }
    }
  }
  // bottom left to top right
  for (var numRow = BOARD_SIZE - 1; numRow > 2; numRow--) {
    for (var numColumn = BOARD_SIZE - 1; numColumn > 2; numColumn--) {
      if (this.gameState[numRow][numColumn] === player &&
          this.gameState[numRow - 1][numColumn - 1] === player &&
          this.gameState[numRow - 2][numColumn - 2] === player &&
          this.gameState[numRow - 3][numColumn - 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

Connect4Game.prototype._checkHorizontalWins = function (player) {
  for (var numRow = 0; numRow < BOARD_SIZE; numRow++) {
    var row = this.gateState[numRow];
    for (var firstPosition = 0; firstPosition < BOARD_SIZE - 3; firstPosition++) {
      if (row[firstPosition] === player &&
          row[firstPosition + 1] === player &&
          row[firstPosition + 2] === player &&
          row[firstPosition + 3] === player
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
      if (gameState[firstPosition][numRow] === player &&
          gameState[firstPosition + 1][numRow] === player &&
          gameState[firstPosition + 2][numRow] === player &&
          gameState[firstPosition + 3][numRow] === player
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
