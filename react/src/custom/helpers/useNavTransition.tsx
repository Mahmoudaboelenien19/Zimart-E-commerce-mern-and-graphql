import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const useNavTransition = <T extends HTMLElement>() => {
  const navRef = useRef<T>(null);
  const { scrollY } = useScroll({
    target: navRef,
    layoutEffect: false,
  });

  const boxShadow = useTransform(
    scrollY,
    [0, 0.5],
    ["0 0 0 000", ".5px .5px 2.5px 000"]
  );

  const scale = useTransform(scrollY, [0, 0.5], [1.2, 1]);
  return { navRef, boxShadow, scale };
};

export default useNavTransition;
