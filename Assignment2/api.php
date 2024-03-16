<?php
session_start();

// Include hangman.php with game logic functions
require_once 'hangman.php';

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'start':
            startGame();
            echo json_encode(['success' => true]);
            break;
        case 'guess':
            if (isset($_POST['letter'])) {
                guessLetter($_POST['letter']);
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Letter not provided']);
            }
            break;
        // Add more cases for other actions
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
            break;
    }
}
?>
