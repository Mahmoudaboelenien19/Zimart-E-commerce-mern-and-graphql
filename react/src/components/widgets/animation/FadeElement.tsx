import { HTMLAttributes, ReactNode } from "react";
import { MotionProps, motion } from "framer-motion";

type Props = {
  children: ReactNode;
  duration?: number;
  delay?: number;
  endOpacity?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;
const FadeElement = ({
  children,
  duration,
  delay,
  endOpacity = 1,
  ...props
}: Props) => {
  return (
    <motion.div
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.2, 0.4, 0.5, endOpacity] }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration || 0.5, delay: delay || 0 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeElement;
