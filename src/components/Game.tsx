import { useState } from "react";
import ShuffleButton from "./ShuffleButton";
import Tile from "./Tile";

const Game = () => {
  const rows = 3;
  const columns = 5;

  const generateGameArray = (rows: number, columns: number) => {
    const array = [];
    for (let i = 1; i < rows * columns; i++) {
      array.push(i);
    }
    array.push(0);
    return array;
  };

  const [gameArray, setGameArray] = useState(() =>
    generateGameArray(rows, columns)
  );

  const shuffleTiles = () => {
    const shuffled = [...gameArray].sort(() => Math.random() - 0.5);
    setGameArray(shuffled);
  };

  return (
    <div className="game">
      <div className="game__board">
        {gameArray.map((value, index) => (
          <Tile key={index} value={value}></Tile>
        ))}
      </div>
      <ShuffleButton shuffleTiles={shuffleTiles}></ShuffleButton>

      {/* <WinMessage></WinMessage> */}
    </div>
  );
};

export default Game;
