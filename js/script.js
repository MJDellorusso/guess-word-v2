// Unordered list to show players guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
// The button to submit a guess
const guessLetterButton = document.querySelector(".guess");
// Text input for player to guess a letter
const letterInput = document.querySelector(".letter");
// Word in progress paragraph
const wordInProgress = document.querySelector(".word-in-progress");
// Remaining guesses paragraph
const remainingGuessesElement = document.querySelector(".remaining");
// Span for the number of guesses
const remainingGuessesSpan = document.querySelector(".remaining span");
// Messages paragraph
const message = document.querySelector(".message");
// Hidden play again button
const playAgainButton = document.querySelector(".play-again");
// Placeholder word
let word = "magnolia";
// Array to hold guessed letters
const guessedLetters = [];
// Changing variable, that holds the number of guesses
let remainingGuesses = 8;
// Fetch the text file holding all the words
const getWord = async function () {
  const wordRes = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  // convert to as text file
  const wordData = await wordRes.text();
  console.log(wordData);
  // convert words into elements in an array and seperate them with a delimiter
  const wordArray = wordData.split("\n");
  console.log(wordArray);
  // generate a random index number
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  // declare the word variable as a randomly generated word from the wordArray
  word = wordArray[randomIndex].trim();
  // call the placeholder function so it reflects the randomly generated word
  placeHolder(word);
};
// Start the game
getWord();

// Covers letters of the word with placeholder symbols
const placeHolder = function (word) {
  // Holds a placeholder for each letter iterated
  const placeHolderLetters = [];
  //   iterates through each letter of the word variable
  for (const letter of word) {
    // Adds a placeHolder for each letter iterated
    placeHolderLetters.push("●");
  }
  //   Changes the text of the paragraph to the string version of the placeHolderLetters array
  wordInProgress.innerText = placeHolderLetters.join("");
};

// Click event for when a player inputs a value into the input box
guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  //   Empty message paragraph
  message.innerText = "";
  //   The guess variable holds the value of the letter that was input
  const guess = letterInput.value;
  // confirms guess is a single letter
  const goodGuess = InputValidator(guess);
  // if guess is a single letter
  if (goodGuess) {
    // call makeGuess function with guess as the argument
    makeGuess(guess);
  }
  //   clears the input box value for the next guess
  letterInput.value = "";
});
// A function to validate the the input, aka guess is a single letter
const InputValidator = function (input) {
  // regular expression looking for letters a-z
  const acceptedLetter = /[a-zA-Z]/;
  //   Did the user make a guess?
  if (input.length === 0) {
    message.innerText = `You must enter a letter!`;
    // Was the guess a single letter?
  } else if (input.length > 1) {
    message.innerText = `You must enter a single letter!`;
    // Was the guess something other than a letter a-z?
  } else if (!input.match(acceptedLetter)) {
    message.innerText = `Please enter a letter from A-Z.`;
    // Yay the guess is a sinlge letter make it availble to the rest of the code.
  } else {
    return input;
  }
};
// A function to check if a guess has already been made.
const makeGuess = function (guess) {
  // JS is case sensitive
  guess = guess.toUpperCase();
  //   Is the letter already in the array?
  if (guessedLetters.includes(guess)) {
    message.innerText = `You already guessed that letter fool! Guess again.`;
    // It is not so add it to the array
  } else {
    guessedLetters.push(guess);
    showGuessedLetters(guess);
    guessCounter(guess);
    updateWordInProgress(guessedLetters);
  }
};
// A function to show the user the letters they guessed
const showGuessedLetters = function (letter) {
  // Clears the UL for a new game
  guessedLettersElement.innerHTML = "";
  //   Iterates through each letter pushed to the guessedLetters array
  for (const letter of guessedLetters) {
    // Creates a li, adds the text, appends the li to the ul to display the letter
    const listItem = document.createElement("li");
    listItem.innerText = letter;
    guessedLettersElement.append(listItem);
  }
};
// A function to reveal correctly guessed letters in the wordInProgress paragraph
const updateWordInProgress = function (guessedLetters) {
  // declaring a variable that holds the value of the word varaible but in uppercase
  const wordUpper = word.toUpperCase();
  // Splitting the letters into individual array elements so they can be iterated
  const wordArray = wordUpper.split("");
  //   Array to hold revealed letters and placeholders
  const revealWord = [];
  //   Iterating through each letter of word Array
  //   If the letter is present in the guesedLetters array as well as the word..
  for (const letter of wordArray)
    if (guessedLetters.includes(letter)) {
      // the letter is pushed to the reveal word array
      revealWord.push(letter.toUpperCase());
    } else {
      // Every letter not present in both arrays a placeholder is pushed
      revealWord.push("●");
    }
  // The wordInProgress text is changed to the string version of the revealWord array. Containing letters and placeholders.
  wordInProgress.innerText = revealWord.join("");
  checkWin();
};

// A function to subtract a guess from the payers total when it is incorrect and return a message to the player.
const guessCounter = function (guess) {
  // Change the word to uppercase because js is case sensitive guess is also uppercase
  const wordUpper = word.toUpperCase();
  // If the word includes the letter guessed...
  if (wordUpper.includes(guess)) {
    message.innerText = `Great job! That is a correct letter!`;
    // If the word does not contain the letter guessed...
  } else {
    remainingGuesses -= 1;
    message.innerText = `Sorry buddy that is an incorrect guess :(`;
  }
  // Conditional statement to know which text message to display in the remainingGuessesElement <p>.
  if (remainingGuesses === 0) {
    message.innerText = `Game over! The word you were looking for is ${wordUpper}`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `1 guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

// A function to see if the text of the wordInProgress paragraph matches the word variable in upperCase
const checkWin = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    startOver();
  }
};

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  // reset all original values-grab a new word
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  // Grab a new word
  getWord();

  // Show the UI elements for a new game.
  guessLetterButton.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
});
