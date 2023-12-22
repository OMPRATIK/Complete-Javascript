'use strict';

// Selecting the elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/*------ Starting Conditions ------*/

// Initializing the score by 0
score0El.textContent = 0;
score1El.textContent = 0;

// Hiding the dice
diceEl.classList.add('hidden');

// Initialize
let scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
let gamePlaying = true;

const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice Roll
btnRoll.addEventListener('click', function () {
  // check if game is still running
  if (gamePlaying) {
    // Generating random dice roll between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    // 1. Remove hidden class to display the image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add the dice score to current score
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // check if game is still running
  if (gamePlaying) {
    // Add Current Score to active player
    scores[activePlayer] += currScore;
    // Update the High Score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // End the game
      gamePlaying = false;
      // hide the dice image
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// Reset The Game
btnNew.addEventListener('click', init);
