import React from 'react';
import { initialSnakegameState } from 'models/ISnakeGame';
import CSnakeGame from 'models/CSnakeGame';
import GridRow from './GridRow';
import 'styles/snackgameStyles.scss';

const SnackGame: React.FC = (): React.ReactElement => {
  const [snakegameState, setSnakegameState] = React.useState(initialSnakegameState);
  CSnakeGame.init(snakegameState.snakegame);

  let message = 'Game on! :)';

  interface KeyboardEvent {
    key: string;
  }
  
  const handleKeyboardEvent = (event: KeyboardEvent) => {
    const keyMap : any = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }

    CSnakeGame.makeMove(keyMap[event.key]);
    
    setSnakegameState ({
      ...snakegameState,
      snakegame: {
        grid: snakegameState.snakegame.grid,
        food: CSnakeGame.food,
        snake: CSnakeGame.snake,
      }
    })
  }

  const handleResetClick = () => {
    CSnakeGame.init();

    setSnakegameState ({
      ...snakegameState,
      snakegame: {
        grid: snakegameState.snakegame.grid,
        food: CSnakeGame.food,
        snake: CSnakeGame.snake,
      }
    })
  }

  React.useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyboardEvent);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvent);
    };
  }, [handleKeyboardEvent]);
  
  return (
    <div className="page-root">
      <div className="board-root">
        {snakegameState.snakegame.grid.map((gridRow, row) => (
          <GridRow key={`${row}`} snakegame={snakegameState.snakegame} row={row} />
        ))}
        <div className="message">
          {message}
        </div>
        <button className="btn" onClick={handleResetClick}>
          Reset Game
        </button>
        <div className="github-container">
          <iframe
            frameBorder="0"
            height="20px"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=AKrougly&repo=a-snakegame&type=star"
            title="github-star"
            width="51px"
          />
          <iframe
            frameBorder="0"
            height="20px"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=AKrougly&type=follow"
            title="github-follow"
            width="123px"
          />
        </div>
      </div>
    </div>
  );
};

export default SnackGame;
