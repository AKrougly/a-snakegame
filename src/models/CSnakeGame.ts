import { TRow, TCell, TSnakegame } from 'models/ISnakeGame';
import { find_index, object_in_array, object_equals } from 'utils/utils';

class SnakeGame {
  static rowCount: number = 10;
  static columnCount: number = 10;
  static Moves : string[] = ['up', 'down', 'left', 'right']
  snakegame: TSnakegame = Object.assign({}, this.initialSnakegame);
  move: TCell = { row: 0, col: 0 };

  init = (_snakegame: TSnakegame = this.initialSnakegame) => {
    this.snakegame = {
      ...this.snakegame,
      grid: _snakegame.grid,
      food: _snakegame.food,
      snake: _snakegame.snake
    };
  }

  get food() {
    return this.snakegame.food;
  }

  get snake() {
    return this.snakegame.snake;
  }

  get randomCell() {
    return {
      row: Math.floor((Math.random() * SnakeGame.rowCount)),
      col: Math.floor((Math.random() * SnakeGame.columnCount))
    }
  }

  get initialSnakegame() {
    return {
      ...this.snakegame,
      grid: [...Array(SnakeGame.rowCount)].map((row, i): TRow => ([...Array(SnakeGame.columnCount)].map((col, j): TCell => ({row: i, col: j})))),
      food: Array(1).fill(this.randomCell),
      snake: {
        head: this.randomCell,
        tail: []
      }
    };
  }

  cookFood = (): TCell => {
    let cell: TCell;
    do {
      cell = this.randomCell
    } while (object_equals(cell, this.snakegame.snake.head) || object_in_array(this.snakegame.snake.tail, cell))

    return cell;
  }
  
  eatFood = (): boolean => {
    const idx: number = find_index(this.snakegame.food, this.snakegame.snake.head) as number;

    if (idx !== -1) {
      this.snakegame.food[idx] = this.cookFood()
      return true;
    }
    return false;
  }

  makeSnakeMove = (move: TCell) => {
    let oldHead = this.snakegame.snake.head;
    let newHead: TCell = {row: this.snakegame.snake.head.row + move.row, col: this.snakegame.snake.head.col + move.col }
    if (newHead.row >= 0 && newHead.row < SnakeGame.rowCount &&
      newHead.col >= 0 && newHead.col < SnakeGame.columnCount &&
      !object_equals(oldHead, newHead) &&
      !object_in_array(this.snakegame.snake.tail, newHead)) {
      this.snakegame.snake.head = newHead;
      this.snakegame.snake.tail.unshift({
        row: oldHead.row,
        col: oldHead.col,
      })

      if (!this.eatFood()) {
        this.snakegame.snake.tail.pop()
      }
    }
  }

  makeMove = (direction: string) => {
    let move: TCell;

    switch (direction) {
      case 'up': move = { row: -1, col: 0 }; break;
      case 'down': move = { row: 1, col: 0 }; break;
      case 'left': move = { row: 0, col: -1 }; break;
      case 'right': move = { row: 0, col: 1 }; break;
      default: move = {row: 0, col: 0 }; break;
    }

    this.makeSnakeMove(move);
  }

  getCellContent = (cell: TCell): string => {
    return object_equals(cell, this.snakegame.snake.head)
    ? '@'
    : object_in_array(this.snakegame.snake.tail, cell)
      ? 'o'
      : object_in_array(this.snakegame.food, cell)
        ? '$'
        : String.fromCharCode(160); // &nbsp;

    }
/*
    return object_in_array(cell, this.snakegame.food)
    ? '$'
    : object_equals(cell, this.snakegame.snake.head)
      ? '@'
      : object_in_array(cell, this.snakegame.snake.tail)
      ? 'o'
      : String.fromCharCode(160); // &nbsp;
*/
}

export default new SnakeGame()