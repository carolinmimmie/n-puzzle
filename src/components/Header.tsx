import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 3 }}
      className="header"
    >
      Let's Play!
    </motion.div>
  );
};

export default Header;
