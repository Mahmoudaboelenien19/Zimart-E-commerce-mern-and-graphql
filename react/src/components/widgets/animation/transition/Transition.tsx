import { motion } from "framer-motion";
import "./transition.scss";
import { useState } from "react";
// import { useScrollToUp } from "@/custom/helpers/useScrolltoUp";
const opacityV = {
  start: { opacity: 1 },
  end: (i: number) => ({
    opacity: [1, 0.3, 0.1, 0],
    transition: { duration: 0.1, delay: 0.02 * i },
  }),
};
const transitionParVariant = {
  start: { opacity: 1 },
  end: { opacity: 0, transition: { when: "afterChildren" } },
};
export default function Transition() {
  const shuffle = (a: number[]) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };
  const fnOfBlocks = () => {
    const { innerWidth, innerHeight } = window;
    const blockSize = innerWidth * 0.05;
    const nbOfBlocks = Math.ceil(innerHeight / blockSize);
    const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));
    return shuffledIndexes.map((random, i) => {
      return (
        <motion.div
          key={i}
          variants={opacityV}
          custom={random}
          className="transition-item"
        />
      );
    });
  };
  // useScrollToUp();

  const [isFinished, setIsFinished] = useState(false);
  return (
    <>
      {!isFinished && (
        <motion.div
          className="transition"
          variants={transitionParVariant}
          onAnimationComplete={() => {
            setIsFinished(true);
          }}
          style={{
            zIndex: isFinished ? -1 : 100,
          }}
          animate={"end"}
          initial="start"
        >
          {[...Array(20)].map((_: unknown, i: number) => {
            return (
              <div key={i} className={"transition-col"}>
                {" "}
                {fnOfBlocks()}
              </div>
            );
          })}
        </motion.div>
      )}
    </>
  );
}
