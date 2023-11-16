import { LazyLoadImage } from "react-lazy-load-image-component";
import { imgArr } from "@/assets/arries/arries";
import useModifyUrl from "@/custom/helpers/useModifyUrl";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HorizentalProducts = () => {
  const { getlink } = useModifyUrl();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xTransform = useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, -500]);
  return (
    <div className="horizental-wrapper relative " ref={ref}>
      <motion.div
        style={{ translateX: xTransform }}
        className={"  center products-animation-par gap "}
      >
        {[...Array(7)].map((_, i) => {
          return (
            <div className={"products-animate-slide border"} key={i}>
              <LazyLoadImage
                src={getlink(imgArr[i], 400)}
                effect="blur"
                wrapperClassName="img-par"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HorizentalProducts;
