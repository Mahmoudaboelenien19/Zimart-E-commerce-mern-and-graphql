import React from "react";
import { ChildrenInterFace } from "../../interfaces/general";
import { motion } from "framer-motion";
interface Props extends ChildrenInterFace {
  addIntialX?: boolean;
}
const Animation = ({ children }: Props) => {
  const variant = {
    start: { opacity: 0 },
    end: { opacity: [0, 0.2, 0.4, 0.6, 1] },
    exit: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      variants={variant}
      initial="start"
      animate="end"
      exit={"exit"}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
