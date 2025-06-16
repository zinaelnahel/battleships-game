import React from 'react';
import Cell from './Cell';
import './GameBoard.css';

const GameBoard = ({ grid, shots, onCellClick, gameOver }) => {
  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const position = `${row},${col}`;
        const hasShip = grid[row] && grid[row][col] !== null;
        const isShot = shots.has(position);
        const isHit = isShot && hasShip;
        const isMiss = isShot && !hasShip;

        cells.push(
          <Cell
            key={position}
            row={row}
            col={col}
            isHit={isHit}
            isMiss={isMiss}
            isShot={isShot}
            onClick={() => onCellClick(row, col)}
            disabled={gameOver || isShot}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="game-board">
      {renderGrid()}
    </div>
  );
};

export default GameBoard; 