import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { opacityVariant } from "../../../variants/globals";

interface Props {
  err: string | undefined;
}
const InpErr = ({ err }: Props) => {
  return (
    <AnimatePresence mode="wait">
      {err && (
        <motion.span
          key={"text-area-desc"}
          className="err-form"
          variants={opacityVariant}
          transition={{ duration: 0.4 }}
          initial="start"
          animate="end"
          exit="exit"
        >
          {err}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default InpErr;
