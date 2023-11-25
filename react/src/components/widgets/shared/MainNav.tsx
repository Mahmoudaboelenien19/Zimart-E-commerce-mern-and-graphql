import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className: string;
};
const MainNav = ({ children, className }: Props) => {
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: navRef,
    offset: ["start start", "end start"],
  });

  const boxShadow = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 0 0 000", ".5px .5px 2.5px 000"]
  );
  return (
    <motion.nav
      key={"main-nav"}
      ref={navRef}
      style={{
        boxShadow,
      }}
      className={className}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.nav>
  );
};

export default MainNav;
