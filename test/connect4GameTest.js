var gameFile = require("../lib/connect4Game");
var expect = require("chai").expect;

var startingPlayer = {
  color: ':red_circle:',
  user: "user hash",
  username: "p1",
};

var secondPlayer = {
  color: ':large_blue_circle:',
  user: "user 2 hash",
  username: "p2"
};

describe("Connect 4 Game", function() {
  describe("Initialization", function () {
    var game = new gameFile({
      activePlayer: startingPlayer,
      nonActivePlayer: secondPlayer,
    });

    it("Initializes a new game with players set", function () {
      expect(game.activePlayer).to.equal(startingPlayer);
      expect(game.nonActivePlayer).to.equal(secondPlayer);
    });

    it("Initializes a new board", function () {
      for (var row = 0; row < 7; row++) {
        for (var column = 0; column < 7; column++) {
          expect(game.gameState[row][column]).to.equal(':white_large_square:');
        }
      }
    });
  });

  describe("Checking winners", function () {
    describe("Diagonal wins", function () {
      it("correctly marks top left corner win", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [0,0],
          [1,1],
          [2,2],
          [3,3]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(true);
        expect(game.winner).to.equal(startingPlayer);
      });

      it("correctly marks bottom left corner win", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [6,0],
          [5,1],
          [4,2],
          [3,3]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(true);
        expect(game.winner).to.equal(startingPlayer);
      });

      it("correctly marks top right corner win", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [6,0],
          [5,1],
          [4,2],
          [3,3]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(true);
        expect(game.winner).to.equal(startingPlayer);
      });

      it("correctly marks bottom right corner win", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [6,6],
          [5,5],
          [4,4],
          [3,3]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(true);
        expect(game.winner).to.equal(startingPlayer);
      });

      it("correctly does not have a winner", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [0,0],
          [1,1],
          [2,2],
          [3,4]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(false);
      });
    });

    describe("Horizonal wins", function () {
      it("correctly returns true for a horizonal line win", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [0,0],
          [0,1],
          [0,2],
          [0,3]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(true);
        expect(game.winner).to.equal(startingPlayer);
      });

      it("correctly does not have a winner when no 4 in a row line", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [0,0],
          [0,1],
          [0,2],
          [0,4]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(false);
        expect(game.winner).to.equal(undefined);
      });
    });

    describe("Vertical wins", function () {
      it("correctly has a winner with a vertical 4 in a row", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [0,0],
          [1,0],
          [2,0],
          [3,0]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(true);
        expect(game.winner).to.equal(startingPlayer);
      });

      it("correctly has no winner if no 4 in a row", function () {
        var game = new gameFile({
          activePlayer: startingPlayer,
          nonActivePlayer: secondPlayer,
        });

        var positionsToMark = [
          [6,0],
          [5,0],
          [4,2],
          [3,0]
        ];

        for (var idx = 0; idx < positionsToMark.length; idx++) {
          var position = positionsToMark[idx];
          game.gameState[position[0]][position[1]] = startingPlayer.color;
        }

        expect(game._isWinner(startingPlayer)).to.equal(false);
        expect(game.winner).to.equal(undefined);
      });
    });
  });

  describe("Setting a piece", function () {
    it("takes in a player and column and places the piece all the way down the column", function () {
      var game = new gameFile({
        activePlayer: startingPlayer,
        nonActivePlayer: secondPlayer,
      });

      expect(game.setMove(startingPlayer, 6)).to.equal(true);
      expect(game.gameState[6][6]).to.equal(startingPlayer.color);

      expect(game.setMove(secondPlayer, 6)).to.equal(true);

      expect(game.gameState[5][6]).to.equal(secondPlayer.color);
      expect(game.gameState[6][6]).to.equal(startingPlayer.color);
    });

    it("returns false if cannot place piece into column", function () {
      var game = new gameFile({
        activePlayer: startingPlayer,
        nonActivePlayer: secondPlayer,
      });

      for (var idx = 0; idx < 8; idx++) {
        if (idx === 7) {
          expect(game.setMove(startingPlayer, 6)).to.equal(false);
        } else {
          expect(game.setMove(startingPlayer, 6)).to.equal(true);
        }
      }
    });
  });

  describe("Processing a full move", function () {
    describe("Correct player passed in", function () {
      describe("Move does not win the game", function () {
        it("places the piece then switches players", function () {
          var game = new gameFile({
            activePlayer: startingPlayer,
            nonActivePlayer: secondPlayer,
          });

          game.processMove(startingPlayer, 3);
          expect(game.gameState[6][3]).to.equal(startingPlayer.color);
          expect(game.activePlayer).to.equal(secondPlayer);
        });
      });
    });
  });
});
