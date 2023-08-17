import React from "react";
import { ChildrenInterFace } from "../../interfaces/general";
import { motion } from "framer-motion";
import { opacityVariant } from "../../variants/globals";

interface Props extends ChildrenInterFace {
  cls: string;
  transition?: number;
  delay?: number;
  fn?: () => void;
}
const FadeElement = ({ children, cls, transition, delay, fn }: Props) => {
  return (
    <motion.div
      className={cls}
      variants={opacityVariant}
      initial="start"
      animate="end"
      exit="exit"
      transition={{ duration: transition || 0.5, delay: delay || 0 }}
      onClick={fn ? fn : () => null}
    >
      {children}
    </motion.div>
  );
};

export default FadeElement;
