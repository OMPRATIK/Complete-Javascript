"use strict";

const btnList = document.querySelectorAll(".btn"); // select buttons
const playerTurn = document.querySelector(".player-turn"); // select players-turn to change the turn
const btnAgain = document.querySelector(".restart"); // select restart button
let player1 = true; // By default set to player-1

// Winning Conditioin stored in matrix
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function to disable buttons
const disableBtn = function () {
  for (let i = 0; i < btnList.length; i++) {
    const currBtn = btnList[i];
    currBtn.classList.add("btn-disabled");
  }
};

// function to enable buttons
const enableBtn = function () {
  for (let i = 0; i < btnList.length; i++) {
    const currBtn = btnList[i];
    currBtn.classList.remove("btn-disabled");
    currBtn.textContent = "";
  }
};

// function to check winner
const checkWinner = function () {
  let winner = false;
  for (let i = 0; i < winCondition.length; i++) {
    const val1 = btnList[winCondition[i][0]].textContent;
    const val2 = btnList[winCondition[i][1]].textContent;
    const val3 = btnList[winCondition[i][2]].textContent;
    if (
      // win condition
      val1 !== "" &&
      val2 != "" &&
      val3 != "" &&
      val1 === val2 &&
      val2 === val3
    ) {
      playerTurn.textContent = `🎊Player-${
        player1 === true ? "2" : "1"
      } Won!🎊`;
      disableBtn(); // disable buttons on a win
      winner = true; // set it true on win
      break;
    }
  }
  // Draw Condition
  if (!winner) {
    // check only if no pattern has matched
    let cnt = 0;
    for (let i = 0; i < btnList.length; i++) {
      // check if all the buttons are fille and count
      if (btnList[i].textContent != "") cnt++;
    }
    if (cnt === 9) {
      // if total 9 boxes are filled then it's a draw!
      playerTurn.textContent = `🏳️It's A Draw🏳️`;
    }
  }
};

for (let i = 0; i < btnList.length; i++) {
  const currBtn = btnList[i];
  currBtn.addEventListener("click", function () {
    // to allow change in the button if clas'btn-disabled' not present

    if (!currBtn.classList.contains("btn-disabled")) {
      if (player1) {
        currBtn.textContent = "X";
      } else {
        currBtn.textContent = "O";
      }
      player1 = player1 === true ? false : true; // switch players
      playerTurn.textContent = `Player-${player1 === true ? "1" : "2"}'s Turn`; // display the turn of player
      currBtn.classList.add("btn-disabled"); // disable the button once clicked
    }
    // check the winner
    checkWinner();
  });
}

// Restart the game
btnAgain.addEventListener("click", function () {
  enableBtn(); // call to enable the buttons
  playerTurn.textContent = `Player-1's Turn`; // Reset the text to 'Player-1'
  player1 = true; // switch to player 1 as first player
});
