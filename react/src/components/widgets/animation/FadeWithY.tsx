import React from "react";
import { motion } from "framer-motion";
import { ChildrenInterFace } from "@/interfaces/general";
interface Props extends ChildrenInterFace {
  cls?: string;
  once?: boolean;
  delay?: number;
}
const FadeWithY = ({
  cls = "",
  once = false,
  delay = 0.3,
  children,
}: Props) => {
  return (
    <motion.div
      style={{ opacity: 0 }}
      initial={{ y: 100 }}
      whileInView={{ opacity: [0, 0.4, 0.8, 1], y: 0 }}
      viewport={{ once }}
      className={cls}
      transition={{ delay }}
    >
      {" "}
      {children}
    </motion.div>
  );
};

export default FadeWithY;
