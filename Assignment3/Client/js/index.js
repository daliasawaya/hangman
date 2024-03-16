/**
 * The previous response received from server
 */
let prevResp = {};

/**
 * Images sorted by index to be displayed when an
 * invalid move is made.
 */
const pictures = [
    "images/outline1.png",
    "images/head2.png",
    "images/body3.png",
    "images/rightarm4.png",
    "images/botharms5.png",
    "images/rightleg6.png",
    "images/bothlegs7.png",
];

/**
 * Guesses a letter and sends the request to the server
 * @param {The letter that is being guessed} letter 
 * @returns undefined
 */
function guessLetter(letter) {
    if (prevResp.guessed_chars !== undefined && prevResp.guessed_chars.includes(letter)) {
        return;
    }
    let req = new XMLHttpRequest();
    req.open('POST', '/guess', false);
    req.send(JSON.stringify({guess: letter}));
    prevResp = JSON.parse(req.responseText);
    console.log(prevResp);
    updateElements();
}


/**
 * Updates all the elements upon loading or guessing a new word
 */
function updateElements() {
    updateButtons();
    updatePicture();
    updateText();
    showGameResult();
}


/**
 * A function to update the CSS design of each button.
 */
function updateButtons() {
    for (let i = 65; i < 91; i++) {
        let letter = String.fromCharCode(i);
        let button = document.getElementById(`button-${letter}`);

        if (prevResp.guessed_chars && prevResp.guessed_chars.includes(letter)) {
            button.classList.add('guessed');
        }
        else button.className = 'letter';
    }
}

/**
 * Sets the picture according to how many guesses are made.
 */
function updatePicture() {
    let img = document.getElementById('hangman-image');
    img.src =  pictures[prevResp.incorrect === undefined ? 0 : prevResp.incorrect];
}

/**
 * Shows the correct word once the game is done.
 */
function showGameResult() {
    if (prevResp.correct != null) {
        alert(`The correct word is ${prevResp.correct}`);
    }
}

/**
 * Updates the text.
 */
function updateText() {
    let guessContainer = document.getElementById('placeholder-container');
    guessContainer.innerHTML = '';
    prevResp.guess.split('').forEach(function(character) {
        let item = document.createElement('span');
        if (character != '-') {
            item.textContent = character;
            item.classList.add('correct-letter');
        }
        item.classList.add('placeholder-line');
        guessContainer.appendChild(item);
    });
    
    
    document.getElementById('wins').innerHTML = 'Games Won: ' + prevResp.score;
    document.getElementById('losses').innerHTML = 'Games Lost: ' + (prevResp.total - prevResp.score);
}

/**
 * Creates the buttons and adds them to the display.
 */
function initButtons() {
    let container = document.getElementById('keyboard');
    for (let i = 65; i < 91; i++) {
        let button = document.createElement('button');
        let letter = String.fromCharCode(i);
        button.innerHTML = letter;
        button.classList.add('letter');
        button.id = `button-${letter}`;
        button.addEventListener('click', function()
        {
            guessLetter(letter);
        });
        container.appendChild(button);
    }
}

/**
 * Loads the initial letter from the server
 */
function loadLetters() {
    let req = new XMLHttpRequest();
    req.open('GET', '/stats', false);
    req.send(null);
    prevResp = JSON.parse(req.responseText);
    updateElements();
}

/**
 * Adding the event listener for initializing everything.
 */
document.addEventListener('DOMContentLoaded', function() {
    initButtons();
    loadLetters();
    document.getElementById('player-name').innerHTML = 'Username: ' + prevResp.username;
});