import { themeContext } from "@/context/ThemContext";
import { useScroll, useTransform } from "framer-motion";
import { useContext, useRef } from "react";

const useNavTransition = <T extends HTMLElement>() => {
  const navRef = useRef<T | null>(null);
  const { theme } = useContext(themeContext);
  const { scrollY } = useScroll({
    target: navRef,
    layoutEffect: false,
  });

  const boxShadow = useTransform(
    scrollY,
    [0, 0.5],
    ["0 0 0 000", ".5px .5px 2.5px 000"]
  );
  const bg = useTransform(
    scrollY,
    [0, 0.5],
    ["rgba(0,0,0,0)", theme === "light" ? "#fffeff" : "#263238"]
  );

  const height = useTransform(scrollY, [0, 0.5], [60, 50]);

  const scale = useTransform(scrollY, [0, 0.5], [1.2, 1]);
  return { navRef, boxShadow, scale, bg, height };
};

export default useNavTransition;
