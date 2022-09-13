import CSnakeGame from 'models/CSnakeGame';

export type TCell = {
  row: number,
  col: number,
}
export type TRow = TCell[];
export type TGrid = TRow[];
export type TSnakegame = {
  grid: TGrid,
  food: TCell[],
  snake: {
    head: TCell,
    tail: TCell[],
  }
};
export type TSnakegameState = {
  snakegame: TSnakegame,
};

export const initialSnakegameState: TSnakegameState = {
  snakegame: CSnakeGame.initialSnakegame
};
