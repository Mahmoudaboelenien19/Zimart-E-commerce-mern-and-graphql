import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { checkSvgVariant, checkpathVariant } from "../lib/variants/CheckSvg";
import clsx from "clsx";

interface Props {
  filter: string | number;
  isChecked: ConstrainBoolean;
}

const Checkbox = ({ filter, isChecked }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <motion.div
      className={clsx("custom-check-parent center ")}
      ref={ref}
      custom={filter === isChecked}
    >
      <AnimatePresence mode="wait">
        {isChecked && (
          <motion.svg
            viewBox="0 0 24 24"
            width="12px"
            height="12px"
            key={filter}
            className={clsx("center custom-check")}
            variants={checkSvgVariant}
            initial="start"
            exit={"exit"}
            animate="end"
          >
            <motion.path
              fill="none"
              stroke="var(--wheat)"
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M21 6L9 18 4 13"
              variants={checkpathVariant}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Checkbox;
