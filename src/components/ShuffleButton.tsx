interface IShuffleButton {
  shuffleTiles: () => void;
}
const ShuffleButton = ({ shuffleTiles }: IShuffleButton) => {
  return <button onClick={shuffleTiles}>ShuffleButton</button>;
};

export default ShuffleButton;
