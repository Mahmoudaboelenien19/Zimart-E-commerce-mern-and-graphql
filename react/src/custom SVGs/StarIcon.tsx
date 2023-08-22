import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  id: number;
  avgRate: number;
  optional?: string;
}

const StarIcon = ({ avgRate, id, optional }: Props) => {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    if (avgRate !== -1) {
      const substract = avgRate - id;
      if (substract >= 1) {
        setFill(1);
      } else if (substract > 0) {
        setFill(substract);
      } else {
        setFill(0);
      }
    }
  }, [avgRate]);

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="svg-star"
    >
      <motion.path
        // stroke={"url(#star-gradient)"}
        // strokeWidth={1}
        // initial={{
        //   pathLength: 0,
        //   fill: "none",
        //   pathOffset: 0.4,
        //   stroke: `url(#fill-${id})`,
        // }}
        // animate={{
        //   pathOffset: 0,
        //   pathLength: 1,
        //   fill: `url(#fill-${id})`,
        //   transition: {
        //     pathLength: { delay: 3 + 0.3 * id, duration: 0.2 },
        //     fill: {
        //       delay: 5,
        //     },
        //   },
        // }}
        d="M7.86 0.247839L9.77681 4.95157L14.6414 5.40785C14.7183 5.41446 14.7915 5.4448 14.8519 5.49506C14.9123 5.54532 14.9573 5.61323 14.981 5.69026C15.0048 5.76728 15.0063 5.84996 14.9854 5.92789C14.9644 6.00581 14.922 6.07549 14.8635 6.12815L11.1812 9.49895L12.2671 14.4975C12.2784 14.55 12.2798 14.6043 12.2711 14.6574C12.2623 14.7105 12.2437 14.7612 12.2163 14.8067C12.1889 14.8522 12.1531 14.8916 12.1112 14.9225C12.0692 14.9535 12.0219 14.9754 11.9718 14.9871C11.8683 15.01 11.7603 14.9888 11.6717 14.9281L7.49274 12.3084L3.30283 14.9409C3.25906 14.9688 3.21047 14.9873 3.15986 14.9954C3.10925 15.0035 3.05762 15.0009 3.00794 14.9879C2.95826 14.975 2.91153 14.9518 2.87042 14.9197C2.82931 14.8877 2.79464 14.8474 2.76842 14.8012C2.74215 14.756 2.72464 14.7058 2.7169 14.6534C2.70915 14.6011 2.71132 14.5476 2.72328 14.4962L3.81041 9.49766L0.132953 6.12815C0.0556555 6.05611 0.00828542 5.95513 0.000987747 5.84685C-0.00630992 5.73857 0.027045 5.6316 0.0939094 5.54883C0.167602 5.46952 0.267846 5.42354 0.373318 5.42067L5.21965 4.96439L7.13646 0.247839C7.16738 0.174121 7.21804 0.11144 7.28228 0.0674352C7.34651 0.02343 7.42154 0 7.49823 0C7.57492 0 7.64995 0.02343 7.71418 0.0674352C7.77841 0.11144 7.82908 0.174121 7.86 0.247839Z"
        fill={`url(#fill-${id}-${optional ? optional : ""})`}
      />
      <defs>
        <linearGradient
          id={`fill-${id}-${optional ? optional : ""}`}
          x1="15"
          y1="7"
          x2="1.86511e-07"
          y2="7"
          gradientUnits="userSpaceOnUse"
        >
          {fill !== 1 && (
            <stop offset={(1 - fill).toString()} stopColor="#D3D3D3" />
          )}
          <stop offset={fill.toString()} stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StarIcon;
