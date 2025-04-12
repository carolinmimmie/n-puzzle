interface ITile {
  value: number;
  handleTileClick: () => void;
}

const Tile = ({ value, handleTileClick }: ITile) => {
  return (
    <div
      onClick={value !== 0 ? handleTileClick : undefined}
      className={`tile ${value === 0 ? "hidden-tile" : ""}`}
    >
      {value !== 0 && value}
    </div>
  );
};

export default Tile;
