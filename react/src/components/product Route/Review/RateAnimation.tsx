import { useInView, useAnimate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type Props = { rate: number };

const RateAnimation = ({ rate }: Props) => {
  const [count, setCount] = useState(0);
  const [ref, fn] = useAnimate();
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (!inView) {
      setCount(0);
    }
  }, [inView]);
  let interval: number | undefined;
  useEffect(() => {
    if (count < rate && inView) {
      interval = setInterval(() => {
        setCount((cur) => cur + 1);
        fn(ref.current, { y: [5, 0] }, { duration: 0.1, ease: "easeInOut" });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [count, inView]);
  return (
    <div ref={ref} key="counte" className="user-rate">
      {count}
    </div>
  );
};

export default RateAnimation;
