"use strict";

//Function to switch the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Selecting Element
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const curret0El = document.getElementById("current--0");
const curret1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const newGameButton = document.querySelector(".btn--new");

//Setting the initial scores to zero and hiding the dice
diceEl.classList.add("hidden");
score0EL.textContent = 0;
score1EL.textContent = 0;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

btnRoll.addEventListener("click", function () {
  if (playing) {
    //Select a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Dispaly the number to the user
    diceEl.classList.remove("hidden");
    diceEl.src = `assets/dice-${dice}.png`;

    //If the dice value is 1 switcht the user
    if (dice !== 1) {
      //add the dice-number to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Adding the feature to hold the score
btnHold.addEventListener("click", function () {
  if (playing) {
    //add the current score to the acive players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //if the players score >= 100 --> Finish the game else with to the other player
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add("hidden");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

//Resetting the game when New Game is clicked
newGameButton.addEventListener("click", function () {
  //Making the scores zero
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
  }
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;

  //Making the current scores zero
  currentScore = 0;
  curret0El.textContent = 0;
  curret1El.textContent = 0;

  //Other resets
  activePlayer = 0;
  playing = true;
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);

  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  diceEl.classList.add("hidden");
});
