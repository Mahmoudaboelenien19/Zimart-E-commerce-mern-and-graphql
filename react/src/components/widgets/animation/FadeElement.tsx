import React from "react";
import { motion } from "framer-motion";
import { ChildrenInterFace } from "@/interfaces/general";

interface Props extends ChildrenInterFace {
  cls?: string;
  transition?: number;
  delay?: number;
  fn?: (e?: any) => void;
}
const FadeElement = ({ children, cls, transition, delay, fn }: Props) => {
  return (
    <motion.div
      className={cls}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.2, 0.4, 0.6, 1] }}
      transition={{ duration: transition || 0.5, delay: delay || 0 }}
      onClick={fn ? fn : () => null}
    >
      {children}
    </motion.div>
  );
};

export default FadeElement;
