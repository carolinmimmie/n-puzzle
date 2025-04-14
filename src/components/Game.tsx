import { GAME_SETTINGS } from "../config";
import { useEffect, useState } from "react";
import Tile from "./Tile";
import WinMessage from "./WinMessage";
import Button from "./Button";

const Game = () => {
  const rows = GAME_SETTINGS.rows;
  const columns = GAME_SETTINGS.columns;

  const generateGameArray = (rows: number, columns: number) => {
    const array = [];
    for (let i = 1; i < rows * columns; i++) {
      array.push(i);
    }
    array.push(0);
    return array;
  };

  const [gameArray, setGameArray] = useState<number[]>([]);
  const [isWinning, setIsWinning] = useState(false);

  useEffect(() => {
    const newArray = generateGameArray(rows, columns);
    const shuffled = [...newArray].sort(() => Math.random() - 0.5);
    setGameArray(shuffled);
  }, [rows, columns]);

  const shuffleTiles = () => {
    const shuffled = [...gameArray].sort(() => Math.random() - 0.5);
    setGameArray(shuffled);
    setIsWinning(false);
  };

  const handleTileClick = (index: number) => {
    const emptyTileIndex = gameArray.findIndex((value) => value === 0);
    if (emptyTileIndex === -1) return;

    const clickedTileRow = Math.floor(index / columns);
    const clickedTileCol = index % columns;
    const emptyTileRow = Math.floor(emptyTileIndex / columns);
    const emptyTileCol = emptyTileIndex % columns;

    if (clickedTileRow === emptyTileRow || clickedTileCol === emptyTileCol) {
      const newGameArray = [...gameArray];
      const emptyTileValue = newGameArray[emptyTileIndex];

      if (clickedTileRow === emptyTileRow) {
        if (index < emptyTileIndex) {
          for (let i = emptyTileIndex; i > index; i--) {
            newGameArray[i] = newGameArray[i - 1];
          }
        } else {
          for (let i = emptyTileIndex; i < index; i++) {
            newGameArray[i] = newGameArray[i + 1];
          }
        }
      } else if (clickedTileCol === emptyTileCol) {
        if (index < emptyTileIndex) {
          for (let i = emptyTileIndex; i > index; i -= columns) {
            newGameArray[i] = newGameArray[i - columns];
          }
        } else {
          for (let i = emptyTileIndex; i < index; i += columns) {
            newGameArray[i] = newGameArray[i + columns];
          }
        }
      }

      newGameArray[index] = emptyTileValue;
      setGameArray(newGameArray);
      setTimeout(() => {
        handleWinCheck(newGameArray);
      }, 0);
    }
  };

  const handleWinCheck = (gameArray: number[]) => {
    const isWinning = gameArray.every((value, index) => {
      if (index === gameArray.length - 1) {
        return value === 0;
      }
      return value === index + 1;
    });

    setIsWinning(isWinning);
  };

  return (
    <div className="game">
      <div
        className="game__board"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {gameArray.map((value, index) => (
          <Tile
            key={index}
            value={value}
            handleTileClick={() => handleTileClick(index)}
          />
        ))}
      </div>
      <Button shuffleTiles={shuffleTiles}>Mix it up!</Button>
      {isWinning && <WinMessage shuffleTiles={shuffleTiles} />}
    </div>
  );
};

export default Game;
