interface IButton {
  children: React.ReactNode;
  shuffleTiles: () => void;
}

const Button = ({ children, shuffleTiles }: IButton) => {
  return <button onClick={shuffleTiles}>{children}</button>;
};

export default Button;
