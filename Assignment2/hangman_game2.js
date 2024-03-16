document.addEventListener('DOMContentLoaded', function() {
    addEventListenerToLetters(); 
    hangmanImageElement = document.getElementById('hangman-image');
    startGame(); // Automatically start the game when the page loads
});

function startGame() {
    fetch('api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'start' })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            updateUI(data);
        } else {
            console.error('Error starting game:', data.error);
        }
    })
    .catch(error => console.error('Error starting game:', error));
}

function guessLetter(letter) {
    fetch('api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'guess', letter: letter })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            updateUI(data);
        } else {
            console.error('Error guessing letter:', data.error);
        }
    })
    .catch(error => console.error('Error guessing letter:', error));
}

function updateUI(data) {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = data.wordPlaceholders.join(' ');

    const guessedLettersContainer = document.getElementById('guessed-letters');
    guessedLettersContainer.textContent = data.guessedLetters.join(', ');

    const hangmanImageElement = document.getElementById('hangman-image');
    hangmanImageElement.src = `images/${data.incorrectGuesses}.png`;

    const gamesWonElement = document.getElementById('gamesWon');
    const gamesLostElement = document.getElementById('gamesLost');
    gamesWonElement.textContent = data.gamesWon;
    gamesLostElement.textContent = data.gamesLost;

    if (data.wordPlaceholders.indexOf('_') === -1) {
        displayPopup('Congratulations! You guessed the word!', 'Play Again', startGame);
    } else if (data.incorrectGuesses === 6) {
        displayPopup(`Sorry! You ran out of guesses. The word was ${data.wordToGuess}`, 'Play Again', startGame);
    }
}

function addEventListenerToLetters() {
    const letterButtons = document.querySelectorAll('.letter');

    letterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const letter = button.textContent;
            guessLetter(letter);
        });
    });
}

function displayPopup(message, buttonText, buttonCallback) {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    const messageElement = document.createElement('p');
    messageElement.classList.add('popup-message');
    messageElement.textContent = message;

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('popup-button');
    buttonElement.textContent = buttonText;
    buttonElement.addEventListener('click', () => {
        document.body.removeChild(popupContainer);
        buttonCallback();
    });

    popupContainer.appendChild(messageElement);
    popupContainer.appendChild(buttonElement);

    document.body.appendChild(popupContainer);
}
