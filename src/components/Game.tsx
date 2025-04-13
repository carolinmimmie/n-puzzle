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

    const clickedTileRow = Math.floor(index / columns);
    const clickedTileCol = index % columns;
    console.log(clickedTileCol);
    console.log(clickedTileRow);

    const emptyTileRow = Math.floor(emptyTileIndex / columns);
    const emptyTileCol = emptyTileIndex % columns;

    if (clickedTileRow === emptyTileRow || clickedTileCol === emptyTileCol) {
      const newGameArray = [...gameArray];

      const emptyTileValue = newGameArray[emptyTileIndex];
      console.log("tommarutansindex" + emptyTileIndex);

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
      console.log(
        "Den tomma rutan har blivit flyttat till index " + newGameArray[index]
      );
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
