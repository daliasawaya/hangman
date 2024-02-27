# Design System for Hangman Game

## Fonts:
- **Title Font**: Arial, sans-serif
- **Letter Font**: Arial, sans-serif
- **Scoreboard Font**: Arial, sans-serif

## Colors:
- **Background Color**: ![rgb(248, 241, 225)](https://via.placeholder.com/15/F8F1E1/000000?text=+)
- **Letter Background Color**: ![rgb(229, 186, 229)](https://via.placeholder.com/15/E5BAE5/000000?text=+)
- **Letter Border Color**: ![blueviolet](https://via.placeholder.com/15/8A2BE2/000000?text=+)
- **Guessed Letter Background Color**: ![#ccc](https://via.placeholder.com/15/cccccc/000000?text=+)
- **Guessed Letter Text Color**: ![#888](https://via.placeholder.com/15/888888/000000?text=+)
- **Placeholder Line Color**: ![black](https://via.placeholder.com/15/000000/000000?text=+)
- **Title Text Color**: ![#4CAF50](https://via.placeholder.com/15/4CAF50/000000?text=+)
- **Scoreboard Background Color**: ![#ccf7ce](https://via.placeholder.com/15/ccf7ce/000000?text=+)

## Hangman Images:
- **File Names**:
  - `outline1.png`: Initial state of the hangman
  - `head2.png`: After 1 incorrect guess
  - `body3.png`: After 2 incorrect guesses
  - `rightarm4.png`: After 3 incorrect guesses
  - `botharms5.png`: After 4 incorrect guesses
  - `rightleg6.png`: After 5 incorrect guesses
  - `bothlegs7.png`: After 6 incorrect guesses (game is lost)

## Main Components:

1. **Title**:
   - **Text Alignment**: Center
   - **Font Size**: 48px
   - **Text Color**: ![#4CAF50](https://via.placeholder.com/15/4CAF50/000000?text=+)
   - **Font Family**: Arial, sans-serif
   - **Text Transform**: Uppercase
   - **Letter Spacing**: 2px
   - **Text Shadow**: 1px 1px 2px rgba(0, 0, 0, 0.3)

2. **Word Display**:
   - Displayed as placeholders for each letter in the word to guess.
   - Font size: 20px
   - Font color: ![black](https://via.placeholder.com/15/000000/000000?text=+)

3. **Keyboard**:
   - A row of buttons representing each letter of the alphabet.
   - Background Color: ![rgb(229, 186, 229)](https://via.placeholder.com/15/E5BAE5/000000?text=+)
   - Border Color: ![blueviolet](https://via.placeholder.com/15/8A2BE2/000000?text=+)
   - Font color: ![blueviolet](https://via.placeholder.com/15/8A2BE2/000000?text=+)
   - Font weight: bold

4. **Hangman Image**:
   - Displays the current state of the hangman.
   - Positioned on the left side of the screen.
   - Size: 400px width (maintaining aspect ratio).

5. **Scoreboard**:
   - Displays the number of games won and lost.
   - Background Color: ![#ccf7ce](https://via.placeholder.com/15/ccf7ce/000000?text=+)
   - Padding: 10px
   - Border Radius: 5px
   - Box Shadow: 0 0 10px rgba(0, 0, 0, 0.1)
   - Font Family: Arial, sans-serif

