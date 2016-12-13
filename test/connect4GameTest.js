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
    it("Initializes a new game with players set", function () {
      var game = new gameFile({
        activePlayer: startingPlayer,
        nonActivePlayer: secondPlayer,
      });
      expect(game.activePlayer).to.equal(startingPlayer);
      expect(game.nonActivePlayer).to.equal(secondPlayer);
    });
    it("Initializes a new board", function () {
      var game = new gameFile({
        activePlayer: startingPlayer,
        nonActivePlayer: secondPlayer,
      });
      for (var row = 0; row < 7; row++) {
        for (var column = 0; column < 7; column++) {
          expect(game.gameState[row][column]).to.equal(':white_large_square:');
        }
      }
    });
  });
});
