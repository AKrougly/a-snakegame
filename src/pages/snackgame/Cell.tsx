import React from 'react';
import { TCell } from 'models/ISnakeGame';
import CSnakeGame from 'models/CSnakeGame';

import 'styles/cellStyles.scss';

export interface ICellProps {
  cell: TCell,
}

const Cell: React.FC<ICellProps> = ({ cell }): React.ReactElement => {
  const classNames: string[] = ["cell-root"];

  return (
    <div className={classNames.join(' ')}>
      <div className="symbol">{CSnakeGame.getCellContent(cell)}</div>
    </div>
  );
};

export default Cell;
