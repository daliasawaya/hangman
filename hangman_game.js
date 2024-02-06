
// Define variables and constants
let wordToGuess;
let wordLetters;
let guessedLetters = [];
let incorrectGuesses = 0;
let maxIncorrectGuesses = 6;

// Array of words
let words = ["APPLE", "BANANA", "ORANGE", "STRAWBERRY", "KIWI", "GRAPE", "PINEAPPLE", "WATERMELON", "BLUEBERRY", "MANGO"];

function startGame() {

    console.log("starting game");

    wordToGuess = generateRandomWord();
    displayWordPlaceholders(wordToGuess);

    //removing duplicates
    wordLetters = removeDuplicates(wordLetters);
    console.log(wordLetters);
    
    guessedLetters = [];
    incorrectGuesses = 0;
    
    //updateHangmanDisplay();
}


function generateRandomWord() {

    const randomIndex = Math.floor(Math.random() * words.length);
    console.log(words[randomIndex]);

    return words[randomIndex];
}

function displayWordPlaceholders(word) {
    //console.log(word);

    wordLetters = word.split("");
    console.log(wordLetters);

}

function updateHangmanDisplay(){
    //console.log("updateHangmanDisplay");
}

//adds event listener to the letters
//and starts the game
function addEventListenerToLetters() {
    const letterButtons = document.querySelectorAll('.letter');

    letterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const letter = button.textContent;
            console.log("clicked: " + letter);
            guessLetter(letter);
        });
    });
    startGame();
}

document.addEventListener('DOMContentLoaded', function() {
    addEventListenerToLetters(); 
});

//function to handle guessing a letter
function guessLetter(letter) {

   // console.log("*** NEW GUESS ***");

    //check if the letter has already been guessed
    if (guessedLetters.includes(letter)) {
        //letter was already guessed, do nothing
       // console.log("you already guessed this letter");
        return;
    }    
    
    console.log("Guessing letter:", letter);

    //find button corresponding to the guessed letter
    const guessedLetterButton = document.querySelector(`.letter[data-letter="${letter}"]`);
    console.log("Guessed letter button:", guessedLetterButton);

    //check if button was found
    if (guessedLetterButton) {
        //add 'guessed' class to the button
        guessedLetterButton.classList.add('guessed');
    } else {
        console.error("Button not found for letter:", letter);
    }
    
    //add the letter to the list of guessed letters
    guessedLetters.push(letter);
    console.log("Guessed letters:", guessedLetters);
    
    //check if letter is in the word
    if (wordLetters.includes(letter)) {
        // Letter is in the word, update display
        console.log("THE WORD INCLUDES THIS LETTER");
        //updateWordDisplay(letter);
        wordLetters = wordLetters.filter(l => l !== letter);
        console.log("Remaining letters in the word:", wordLetters);

        if(wordLetters.length == 0){
            endGame(true);
        }

    } else {
        // Letter is not in the word, increment incorrect guesses
        incorrectGuesses++;
        console.log("incorrect guesses = "+incorrectGuesses);
        // Update hangman display
        updateHangmanDisplay();
        
        // Check for loss condition
        if (incorrectGuesses === maxIncorrectGuesses) {
            endGame(false);
        }
    }

    /*for(i=0; i<wordLetters.length; i++){
        console.log(wordLetters[i]);
        console.log(letter);
        if(letter === wordLetters[i]){
            console.log("letter is in word!");
        }
    }*/
    
    // Check for win condition
    /*if (isWordGuessed(wordToGuess, guessedLetters)) {
        endGame(true);
    }*/
}

function isWordGuessed(wordToGuess, guessedLetters){
    //console.log("in isWordGuessed");
}

function endGame(win){
    if(win){
        console.log("Congratulations! You guessed the word!");
    }
    else {
        console.log("Sorry! You ran out of guesses, starting new game");
    }
    addEventListenerToLetters();
    resetKeyboard();
}

function resetKeyboard() {
    const letterButtons = document.querySelectorAll('.letter');

    // Loop through each letter button and remove the 'guessed' class
    letterButtons.forEach(button => {
        button.classList.remove('guessed');
    });
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}
