import React from "react";
import { motion } from "framer-motion";
import { ChildrenInterFace } from "@/interfaces/general";
interface Props extends ChildrenInterFace {
  cls?: string;
}
const Animation = ({ children, cls }: Props) => {
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
      className={cls}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
