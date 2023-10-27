'use strict';

const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
};

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
currentScore0El.textContent = 0;
currentScore1El.textContent = 0;
dice.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

// Playing conditions
rollBtn.addEventListener('click', function () {
  if (playing) {
    //1. Roll the dice
    dice.classList.remove('hidden');
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    dice.src = `dice-${diceNumber}.png`;

    //3. Check the dice
    // Add the dice to scores
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // Change player
    else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    //add score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check score
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //switch player
    else switchPlayer();
  }
});

newBtn.addEventListener('click', init);
