import { motion } from "framer-motion";
import React from "react";
const textVariant = {
  start: { x: 0 },
  end: { x: "-320%" },
};
const SlideText = () => {
  return (
    <div className="slide-text-par">
      <motion.p
        variants={textVariant}
        initial="start"
        animate="end"
        transition={{ repeat: Infinity, duration: 60, repeatType: "mirror" }}
        id="slide-text"
      >
        Welcome to Zimart E-commerce Website
      </motion.p>
      ;
    </div>
  );
};

export default SlideText;
