import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Star from "./Aside/Star";
import { IoIosArrowDown } from "react-icons/io";
import useClickOutside from "@/custom/useClickOutside";
import { opacityVariant, parentVariant } from "@/variants/globals";
import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";

const RatingDetails = ({ arr, pos }: { pos: string; arr: number[] }) => {
  const [show, setShow] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setShow(false);
  }, show);

  const stars = [];
  const { theme } = useContext(themeContext);
  for (let i = 1; i <= 5; i++) {
    const group: React.ReactNode[] = [];

    for (let g = 5; g >= 1; g--) {
      group.push(
        <Star
          key={`${Date.now()}-${Math.random().toString(16)}`}
          bool={g >= i ? true : false}
        />
      );
    }

    stars.push(
      <motion.div
        variants={opacityVariant}
        className={clsx("center rate-filter-par ")}
        style={{ width: "fit-content" }}
        key={`group-${i}`}
      >
        <span className="rate-filter">{group}</span>
        <span>
          ({arr.reduce((ac, cur) => (cur === 6 - i ? ac + 1 : ac), 0)})
        </span>
      </motion.div>
    );
  }

  return (
    <>
      {arr.length >= 1 && (
        <div className=" center gap">
          <IoIosArrowDown
            fontSize={15}
            onClick={() => setShow(!show)}
            color="var(--green)"
          />
          <AnimatePresence>
            {show && (
              <motion.div
                ref={ref}
                variants={parentVariant}
                style={{ [pos]: "140%" }}
                key={pos}
                id="star-details"
                className={theme}
              >
                {stars}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default RatingDetails;
