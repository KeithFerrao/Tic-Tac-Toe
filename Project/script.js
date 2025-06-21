const boxes = document.querySelectorAll(".box");
const restart = document.querySelector(".restart");
const turnToPlay = document.querySelector(".turnToPlay");
const winner = document.querySelector(".winner");

let isXTurn = true;
let gameOver = false;

//Function to add the X and O
function addValue(event) {
  const box = event.target;

  if (gameOver || box.textContent !== "") return;

  // To show who's turn to play now
  // if (isXTurn == true) {
  //   box.textContent = "X";
  //   isXTurn = false;
  // } else {
  //   box.textContent = "O";
  //   isXTurn = true;
  // }
  // console.log("clicked");
  // To add the value to the board array
  const index = parseInt(event.target.dataset.index);
  if (isXTurn == true) {
    box.textContent = "X";
    board[index] = "X";
    isXTurn = false;
  } else {
    box.textContent = "O";
    board[index] = "O";
    isXTurn = true;
  }
  playerTurn();
  checkWinner();
}

//Function to restart the game
function restartGame() {
  boxes.forEach((box) => {
    box.textContent = "";
  });
  for (let i = 0; i < board.length; i++) {
    board[i] = "";
  }
  isXTurn = true;
  gameOver = false;
  turnToPlay.textContent = "Turn to play is : X";
  winner.textContent = "Winner is :";
}

//Function to show which players turn it is
function playerTurn() {
  if (isXTurn == true) {
    turnToPlay.textContent = "Turn to play is : X";
  } else {
    turnToPlay.textContent = "Turn to play is : O";
  }
}

//Function to check winner
function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    // Check if all three positions are not empty and equal
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      winner.textContent = `Winner is: ${board[a]}`;
      gameOver = true; // prevent further moves
      turnToPlay.textContent = "Turn to play : ";
      return;
    }
  }

  // Check for draw
  if (!board.includes("") && !gameOver) {
    winner.textContent = "It's a draw!";
    gameOver = true;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = ["", "", "", "", "", "", "", "", ""];

boxes.forEach((box) => {
  box.addEventListener("click", addValue);
});

restart.addEventListener("click", restartGame);
