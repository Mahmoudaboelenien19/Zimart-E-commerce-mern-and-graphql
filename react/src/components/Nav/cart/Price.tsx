import { motion } from "framer-motion";
import { opacityVariant } from "@/lib/variants/globals";

const Price = ({ num }: { num: number }) => {
  return (
    <motion.span
      variants={opacityVariant}
      transition={{ duration: 0.2 }}
      initial="start"
      animate="end"
      exit="exit"
    >
      {num}
    </motion.span>
  );
};

export default Price;
