<?php
session_start();

// Function to start a new game
function startGame() {
    $_SESSION['wordToGuess'] = generateRandomWord();
    $_SESSION['wordLetters'] = str_split($_SESSION['wordToGuess']);
    $_SESSION['guessedLetters'] = [];
    $_SESSION['incorrectGuesses'] = 0;
}

// Function to generate a random word
function generateRandomWord() {
    $words = ["APPLE", "BANANA", "ORANGE", "STRAWBERRY", "KIWI", "GRAPE", "PINEAPPLE", "WATERMELON", "BLUEBERRY", "MANGO", "GRAPEFRUIT", "AVOCADO", "PEAR", "CHERRY", "LEMON", "COCONUT", "GUAVA", "PAPAYA"];
    return $words[array_rand($words)];
}

// Function to guess a letter
function guessLetter($letter) {
    if (!isset($_SESSION['wordToGuess'])) {
        return ['success' => false, 'error' => 'Game not started'];
    }

    $guessedLetters = &$_SESSION['guessedLetters'];
    $wordLetters = $_SESSION['wordLetters'];

    // Check if letter has already been guessed
    if (in_array($letter, $guessedLetters)) {
        return ['success' => false, 'error' => 'Letter already guessed'];
    }

    // Add letter to guessed letters
    $guessedLetters[] = $letter;

    // Check if letter is in the word
    if (in_array($letter, $wordLetters)) {
        // Update placeholders with correctly guessed letter
        foreach ($wordLetters as $index => $wordLetter) {
            if ($wordLetter === $letter) {
                $_SESSION['wordPlaceholders'][$index] = $letter;
            }
        }

        // Check if all letters have been guessed
        if (array_diff($wordLetters, $guessedLetters) === []) {
            endGame(true); // Win
            return ['success' => true, 'message' => 'Congratulations! You guessed the word!'];
        } else {
            return ['success' => true, 'message' => 'Letter guessed correctly'];
        }
    } else {
        // Incorrect guess
        $_SESSION['incorrectGuesses']++;
        
        // Check if lost
        if ($_SESSION['incorrectGuesses'] === 6) {
            endGame(false); // Loss
            return ['success' => true, 'message' => 'Sorry! You ran out of guesses. The word was ' . $_SESSION['wordToGuess']];
        } else {
            return ['success' => true, 'message' => 'Letter not in word'];
        }
    }
}

// Function to end the game
function endGame($win) {
    // Increment games won/lost
    if ($win) {
        if (!isset($_SESSION['gamesWon'])) {
            $_SESSION['gamesWon'] = 0;
        }
        $_SESSION['gamesWon']++;
    } else {
        if (!isset($_SESSION['gamesLost'])) {
            $_SESSION['gamesLost'] = 0;
        }
        $_SESSION['gamesLost']++;
    }

    // Reset game state
    unset($_SESSION['wordToGuess']);
    unset($_SESSION['wordLetters']);
    unset($_SESSION['guessedLetters']);
    unset($_SESSION['incorrectGuesses']);
    unset($_SESSION['wordPlaceholders']);
}

// Function to retrieve game state
function getGameState() {
    if (isset($_SESSION['wordToGuess'])) {
        $placeholders = isset($_SESSION['wordPlaceholders']) ? $_SESSION['wordPlaceholders'] : array_fill(0, strlen($_SESSION['wordToGuess']), '_');
        return [
            'wordToGuess' => $_SESSION['wordToGuess'],
            'wordPlaceholders' => $placeholders,
            'guessedLetters' => isset($_SESSION['guessedLetters']) ? $_SESSION['guessedLetters'] : [],
            'incorrectGuesses' => isset($_SESSION['incorrectGuesses']) ? $_SESSION['incorrectGuesses'] : 0,
            'gamesWon' => isset($_SESSION['gamesWon']) ? $_SESSION['gamesWon'] : 0,
            'gamesLost' => isset($_SESSION['gamesLost']) ? $_SESSION['gamesLost'] : 0
        ];
    } else {
        return ['error' => 'Game not started'];
    }
}
?>
