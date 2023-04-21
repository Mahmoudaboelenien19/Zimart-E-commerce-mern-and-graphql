import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  checkSvgVariant,
  checkpathVariant,
  parentVarient,
} from "../variants/CheckSvg.js";

const CircleCheckSvg = ({ check }: { check: boolean }) => {
  return (
    <motion.div
      className="circle-check-parent center"
      variants={parentVarient}
      initial="start"
      animate="end"
      exit={"exit"}
      custom={check}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="12px"
        height="12px"
        className="center custom-check"
        variants={checkSvgVariant}
        initial="start"
        animate="end"
        exit={"exit"}
      >
        <motion.path
          fill="none"
          stroke="var(--wheat-light)"
          strokeMiterlimit="10"
          strokeWidth="3"
          d="M21 6L9 18 4 13"
          variants={checkpathVariant}
        />
      </motion.svg>
    </motion.div>
  );
};

export default CircleCheckSvg;
