import { AnimatePresence, motion } from "framer-motion";
import { useId } from "react";

interface Props {
  err: string | undefined;
}
const InpErr = ({ err }: Props) => {
  const id = useId();
  return (
    <AnimatePresence mode="wait">
      {err && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: [0, 0.2, 0.4, 0.5, 1],
            height: 20,
            transition: {
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: {
              opacity: { duration: 0.1 },
              height: { delay: 0.1, duration: 0.4, ease: "easeInOut" },
            },
          }}
          id="err-form"
          key={id}
          className="center "
        >
          {err}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default InpErr;
