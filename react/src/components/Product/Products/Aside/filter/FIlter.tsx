import { AnimatePresence, motion } from "framer-motion";
import { ChildrenInterFace } from "@/interfaces/general";
import FilterHeader from "./FilterHeader";
import { useState } from "react";
import { staggerChildrenVariant } from "@/lib/variants/globals";

interface Props extends ChildrenInterFace {
  head: string;
}

const FIlter = ({ head, children }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="category-par  ">
        <FilterHeader bool={show} setter={setShow} head={head} />

        <>
          <AnimatePresence mode="wait">
            {show && (
              <motion.div
                layout
                variants={staggerChildrenVariant}
                initial="start"
                animate="end"
                exit={"exit"}
                key={head}
                className="filter"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      </div>
      {head !== "price" && <div className="hr" />}
    </>
  );
};

export default FIlter;
