import React, { useContext, useRef } from "react";
import { TbMoonFilled } from "react-icons/tb";
import { themeContext } from "../../context/ThemContext";
import Title from "./Title";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaSun } from "react-icons/fa";

interface Props {
  linkClr?: MotionValue<string>;
  navClr?: MotionValue<string>;
}
const ThemeToggle = ({ linkClr, navClr }: Props) => {
  const { toggleTheme, theme } = useContext(themeContext);
  const variant = {
    start: { x: theme === "light" ? 0 : 10 },
    end: {
      x: theme === "dark" ? 0 : 10,
      rotate: theme === "light" ? 360 : -360,
    },
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    target: ref,
  });

  const clr1 = useTransform(scrollY, [0], [theme === "dark" ? "#000" : "#fff"]);

  const clr2 = useTransform(
    scrollY,
    [0],
    [theme !== "light" ? "#fff" : "#000"]
  );

  return (
    <motion.div className="theme" ref={ref}>
      <Title
        title={theme === "light" ? "apply dark mode" : "apply light mode"}
        dir="left"
      >
        <AnimatePresence initial={false}>
          <motion.div
            className="toggle-icon center"
            variants={variant}
            animate="end"
            style={{ background: navClr || clr1, color: linkClr || clr2 }}
            initial="start"
          >
            {theme === "dark" ? (
              <TbMoonFilled onClick={toggleTheme} className="above" />
            ) : (
              <FaSun className="above sun" onClick={toggleTheme} />
            )}
          </motion.div>
        </AnimatePresence>
      </Title>
    </motion.div>
  );
};

export default ThemeToggle;
