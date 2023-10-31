import { useContext } from "react";
import { TbMoonFilled } from "react-icons/tb";
import { themeContext } from "../../context/ThemContext";
import Title from "../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import { FaSun } from "react-icons/fa";
import useIsMobile from "@/custom/useIsMobile";

const variant = {
  start: (theme: string) => ({ x: theme === "light" ? 0 : 10 }),
  end: (theme: string) => ({
    x: theme === "dark" ? 0 : 10,
    rotate: theme === "light" ? 360 : -360,
  }),
};
const ThemeToggle = () => {
  const { toggleTheme, theme } = useContext(themeContext);

  const { isMobile, isMidScreen } = useIsMobile();

  return (
    <motion.div className="theme">
      <Title
        title={theme === "light" ? "apply dark mode" : "apply light mode"}
        dir={!isMobile || !isMidScreen ? "right" : "left"}
      >
        <AnimatePresence initial={false}>
          <motion.div
            className="toggle-icon center"
            variants={variant}
            animate="end"
            initial="start"
            custom={theme}
          >
            {theme === "dark" ? (
              <TbMoonFilled onClick={toggleTheme} color="var(--third)" />
            ) : (
              <FaSun className="sun" onClick={toggleTheme} />
            )}
          </motion.div>
        </AnimatePresence>
      </Title>
    </motion.div>
  );
};

export default ThemeToggle;
