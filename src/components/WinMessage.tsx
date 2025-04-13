import { motion } from "framer-motion";
import { GiPartyPopper } from "react-icons/gi";
interface IWinMessage {
  shuffleTiles: () => void;
}
const WinMessage = ({ shuffleTiles }: IWinMessage) => {
  return (
    <motion.div
      className="winmessage"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="winmessage__container"
        initial={{ rotate: -180 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>
          <GiPartyPopper />
          Congrats! <GiPartyPopper />
        </h2>
        <p>You solved the puzzle!</p>
        <button onClick={shuffleTiles}>Play again</button>
      </motion.div>
    </motion.div>
  );
};

export default WinMessage;
