//utility function to select an element based on tag
var qs = function (tag) {
  return document.querySelector(tag);
};
//function that takes an array and returns one element randomly from that array
var getRandomWord = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

// this is where we first SELECT all our elements taht we interact with
var startBtn = qs(".start-button");
var wordBlanksEl = qs(".word-blanks");
var winsEl = qs(".win");
var lossesEl = qs(".lose");
var resetBtn = qs(".reset-button");
var timerEl = qs(".timer-count");

//generate an array of random common words in javascript
var words = [
  "array",
  "object",
  "function",
  "string",
  "boolean",
  "number",
  "undefined",
  "null",
  "for",
  "while",
  "if",
  "else",
  "switch",
  "break",
  "continue",
  "return",
  "var",
];

// create game logic variables
var gameRunning = false;
var timeLeft = 20;
var interval;
var wins = 0;
var losses = 0;

//function to start the game
var startGame = function () {
  //game logic inside
  // if game already running, just return like john said
  if (gameRunning) return;
  console.log("STARTING THE GAME!!!!");

  //game is Not running, so start the game
  gameRunning = true;
  startTimer();

  //game logic here
  var randomWord = getRandomWord(words);
  console.log("this is your random word!", randomWord);
  var blanks = "_".repeat(randomWord.length);
  wordBlanksEl.textContent = blanks;
};

//function to start the timer
var startTimer = function () {
  interval = setInterval(function () {
    //this gets called every second
    timeLeft--;
    timerEl.textContent = timeLeft;

    //if time reaches 0, game over, stop the interval,
    if (timeLeft === 0) {
      gameOver();
    }
  }, 10000);
};

//function to call when game over
var gameOver = function () {
  //stop timer
  clearInterval(interval);
  //display text GAME OVER!
  wordBlanksEl.textContent = "GAME OVER!";
  //increment losses
  losses++;
  //update scores on page
  lossesEl.textContent = losses;
  //game is not running
  gameRunning = false;
  timeLeft = 20;
  //sync data with localStorage
  syncLocalStorage();
};

var syncLocalStorage = function () {
  localStorage.setItem("losses", losses);
  localStorage.setItem("wins", wins);
};

// need an keydown/up event listener, when the key matches some letter in the word, we need to update the display
var handleKeyUp = function(event){
    console.log("key pressed ----- ", event.key)
};

// need event listener on the start button, when clicked, start the application ONLY if
startBtn.addEventListener("click", startGame);
document.addEventListener("keyup", handleKeyUp)
// need a timer component, using setInterval, reference class activity
// when time runs out, we need to stop the timer, display something in the UI, and register a loss
// when user guesses all the letters, show some other UI, and register a win
//update display to show the letters that are already guessed.

//DONT FORGET LOCALSTORAGE!!!!

//when clicking the reset button, resets the wins and losses in UI AND in localStorage!!!
