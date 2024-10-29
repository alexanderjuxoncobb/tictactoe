const Gameboard = function () {
  let gameboard = Array(9).fill(null);
  return { gameboard };
};

const Player = function (name, marker) {
  return { name, marker };
};

const GameController = function () {
  const player1 = Player("1", "X");
  console.log(player1.marker);
  const player2 = Player("2", "O");
  let board = Gameboard();

  const playMove = function (position, marker) {
    if (board.gameboard[position] == null) {
      board.gameboard[position] = marker;
      if (checkWinner()) {
        console.log(checkWinner());
        console.log("someone won");
      } else {
        console.log("Game in play");
      }
    }
    console.log(board.gameboard);
  };

  const checkWinner = function () {
    if (
      ((board.gameboard[0] === board.gameboard[4] &&
        board.gameboard[0] === board.gameboard[8]) ||
        (board.gameboard[2] === board.gameboard[4] &&
          board.gameboard[2] === board.gameboard[6])) &&
      board.gameboard[4]
    ) {
      return "Win 1";
    }
    for (let n = 0; n < 3; n++) {
      if (
        board.gameboard[3 * n] === board.gameboard[3 * n + 1] &&
        board.gameboard[3 * n] === board.gameboard[3 * n + 2] &&
        board.gameboard[3 * n]
      ) {
        return "Win 2";
      } else if (
        board.gameboard[n] === board.gameboard[n + 3] &&
        board.gameboard[n] === board.gameboard[n + 6] &&
        board.gameboard[n]
      ) {
        return "Win 3";
      }
    }
    return false;
  };

  return { player1, player2, playMove };
};
