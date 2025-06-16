# Battleships React Game

A modern React-based implementation of the classic Battleships game where a player plays against computer-placed ships.

## Game Rules
- The game is played on a 10x10 grid
- The computer places the following ships:
  - 1 Battleship (5 squares)
  - 2 Destroyers (4 squares each)
- The game ends when all ships are sunk

## Requirements
- Node.js 14 or higher
- npm or yarn

## How to Run
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and visit: http://localhost:3000

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
   - Sunk ships are crossed out in red
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
   - When a ship is sunk, you'll see a message and it will be crossed out
   - The game ends when all ships are sunk

4. **Starting a New Game**
   - Click the "New Game" button at any time
   - All ships will be randomly placed again
   - The board will be cleared
   - Your progress will be reset

### Features
- Responsive design that works on desktop and mobile
- Modern React hooks for state management
- Component-based architecture for maintainability
- Smooth animations and hover effects
- Visual feedback for all game actions

### Build for Production
To create a production build:
```bash
npm run build
```

The build folder will contain the optimized production files.

### Technologies Used
- React 18
- CSS3 with modern features
- ES6+ JavaScript 