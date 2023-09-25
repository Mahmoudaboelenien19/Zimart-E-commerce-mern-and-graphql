import React, { useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  checkSvgVariant,
  checkpathVariant,
  parentVarient,
} from "../variants/CheckSvg";
import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";

interface Props {
  filter: string | number;
  isChecked: ConstrainBoolean;
  index?: number;
}

const Checkbox = ({ filter, index, isChecked }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme } = useContext(themeContext);
  return (
    <motion.div
      className={clsx("custom-check-parent center ")}
      variants={parentVarient}
      initial="start"
      animate="end"
      exit={"exit"}
      ref={ref}
      custom={{ filter, isChecked, index }}
    >
      <AnimatePresence mode="wait">
        {isChecked && (
          <motion.svg
            viewBox="0 0 24 24"
            width="12px"
            height="12px"
            className={clsx("center custom-check", theme)}
            variants={checkSvgVariant}
            initial="start"
            animate="end"
            exit={"exit"}
            custom={index}
          >
            <motion.path
              fill="none"
              stroke="var(--wheat)"
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M21 6L9 18 4 13"
              variants={checkpathVariant}
              custom={index}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Checkbox;
