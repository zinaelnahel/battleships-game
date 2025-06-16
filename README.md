# Battleships Game

A modern web-based implementation of the classic Battleships game where a player plays against computer-placed ships.

## Game Rules
- The game is played on a 10x10 grid
- The computer places the following ships:
  - 1 Battleship (5 squares)
  - 2 Destroyers (4 squares each)
- The game ends when all ships are sunk

## Requirements
- Python 3.6 or higher
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## How to Run
1. Make sure you have Python installed
2. Open a terminal in the project directory
3. Start the local server:
```bash
python3 -m http.server 8000
```
4. Open your web browser and visit: http://localhost:8000

## User Interface Guide

### Main Components
1. **Game Board**
   - A 10x10 grid where you can click to fire
   - Each cell represents a potential target
   - Visual feedback for your shots:
     - 💥 (Red background): Hit
     - 💦 (Gray background): Miss
   - Hover effect on cells to show they're clickable

2. **Ships Remaining Panel**
   - Shows the status of each ship
   - Displays current hits for each ship
   - Updates automatically when you hit a ship
   - Format: "Ship Name (Size) Current Hits/Total Size"

3. **Message Box**
   - Provides feedback for your actions
   - Shows messages like:
     - "Hit!"
     - "Miss!"
     - "Ship sunk!"
     - "Congratulations! You've sunk all the ships!"

4. **New Game Button**
   - Located below the game board
   - Click to start a fresh game
   - Resets all ships and the board

### How to Play
1. **Starting the Game**
   - The game starts automatically when you load the page
   - Ships are placed randomly by the computer
   - The board is empty, ready for your first shot

2. **Taking Shots**
   - Click any cell on the grid to fire
   - You'll get immediate visual feedback:
     - Red cell with 💥 for hits
     - Gray cell with 💦 for misses
   - The message box will tell you the result
   - The ships remaining panel updates automatically

3. **Game Progress**
   - Track your progress through the ships remaining panel
   - Each hit is counted and displayed
   - When a ship is sunk, you'll see a message
   - The game ends when all ships are sunk

4. **Starting a New Game**
   - Click the "New Game" button at any time
   - All ships will be randomly placed again
   - The board will be cleared
   - Your score will be reset

### Tips
- Plan your shots strategically
- Look for patterns in your hits to find ships
- Use the ships remaining panel to track your progress
- Don't worry about the favicon.ico 404 error - it doesn't affect gameplay 