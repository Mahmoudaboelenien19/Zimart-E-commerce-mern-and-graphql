import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const useLens = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
};

export default useLens;
