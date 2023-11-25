import Column from "./Column";
import "./parallax.scss";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useLens from "@/custom/helpers/useLens";
import { imgArr } from "@/assets/arries/arries";

const Parallax = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  useLens();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, innerHeight * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, innerHeight * 3.3]);

  const y3 = useTransform(scrollYProgress, [0, 1], [0, innerHeight * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, innerHeight * 3]);
  return (
    <div className="parallax blur-parallax " ref={container}>
      <Column ar={imgArr.slice(0, 3)} y={y1} />
      <Column ar={imgArr.slice(3, 6)} y={y2} />
      <Column ar={imgArr.slice(6, 9)} y={y3} />
      <Column ar={imgArr.slice(9)} y={y4} />
    </div>
  );
};

export default Parallax;
