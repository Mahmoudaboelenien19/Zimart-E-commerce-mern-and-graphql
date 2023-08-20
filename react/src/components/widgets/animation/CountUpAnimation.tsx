import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const CountUpAnimation = ({
  num,
  tofixed = 0,
}: {
  num: number;
  tofixed: number;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });

  useEffect(() => {
    if (inView) {
      motionValue.set(num);
    }
  }, [num, inView, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest: number) => {
      setTimeout(() => {
        if (ref.current && Number(latest.toFixed(tofixed)) <= num) {
          ref.current.textContent = latest.toFixed(tofixed);
        }
      }, 400);
    });
  }, [num, springValue]);

  return <span ref={ref}></span>;
};

export default CountUpAnimation;
