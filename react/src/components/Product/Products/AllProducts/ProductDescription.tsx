import { motion } from "framer-motion";
import React from "react";

interface Props {
  description: string;
}
const ProductDescription = ({ description }: Props) => {
  return (
    <motion.p
      key={description}
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height: 70,
        opacity: 1,
        transition: { delay: 0.3, duration: 0.3 },
      }}
      style={{ fontWeight: "normal" }}
    >
      {description}
    </motion.p>
  );
};

export default ProductDescription;
