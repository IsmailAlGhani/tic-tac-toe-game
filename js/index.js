$(document).ready(function () {
  let currentPlayer = "x";
  let count = 0;
  let o_win = 0;
  let x_win = 0;
  let boardSize = 3; // Default board size
  let board = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill("")
  );

  const $board = $("#game");
  const $sizeInput = $("#size");
  const $changeSizeBtn = $("#changeSizeBtn");

  createBoard();

  function createBoard() {
    $board.html("");
    $board.css(
      "grid-template-columns",
      `repeat(${boardSize}, minmax(auto, auto))`
    );

    function validatePosition({ row, col }) {
      switch (row) {
        case 0:
          let text = "";
          switch (col) {
            case 0:
              text = "border-1";
              break;
            case boardSize - 1:
              text = "border-3";
              break;
            default:
              text = "border-2";
              break;
          }
          return text;
        case boardSize - 1:
          let text2 = "";
          switch (col) {
            case 0:
              text2 = "border-7";
              break;
            case boardSize - 1:
              text2 = "border-9";
              break;
            default:
              text2 = "border-8";
              break;
          }
          return text2;
        default:
          let text3 = "";
          switch (col) {
            case 0:
              text3 = "border-4";
              break;
            case boardSize - 1:
              text3 = "border-6";
              break;
            default:
              text3 = "border-5";
              break;
          }
          return text3;
      }
    }

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const $cell = $("<div>")
          .addClass(`cell ${validatePosition({ row, col })}`)
          .data({ row, col })
          .click(handleCellClick);
        $board.append($cell);
      }
    }
  }

  function handleCellClick() {
    const { row, col } = $(this).data();

    if (board[row][col] === "") {
      board[row][col] = currentPlayer;
      $(this).text(currentPlayer);

      if (checkWinner(row, col)) {
        alert(`Player ${currentPlayer.toUpperCase()} wins!`);
        $("#game li").removeClass("disable");
        $("#game li").removeClass("o");
        $("#game li").removeClass("x");
        $("#game li").removeClass("btn-primary");
        $("#game li").removeClass("btn-info");
        count = 0;
        if (currentPlayer === "x") {
          x_win++;
          $("#x_win").text(x_win);
        } else {
          o_win++;
          $("#o_win").text(o_win);
        }
        resetGame();
      } else if (checkTie()) {
        alert("Its a tie. It will restart.");
        $("#game li").text("+");
        $("#game li").removeClass("disable");
        $("#game li").removeClass("o");
        $("#game li").removeClass("x");
        $("#game li").removeClass("btn-primary");
        $("#game li").removeClass("btn-info");
        resetGame();
      } else if ($(this).hasClass("disable")) {
        alert("Already selected");
      } else {
        currentPlayer = currentPlayer === "x" ? "o" : "x";
      }
    }
  }

  function checkWinner(row, col) {
    return checkRow(row) || checkColumn(col) || checkDiagonals();
  }

  function checkRow(row) {
    return board[row].every((cell) => cell === currentPlayer);
  }

  function checkColumn(col) {
    return board.every((row) => row[col] === currentPlayer);
  }

  function checkDiagonals() {
    const leftToRight = board.every(
      (row, index) => row[index] === currentPlayer
    );
    const rightToLeft = board.every(
      (row, index) => row[boardSize - 1 - index] === currentPlayer
    );

    return leftToRight || rightToLeft;
  }

  function checkTie() {
    return board.every((row) => row.every((cell) => cell !== ""));
  }

  function resetGame() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(""));
    currentPlayer = "x";
    updateBoardUI();
  }

  function updateBoardUI() {
    $(".cell").each(function () {
      const { row, col } = $(this).data();
      if (row < boardSize && col < boardSize) {
        $(this).text(board[row][col]);
      }
    });
  }

  $changeSizeBtn.click(function () {
    const newSize = parseInt($sizeInput.val(), 10);
    if (newSize >= 3 && newSize <= 10) {
      boardSize = newSize;
      resetGame();
      createBoard();
    } else {
      alert("Please enter a valid size between 3 and 10.");
    }
  });

  $("#reset").click(function () {
    $("#game li").text("+");
    $("#game li").removeClass("disable");
    $("#game li").removeClass("o");
    $("#game li").removeClass("x");
    $("#game li").removeClass("btn-primary");
    $("#game li").removeClass("btn-info");
    count = 0;
    resetGame();
  });
});
