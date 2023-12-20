'use strict';

/*

document.querySelector('.message').textContent = 'Correct Number🔥🔥';
console.log(document.querySelector('.message').textContent);
console.log(document.querySelector('.guess').value);

*/
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// check answer button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    // No Input
    displayMessage('No number🤔');
  } else if (guess === secretNumber) {
    // When user guesses the correct answer
    displayMessage('Correct Number🔥🔥');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    highScore = score > highScore ? score : highScore;
    document.querySelector('.highscore').textContent = highScore;
  } else {
    // When answer is incorrect
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too High! 📈' : 'Too Low! 📉');

      // reduce the score everytime user gets the answer incorrect
      document.querySelector('.score').textContent = --score;
    } else {
      // set score to 0
      document.querySelector('.score').textContent = 0;
      displayMessage('🤡 You Lost The game! 🤡');
    }
  }
});

// again button (reset)
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start guessing...');

  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = null;
});
