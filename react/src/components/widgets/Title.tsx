import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ReactNode, useState } from "react";
type Props = {
  title: string;
  dir?: string;
  className?: string;
  abs?: boolean;
  children: ReactNode;
};
const variant = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.1 },
  },
};
const Title = ({ title, className, dir, children, abs }: Props) => {
  const [showTitle, setShowTitle] = useState(false);
  const handleShow = () => setShowTitle(true);
  const handleHide = () => setShowTitle(false);

  return (
    <motion.span
      className={clsx(!abs && "relative", className)}
      onHoverStart={handleShow}
      onHoverEnd={handleHide}
      onTapStart={handleHide}
    >
      {children}
      <AnimatePresence mode="wait">
        {showTitle && title !== "" && (
          <motion.span
            variants={variant}
            key={title}
            initial="start"
            exit={"exit"}
            animate="end"
            className={clsx(
              " custom-title center",
              dir === "left" ? "left" : "right"
            )}
            onHoverStart={handleHide}
          >
            {" "}
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
};

export default Title;
