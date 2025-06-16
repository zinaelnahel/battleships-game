import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import ShipStatus from './ShipStatus';
import MessageBox from './MessageBox';
import './BattleshipsGame.css';

const BOARD_SIZE = 10;

class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.positions = [];
  }

  isSunk() {
    return this.hits === this.size;
  }
}

const BattleshipsGame = () => {
  const [ships, setShips] = useState([]);
  const [grid, setGrid] = useState([]);
  const [shots, setShots] = useState(new Set());
  const [message, setMessage] = useState('Welcome to Battleships! Click on the grid to fire.');
  const [gameOver, setGameOver] = useState(false);

  const initializeGame = useCallback(() => {
    // Create ships
    const newShips = [
      new Ship(5), // Battleship
      new Ship(4), // Destroyer 1
      new Ship(4)  // Destroyer 2
    ];

    // Create empty grid
    const newGrid = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null));

    // Place ships randomly
    newShips.forEach(ship => {
      let placed = false;
      while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * (BOARD_SIZE - (isHorizontal ? ship.size : 0)));

        if (canPlaceShip(ship, row, col, isHorizontal, newGrid)) {
          placeShip(ship, row, col, isHorizontal, newGrid);
          placed = true;
        }
      }
    });

    setShips(newShips);
    setGrid(newGrid);
    setShots(new Set());
    setMessage('Welcome to Battleships! Click on the grid to fire.');
    setGameOver(false);
  }, []);

  const canPlaceShip = (ship, row, col, isHorizontal, grid) => {
    for (let i = 0; i < ship.size; i++) {
      const r = isHorizontal ? row : row + i;
      const c = isHorizontal ? col + i : col;
      if (r >= BOARD_SIZE || c >= BOARD_SIZE || grid[r][c] !== null) {
        return false;
      }
    }
    return true;
  };

  const placeShip = (ship, row, col, isHorizontal, grid) => {
    for (let i = 0; i < ship.size; i++) {
      const r = isHorizontal ? row : row + i;
      const c = isHorizontal ? col + i : col;
      grid[r][c] = ship;
      ship.positions.push([r, c]);
    }
  };

  const handleCellClick = (row, col) => {
    if (gameOver) return;
    
    const position = `${row},${col}`;
    if (shots.has(position)) return;

    const newShots = new Set(shots);
    newShots.add(position);
    setShots(newShots);

    const ship = grid[row][col];
    if (ship) {
      ship.hits++;
      if (ship.isSunk()) {
        setMessage('Ship sunk!');
      } else {
        setMessage('Hit!');
      }
    } else {
      setMessage('Miss!');
    }

    // Update ships state to trigger re-render
    setShips([...ships]);

    // Check if game is over
    if (ships.every(s => s.isSunk())) {
      setMessage('Congratulations! You\'ve sunk all the ships!');
      setGameOver(true);
    }
  };

  const handleNewGame = () => {
    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <div className="battleships-game">
      <h1>Battleships</h1>
      
      <div className="game-info">
        <ShipStatus ships={ships} />
        <MessageBox message={message} />
      </div>

      <GameBoard 
        grid={grid}
        shots={shots}
        onCellClick={handleCellClick}
        gameOver={gameOver}
      />

      <button className="new-game-btn" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
};

export default BattleshipsGame; 