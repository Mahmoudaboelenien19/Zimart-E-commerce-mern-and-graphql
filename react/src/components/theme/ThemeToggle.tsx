import { useEffect } from "react";
import { TbMoonFilled } from "react-icons/tb";
import Title from "../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import { FaSun } from "react-icons/fa";
import useIsMobile from "@/custom/helpers/useIsMobile";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import { toggleTheme } from "@/redux/themeSlice";

const variant = {
  start: (theme: string) => ({ x: theme === "light" ? 0 : 10 }),
  end: (theme: string) => ({
    x: theme === "dark" ? 0 : 10,
    rotate: theme === "light" ? 360 : -360,
  }),
};
const ThemeToggle = () => {
  const dispatch = useAppDispatch();

  const { theme } = useAppSelector((st) => st.theme);

  const toggleThemefn = () => {
    dispatch(toggleTheme(theme === "light" ? "dark" : "light"));
  };
  const { isMobile, isMidScreen } = useIsMobile();

  return (
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
            <TbMoonFilled onClick={toggleThemefn} className="moon" />
          ) : (
            <FaSun className="sun" onClick={toggleThemefn} />
          )}
        </motion.div>
      </AnimatePresence>
    </Title>
  );
};

export default ThemeToggle;
