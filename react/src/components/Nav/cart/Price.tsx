import React from "react";
import { motion } from "framer-motion";
import { opacityVariant } from "@/variants/globals";

const Price = ({ num }: { num: number }) => {
  return (
    <motion.span
      variants={opacityVariant}
      transition={{ duration: 0.2 }}
      initial="start"
      animate="end"
      exit="exit"
      key={Math.random()}
    >
      {num}
    </motion.span>
  );
};

export default Price;
