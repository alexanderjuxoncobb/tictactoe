const Gameboard = (function () {
  let gameboard = Array(9).fill(null);
  return { gameboard };
})();

const Player = function (name, marker) {
  return { name, marker };
};

const GameController = (function () {
  let player1 = Player("Player 1", "X");
  let player2 = Player("Player 2", "O");

  const setPlayerNames = (name1, name2) => {
    player1.name = name1 || player1.name;
    player2.name = name2 || player2.name;
  };

  let board = Gameboard;
  let moveCount = 0;
  let gameOver = false;
  let result = document.querySelector("#message");

  let getGameOver = () => {
    return gameOver;
  };

  let reset = () => {
    board.gameboard = Array(9).fill(null);
    gameOver = false;
    moveCount = 0;
  };

  let whoseGo = function () {
    return [player1, player2][moveCount % 2];
  };

  const playMove = function (position) {
    result.textContent = "";
    if (gameOver) {
      console.log("Game Over");
      result.textContent = "Game Over";
    }
    if (board.gameboard[position] === null) {
      board.gameboard[position] = whoseGo().marker;
      moveCount++;
      if (checkWinner()) {
        console.log(`The winner is ${checkWinner().name}`);
        result.textContent = `The winner is ${checkWinner().name}`;
        gameOver = true;
      } else if (moveCount >= 9) {
        console.log("It's a tie");
        result.textContent = "It's a tie";
      } else {
        console.log("Game in play");
      }
    } else {
      console.log("Select an empty square");
      result.textContent = "Select an empty square";
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
      return board.gameboard[0] === player1.marker ? player1 : player2;
    }
    for (let n = 0; n < 3; n++) {
      if (
        board.gameboard[3 * n] === board.gameboard[3 * n + 1] &&
        board.gameboard[3 * n] === board.gameboard[3 * n + 2] &&
        board.gameboard[3 * n]
      ) {
        return board.gameboard[3 * n] === player1.marker ? player1 : player2;
      } else if (
        board.gameboard[n] === board.gameboard[n + 3] &&
        board.gameboard[n] === board.gameboard[n + 6] &&
        board.gameboard[n]
      ) {
        return board.gameboard[n] === player1.marker ? player1 : player2;
      }
    }
    return false;
  };

  return {
    player1,
    player2,
    playMove,
    whoseGo,
    board,
    getGameOver,
    setPlayerNames,
    reset,
  };
})();

const DisplayController = (function () {
  const grid = document.querySelector(".container");
  const gridItems = grid.querySelectorAll("div");
  board = GameController.board;

  gridItems.forEach((child) =>
    child.addEventListener("click", function () {
      if (!child.textContent && !GameController.getGameOver()) {
        child.textContent = GameController.whoseGo().marker;
      }
      GameController.playMove(Number(child.className)); // would be better to just render form the array eachg time
    })
  );
  submit = document.querySelector("#submit-names");
  submit.addEventListener("click", function () {
    player1Input = document.querySelector("#player1name");
    player2Input = document.querySelector("#player2name");

    GameController.setPlayerNames(player1Input.value, player2Input.value);
    player1Input.value = "";
    player2Input.value = "";
  });

  reset = document.querySelector("#reset");
  reset.addEventListener("click", () => {
    GameController.reset();
    gridItems.forEach((child) => {
      child.textContent = "";
    });
    document.querySelector("#message").textContent = "";
  });
})();
