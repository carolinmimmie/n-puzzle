interface ITile {
  value: number;
}
const Tile = ({ value }: ITile) => {
  if (value === 0) return null;
  return <div className="tile">{value}</div>;
};

export default Tile;
