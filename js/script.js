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
// Test word
const word = "magnolia";
// Array to hold guessed letters
const guessedLetters = [];

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
placeHolder(word);

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
  console.log(goodGuess);
  console.log(guessedLetters);
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
    console.log(guessedLetters);
  }
};
