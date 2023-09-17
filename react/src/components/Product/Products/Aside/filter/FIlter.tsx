import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import useHide from "@/custom/useHide";
import { ChildrenInterFace } from "@/interfaces/general";
import { parentVariant } from "@/variants/globals";

import FilterHeader from "./FilterHeader";

interface Props extends ChildrenInterFace {
  head: string;
}
const FIlter = ({ head, children }: Props) => {
  const [showCategory, handleShowCategory, handleHideCategory] = useHide();
  return (
    <>
      <div className="category-par  ">
        <FilterHeader
          showCategory={showCategory}
          handleShowCategory={handleShowCategory}
          handleHideCategory={handleHideCategory}
          head={head}
        />

        <>
          <AnimatePresence mode="wait">
            {showCategory && (
              <motion.div
                variants={parentVariant}
                initial="start"
                animate="end"
                exit={"exit"}
                key={"category"}
                className="   category-par"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      </div>
      {head !== "price" && <div className="hr"></div>}
    </>
  );
};

export default FIlter;
