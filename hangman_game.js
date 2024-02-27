
// Define variables and constants
let wordToGuess;
let wordLetters;
let guessedLetters = [];
let incorrectGuesses = 0;
let maxIncorrectGuesses = 6;
let hangmanImageElement;
let gamesWon = 0;
let gamesLost = 0;

// Define an array of hangman image filenames
const hangmanImages = [
    "images/outline1.png",
    "images/head2.png",
    "images/body3.png",
    "images/rightarm4.png",
    "images/botharms5.png",
    "images/rightleg6.png",
    "images/bothlegs7.png",
  ];

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
    wordLetters = word.split("");
    const placeholderContainer = document.getElementById('placeholder-container');
    placeholderContainer.innerHTML = ''; // Clear previous placeholders

    for (let i = 0; i < word.length; i++) {
        const placeholder = document.createElement('span');
        placeholder.classList.add("placeholder-line");
        placeholderContainer.appendChild(placeholder);
    }
}


function updateHangmanDisplay(){
    console.log("updateHangmanDisplay");

    // Update the hangman image source based on the number of incorrect guesses
    switch(incorrectGuesses){
        case 0: 
            hangmanImageElement.src = 'images/outline1.png';
            break;
        case 1:
            hangmanImageElement.src = 'images/head2.png';
            break;
        case 2:
            hangmanImageElement.src = 'images/body3.png';
            break;
        case 3:
            hangmanImageElement.src = 'images/rightarm4.png';
            break;
        case 4:
            hangmanImageElement.src = 'images/botharms5.png';
            break;
        case 5:
            hangmanImageElement.src = 'images/rightleg6.png';
            break;
        case 6:
            hangmanImageElement.src = 'images/bothlegs7.png';
            break;
        default:
            console.log(incorrectGuesses);
            break;
    }
    
    
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
    hangmanImageElement = document.getElementById('hangman-image');
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

    //find button for the guessed letter
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


        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === letter) {
                const placeholders = document.querySelectorAll('#placeholder-container .placeholder-line');
                console.log(placeholders[i]);
                placeholders[i].textContent = letter; // Replace the placeholder with the guessed letter
                console.log(placeholders[i].textContent);
            }
        }

        // Remove the guessed letter from the wordLetters array
        wordLetters = wordLetters.filter(l => l !== letter);

        // Check if all letters have been guessed
        if (wordLetters.length === 0) {
            endGame(true);
        }

    } else {
        // Letter is not in the word, increment incorrect guesses
        incorrectGuesses++;
        console.log("incorrect guesses = "+incorrectGuesses);

        updateHangmanDisplay();
        
        // Check if lost
        if (incorrectGuesses === maxIncorrectGuesses) {
            endGame(false);
        }
    }


}

function isWordGuessed(wordToGuess, guessedLetters){
    //console.log("in isWordGuessed");
}

function endGame(win){
    let message;
    if (win) {
        message = "Congratulations! You guessed the word!";
    } else {
        message = "Sorry! You ran out of guesses. The word was " + wordToGuess;
    }
    
    message += "\n\nDo you want to play again?";
    
    if (win) {
        updateScoreboard(true);
    }
    else {
        updateScoreboard(false);
    }

    setTimeout(function () {
        if (confirm(message)) {
            // If the player clicks yes, then restart the game
            //startGame();
            addEventListenerToLetters();
            resetKeyboard();
            incorrectGuesses = 0;
            updateHangmanDisplay();
        } 
    }, 500);
    
    
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

// Function to update the scoreboard
function updateScoreboard(win) {
    if (win) {
        gamesWon++;
    } else {
        gamesLost++;
    }
    document.getElementById('gamesWon').textContent = gamesWon;
    document.getElementById('gamesLost').textContent = gamesLost;
}