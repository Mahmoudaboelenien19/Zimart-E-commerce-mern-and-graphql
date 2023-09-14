import React from "react";
import { motion } from "framer-motion";
import { ChildrenInterFace } from "../../../interfaces/general";
interface Props extends ChildrenInterFace {
  cls?: string;
  once?: boolean;
}
const FadeWithY = ({ cls = "", once = false, children }: Props) => {
  return (
    <motion.div
      style={{ opacity: 0 }}
      whileInView={{ opacity: [0, 0.4, 1], y: [30, 0] }}
      viewport={{ once }}
      className={cls}
    >
      {" "}
      {children}
    </motion.div>
  );
};

export default FadeWithY;
