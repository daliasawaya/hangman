
# Design System for Hangman Game

## Fonts:
- **Title Font**: Arial, sans-serif
- **Letter Font**: Arial, sans-serif
- **Scoreboard Font**: Arial, sans-serif

## Colors:
- **Background Color**: rgb(248, 241, 225)
- **Letter Background Color**: rgb(229, 186, 229)
- **Letter Border Color**: blueviolet
- **Guessed Letter Background Color**: #ccc
- **Guessed Letter Text Color**: #888
- **Placeholder Line Color**: black
- **Title Text Color**: #4CAF50
- **Scoreboard Background Color**: #ccf7ce

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
   - **Text Color**: #4CAF50
   - **Font Family**: Arial, sans-serif
   - **Text Transform**: Uppercase
   - **Letter Spacing**: 2px
   - **Text Shadow**: 1px 1px 2px rgba(0, 0, 0, 0.3)

2. **Word Display**:
   - Displayed as placeholders for each letter in the word to guess.
   - Font size: 20px
   - Font color: #000

3. **Keyboard**:
   - A row of buttons representing each letter of the alphabet.
   - Background Color: rgb(229, 186, 229)
   - Border Color: blueviolet
   - Font color: blueviolet
   - Font weight: bold

4. **Hangman Image**:
   - Displays the current state of the hangman.
   - Positioned on the left side of the screen.
   - Size: 400px width (maintaining aspect ratio).

5. **Scoreboard**:
   - Displays the number of games won and lost.
   - Background Color: #ccf7ce
   - Padding: 10px
   - Border Radius: 5px
   - Box Shadow: 0 0 10px rgba(0, 0, 0, 0.1)
   - Font Family: Arial, sans-serif

6. **Placeholder Container**:
   - Container for the placeholder lines representing each letter in the word to guess.
   - Positioned on the right side of the screen.
   - Font size: 20px
   - Margin: 0 15px
