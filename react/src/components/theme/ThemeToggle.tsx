import React, { useContext } from "react";
import { TbMoonFilled } from "react-icons/tb";
import { themeContext } from "../../context/ThemContext";
import Title from "../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import { FaSun } from "react-icons/fa";
import useNavTransition from "@/custom/useNavTransition";

const ThemeToggle = ({ isDash = false }: { isDash?: boolean }) => {
  const { toggleTheme, theme } = useContext(themeContext);
  const variant = {
    start: { x: theme === "light" ? 0 : 10 },
    end: {
      x: theme === "dark" ? 0 : 10,
      rotate: theme === "light" ? 360 : -360,
    },
  };

  const { navRef, LinkClr } = useNavTransition<HTMLDivElement>();
  return (
    <motion.div className="theme" ref={navRef}>
      <Title
        title={theme === "light" ? "apply dark mode" : "apply light mode"}
        dir="right"
      >
        <AnimatePresence initial={false}>
          <motion.div
            className="toggle-icon center"
            variants={variant}
            animate="end"
            initial="start"
            style={{ color: isDash ? "var(--third)" : LinkClr }}
          >
            {theme === "dark" ? (
              <TbMoonFilled
                style={{ color: isDash ? "var(--third)" : "inherit" }}
                onClick={toggleTheme}
                className="above"
              />
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
