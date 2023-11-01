import { AnimatePresence, MotionProps, motion } from "framer-motion";
import useIsMobile from "@/custom/useIsMobile";
import { HTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  bool: boolean;
  AsideWidth: number;
  duration?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

const ContainerAnimation = ({
  children,
  bool,
  AsideWidth,

  ...props
}: Props) => {
  const { isMobile } = useIsMobile();
  const check = bool && !isMobile;

  return (
    <AnimatePresence initial={false}>
      <div className="w-100 ">
        <motion.section
          layout="position"
          {...props}
          style={{
            margin: check
              ? `.75rem 15px .75rem  calc( ${AsideWidth}px + 15px) `
              : ".75rem auto",
          }}
          transition={{
            delay: 0.3,
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.section>
      </div>
    </AnimatePresence>
  );
};
export default ContainerAnimation;
