import { useState } from "react";
import ShuffleButton from "./ShuffleButton";
import Tile from "./Tile";
import WinMessage from "./WinMessage";

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
  const [isWinning, setIsWinning] = useState(false);

  const shuffleTiles = () => {
    const shuffled = [...gameArray].sort(() => Math.random() - 0.5);
    setGameArray(shuffled);
  };
  const handleTileClick = (index: number) => {
    const emptyTileIndex = gameArray.findIndex((value) => value === 0);

    if (emptyTileIndex === -1) return;

    const clickedRow = Math.floor(index / columns);
    const clickedCol = index % columns;

    const emptyRow = Math.floor(emptyTileIndex / columns);
    const emptyCol = emptyTileIndex % columns;

    if (clickedRow === emptyRow || clickedCol === emptyCol) {
      const newGameArray = [...gameArray];
      newGameArray[emptyTileIndex] = newGameArray[index];
      newGameArray[index] = 0;

      setGameArray(newGameArray);
      setTimeout(() => {
        handleWinCheck(newGameArray);
      }, 0);
    }
  };

  const handleWinCheck = (gameArray: number[]) => {
    const isWinning = gameArray.every((value, index) => {
      if (value === 0) {
        return true;
      }
      return value === index + 1;
    });
    setIsWinning(isWinning);
  };

  return (
    <div className="game">
      <div className="game__board">
        {gameArray.map((value, index) => (
          <Tile
            key={index}
            value={value}
            handleTileClick={() => {
              console.log("Clicked index:", index, "value:", value);
              handleTileClick(index);
            }}
          ></Tile>
        ))}
      </div>
      <ShuffleButton shuffleTiles={shuffleTiles}></ShuffleButton>

      {isWinning && <WinMessage></WinMessage>}
    </div>
  );
};

export default Game;
