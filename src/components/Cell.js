import React from 'react';
import './Cell.css';

const Cell = ({ row, col, isHit, isMiss, isShot, onClick, disabled }) => {
  const getCellContent = () => {
    if (isHit) return '💥';
    if (isMiss) return '💦';
    return '';
  };

  const getCellClass = () => {
    let className = 'cell';
    if (isHit) className += ' hit';
    if (isMiss) className += ' miss';
    if (disabled) className += ' disabled';
    return className;
  };

  return (
    <div
      className={getCellClass()}
      onClick={disabled ? undefined : onClick}
      data-row={row}
      data-col={col}
    >
      {getCellContent()}
    </div>
  );
};

export default Cell; 