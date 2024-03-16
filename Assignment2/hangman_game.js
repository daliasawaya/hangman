//variables and constants
let wordToGuess;
let wordLetters;
let guessedLetters = [];
let incorrectGuesses = 0;
let maxIncorrectGuesses = 6;
let hangmanImageElement;
let gamesWon = 0;
let gamesLost = 0;

//array of hangman image filenames
const hangmanImages = [
    "images/outline1.png",
    "images/head2.png",
    "images/body3.png",
    "images/rightarm4.png",
    "images/botharms5.png",
    "images/rightleg6.png",
    "images/bothlegs7.png",
  ];

//array of words
let words = ["APPLE", "BANANA", "ORANGE", "STRAWBERRY", "KIWI", "GRAPE", "PINEAPPLE", "WATERMELON", "BLUEBERRY", "MANGO", "GRAPEFRUIT", "AVOCADO", "PEAR", "CHERRY", "LEMON", "COCONUT", "GUAVA", "PAPAYA"];

//function to reset the game
function startGame() {
    //choode the fruit
    wordToGuess = generateRandomWord();

    //display the placeholders
    displayWordPlaceholders(wordToGuess);

    //removing duplicates
    wordLetters = removeDuplicates(wordLetters);
    
    guessedLetters = [];
    incorrectGuesses = 0;
}

//function to randomly choose a fruit from the list
function generateRandomWord() {

    const randomIndex = Math.floor(Math.random() * words.length);
    console.log(words[randomIndex]);

    return words[randomIndex];
}

//function to display the placeholders for the new word
function displayWordPlaceholders(word) {

    wordLetters = word.split("");
    const placeholderContainer = document.getElementById('placeholder-container');
    placeholderContainer.innerHTML = ''; //clear previous placeholders

    for (let i = 0; i < word.length; i++) {
        const placeholder = document.createElement('span');
        placeholder.classList.add("placeholder-line");
        placeholderContainer.appendChild(placeholder);
    }
}

//function to update the hangman display image
function updateHangmanDisplay(){

    //update the hangman image source based on the number of incorrect guesses
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

//adds event listener to the letters and starts the game
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

    //check if the letter has already been guessed
    if (guessedLetters.includes(letter)) {
        console.log("you already guessed this letter");
        return;
    }    
    
    //find button for the guessed letter
    const guessedLetterButton = document.querySelector(`.letter[data-letter="${letter}"]`);

    //check if button was found
    if (guessedLetterButton) {
        //add 'guessed' class to the button
        guessedLetterButton.classList.add('guessed');
    } else {
        console.error("Button not found for letter:", letter);
    }
    
    //add the letter to the list of guessed letters
    guessedLetters.push(letter);
    
    //check if letter is in the word
    if (wordLetters.includes(letter)) {

        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === letter) {
                const placeholders = document.querySelectorAll('#placeholder-container .placeholder-line');
                placeholders[i].textContent = letter; //replace the placeholder with the guessed letter
                placeholders[i].classList.add('correct-letter');
            }
        }

        //remove the guessed letter from the wordLetters array
        wordLetters = wordLetters.filter(l => l !== letter);

        //check if all letters have been guessed
        if (wordLetters.length === 0) {
            endGame(true);
        }

    } else {
        //letter is not in the word, increment incorrect guesses
        incorrectGuesses++;

        updateHangmanDisplay();
        
        // Check if lost
        if (incorrectGuesses === maxIncorrectGuesses) {
            endGame(false);
        }
    }

}

//handles the end of a game: win or loss
function endGame(win){
    let message;

    //sets the message based on win or loss
    if (win) {
        message = "Congratulations! You guessed the word!";
    } else {
        message = "Sorry! You ran out of guesses. The word was " + wordToGuess;
    }
    
    message += "\n\nDo you want to play again?";
    
    //update the scoreboard
    if (win) {
        updateScoreboard(true);
    }
    else {
        updateScoreboard(false);
    }

    //ask user if they want to play again (0.5s after end of game)
    setTimeout(function () {
        if (confirm(message)) {  //if yes, reset the game   
            addEventListenerToLetters();
            resetKeyboard();
            updateHangmanDisplay();
        } 
    }, 500);
    
}

//reset the keyboard
function resetKeyboard() {
    const letterButtons = document.querySelectorAll('.letter');

    //loop through each letter button and remove the 'guessed' class
    letterButtons.forEach(button => {
        button.classList.remove('guessed');
    });
}

//removes duplicates from an array
function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

//function to update the scoreboard
function updateScoreboard(win) {
    
    if (win) {
        gamesWon++;
    } else {
        gamesLost++;
    }
    
    document.getElementById('gamesWon').textContent = gamesWon;
    document.getElementById('gamesLost').textContent = gamesLost;
}

// Function to display a pop-up window with a message and buttons
function displayPopup(message, buttonText, buttonCallback) {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    const messageElement = document.createElement('p');
    messageElement.classList.add('popup-message');
    messageElement.textContent = message;

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('popup-button');
    buttonElement.textContent = buttonText;
    buttonElement.addEventListener('click', buttonCallback);

    popupContainer.appendChild(messageElement);
    popupContainer.appendChild(buttonElement);

    document.body.appendChild(popupContainer);
}
