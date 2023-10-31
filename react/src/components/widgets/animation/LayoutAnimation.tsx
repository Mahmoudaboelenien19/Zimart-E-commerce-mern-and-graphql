import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
type Props = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;
const LayoutAnimation = ({ children, ...props }: Props) => {
  return (
    <motion.div {...props} layout>
      {children}
    </motion.div>
  );
};

export default LayoutAnimation;
