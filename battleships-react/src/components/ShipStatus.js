import React from 'react';
import './ShipStatus.css';

const ShipStatus = ({ ships }) => {
  const getShipName = (index, size) => {
    if (size === 5) return 'Battleship';
    return `Destroyer ${index}`;
  };

  return (
    <div className="ships-remaining">
      <h2>Ships Remaining:</h2>
      <ul>
        {ships.map((ship, index) => (
          <li key={index} className={ship.isSunk() ? 'sunk' : ''}>
            {getShipName(index === 0 ? 1 : index, ship.size)} ({ship.size}) 
            <span className="hits">{ship.hits}</span>/{ship.size}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipStatus; 