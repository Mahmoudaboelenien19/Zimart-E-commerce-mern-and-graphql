import useTuple from "@/custom/helpers/useTuple";
import { AnimatePresence, motion } from "framer-motion";
const variant = {
  start: (bool: number) => ({ y: bool ? 10 : -10, opacity: 0 }),
  end: { y: 0, opacity: 1 },
  exit: (bool: number) => ({ y: bool ? -10 : 10, opacity: 0 }),
};
const Price = ({ num }: { num: number }) => {
  const { dir } = useTuple(num);
  return (
    <AnimatePresence mode="wait" custom={dir === "increase" ? true : false}>
      <motion.div
        variants={variant}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        initial="start"
        animate="end"
        exit="exit"
        key={num}
        custom={dir === "increase" ? true : false}
      >
        {num}
      </motion.div>
    </AnimatePresence>
  );
};

export default Price;
