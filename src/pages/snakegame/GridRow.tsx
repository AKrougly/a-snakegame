import React from 'react';

import { TSnakegame } from 'models/ISnakeGame';
import Cell from './Cell';

import 'styles/rowStyles.scss';

export interface IRowProps {
  snakegame: TSnakegame,
  row: number,
}

const Row: React.FC<IRowProps> = ({ snakegame, row }) => {

  return (
    <div className="row-root">
      {snakegame.grid[row].map((cell, col) => (
        <Cell key={`${cell.row}-${cell.col}`} cell={{row, col}}/>
      ))}
    </div>
  );
};

export default Row;
