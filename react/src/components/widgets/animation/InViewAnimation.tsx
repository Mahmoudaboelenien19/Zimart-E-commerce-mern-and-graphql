import { HTMLAttributes, ReactNode } from "react";
import { MotionProps, motion } from "framer-motion";
import clsx from "clsx";
type Props = {
  children: ReactNode;
  once?: boolean;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;
const inViewVariant = {
  view: {
    opacity: [0, 0.2, 0.4, 0.6, 1],
    transition: { duration: 0.4 },
  },
  start: { opacity: 0 },
};
const InViewAnimation = ({
  className,
  once = false,
  children,
  ...props
}: Props) => {
  return (
    <motion.div
      {...props}
      className={clsx("opacity-0", className)}
      variants={inViewVariant}
      whileInView={"view"}
      initial={"start"}
      viewport={{ once, amount: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default InViewAnimation;
