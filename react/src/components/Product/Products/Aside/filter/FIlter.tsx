import { AnimatePresence, motion } from "framer-motion";
import FilterHeader from "./FilterHeader";
import { ReactNode, useState } from "react";
import { staggerChildrenVariant } from "@/lib/variants/globals";

interface Props {
  head: string;
  children: ReactNode;
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
