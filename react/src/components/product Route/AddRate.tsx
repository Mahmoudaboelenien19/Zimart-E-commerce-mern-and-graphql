import React, { useState } from "react";
import Star from "../Product/Products/Aside/Star";
import { motion } from "framer-motion";

interface Props {
  setRateIndex: React.Dispatch<React.SetStateAction<number>>;
  rateIndex: number;
}

const AddRate = ({ setRateIndex, rateIndex }: Props) => {
  return (
    <div className="gap center">
      {[...Array(5)].map((st, i) => {
        return (
          <motion.span
            initial={{ scale: 1 }}
            key={i}
            onHoverStart={() => setRateIndex(i)}
            whileHover={{
              scale: [1, 1.5, 1.25],
              transition: { duration: 1, ease: "easeInOut" },
            }}
            animate={{ scale: rateIndex === i ? 1.25 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <Star bool={rateIndex >= i} />
          </motion.span>
        );
      })}
    </div>
  );
};

export default AddRate;
