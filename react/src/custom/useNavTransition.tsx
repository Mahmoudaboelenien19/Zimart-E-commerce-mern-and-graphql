import { useScroll, useTransform } from "framer-motion";
import { useContext, useRef } from "react";
import { themeContext } from "../context/ThemContext";

const useNavTransition = <T extends HTMLElement>() => {
  const { theme } = useContext(themeContext);
  const navRef = useRef<T | null>(null);
  const { scrollY } = useScroll({
    target: navRef,
    layoutEffect: false,
  });
  const navClr = useTransform(
    scrollY,
    [0, 0.5],
    [
      theme === "light" ? "#fffff00" : "#0000000",
      theme === "dark" ? "#fff" : "#000",
    ]
  );

  const LinkClr = useTransform(
    scrollY,
    [0, 0.5],
    [theme === "dark" ? "#fff" : "#000", theme === "light" ? "#fff" : "#000"]
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 0.5],
    ["0 0 0 000", ".5px .5px 1.5px 000"]
  );

  const scale = useTransform(scrollY, [0, 0.5], [1.4, 1]);
  return { navRef, navClr, LinkClr, boxShadow, scale };
};

export default useNavTransition;
