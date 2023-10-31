import { motion, useAnimate } from "framer-motion";
import { useState } from "react";
type Props = {
  word: string;
  clr: string;
};

const lineVariant = {
  start: (clr: string) => ({
    width: 0,
    backgroundColor: clr,
  }),
  end: {
    width: "100%",
    transition: { duration: 0.5 },
  },
};
const specialVariant = {
  start: { opacity: 0, scale: 0.7 },
  end: {
    bottom: 0,
    opacity: [0, 1],
    scale: [0.7, 0.9, 1],
    transition: {
      when: "beforeChildren",
      ease: [0.33, 1, 0.68, 1],
      duration: 0.2,
    },
  },
};
const SpecialWord = ({ clr, word }: Props) => {
  const [ref, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      key={clr}
      variants={specialVariant}
      className="relative special-word "
      style={{ color: isHovered ? clr : "var(--third)" }}
      ref={ref}
      onHoverStart={() => {
        setIsHovered(true);
        animate(".special-head-line", {
          height: ["15%", "90%"],
          bottom: 0,
          backgroundColor: "var(--third)",
        });
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        animate(".special-head-line", {
          height: ["70%", "15%"],
          bottom: "15%",
          backgroundColor: clr,
        });
      }}
    >
      {word}
      <motion.div
        variants={lineVariant}
        className="special-head-line"
        custom={clr}
      />
    </motion.div>
  );
};

export default SpecialWord;
