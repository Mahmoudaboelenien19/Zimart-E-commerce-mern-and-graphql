import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  checkSvgVariant,
  checkpathVariant,
  parentVarient,
} from "../variants/CheckSvg";
import { checkContext } from "../components/dashboard/Order/Orders";

interface Props {
  filter: string | number;
  isChecked: ConstrainBoolean;
  index?: number;
}

const Checkbox = ({ filter, index, isChecked }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { selectALl } = useContext(checkContext);
  const inview = useInView(ref);
  // useEffect(() => {
  //   if (typeof index === "number") {
  //     if (selectALl === "all" && inview) {
  //       setarrOfOrders((cur) => [...cur, String(filter)]);
  //       setIsChecked(filter);
  //     } else {
  //       const arr = arrOfOrders?.filter((order) => order != filter);
  //       setarrOfOrders(arr);

  //       setIsChecked("");
  //     }
  //   }
  // }, [selectALl]);

  // useEffect(() => {
  //   if (typeof index === "number") {
  //     if (isChecked) {
  //       setarrOfOrders((arrOfOrders) => [
  //         ...new Set([...arrOfOrders, String(filter)]),
  //       ]);
  //     } else {
  //       setarrOfOrders((arrOfOrders) =>
  //         arrOfOrders?.filter((order) => order != filter)
  //       );
  //     }
  //   }
  // }, [isChecked]);
  return (
    <motion.div
      className="custom-check-parent center "
      variants={parentVarient}
      initial="start"
      animate="end"
      exit={"exit"}
      ref={ref}
      custom={{ filter, isChecked, index }}
    >
      <AnimatePresence mode="wait">
        {isChecked && (
          <motion.svg
            viewBox="0 0 24 24"
            width="12px"
            height="12px"
            className="center custom-check"
            variants={checkSvgVariant}
            initial="start"
            animate="end"
            exit={"exit"}
            custom={index}
          >
            <motion.path
              fill="none"
              stroke="var(--wheat)"
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M21 6L9 18 4 13"
              variants={checkpathVariant}
              custom={index}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Checkbox;
