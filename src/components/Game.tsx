import { useState } from "react";
import ShuffleButton from "./ShuffleButton";
import Tile from "./Tile";

const Game = () => {
  const rows = 3;
  const columns = 5;

  const generateGameArray = (rows: number, columns: number) => {
    const array = [];
    for (let i = 0; i < rows * columns; i++) {
      array.push(i);
    }
    return array;
  };

  const [gameArray, setGameArray] = useState(() =>
    generateGameArray(rows, columns)
  );
  console.log(gameArray);

  const shuffleTiles = () => {
    const shuffled = [...gameArray].sort(() => Math.random() - 0.5);
    setGameArray(shuffled);
  };
  const handleTileClick = (index: number) => {
    const emptyTileIndex = gameArray.indexOf(0);

    const clickedRow = Math.floor(index / columns);
    const clickedCol = index % columns;

    const emptyRow = Math.floor(emptyTileIndex / columns);
    const emptyCol = emptyTileIndex % columns;

    if (clickedRow === emptyRow || clickedCol === emptyCol) {
      const newGameArray = [...gameArray];
      newGameArray[emptyTileIndex] = newGameArray[index];
      newGameArray[index] = 0;

      setGameArray(newGameArray);
    }
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

      {/* <WinMessage></WinMessage> */}
    </div>
  );
};

export default Game;
