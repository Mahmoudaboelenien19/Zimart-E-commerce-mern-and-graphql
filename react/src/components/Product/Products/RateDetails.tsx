import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BiPlus } from "react-icons/bi";
import { opacityVariant, parentVariant } from "../../../variants/globals";
import Star from "./Aside/Star";
import { IoIosArrowDown } from "react-icons/io";

const RatingDetails = ({ arr, pos }: { pos: string; arr: number[] }) => {
  const [show, setShow] = useState(false);

  const stars = [];

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
        className="center rate-filter-par"
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
    <div className=" center gap">
      <IoIosArrowDown
        fontSize={15}
        onClick={() => setShow(!show)}
        color="var(--green)"
      />
      <AnimatePresence>
        {show && (
          <motion.div
            variants={parentVariant}
            style={{ [pos]: "140%" }}
            key={pos}
            id="star-details"
          >
            {stars}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RatingDetails;
