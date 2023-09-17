import Title from "@/components/widgets/Title";
import { opacityVariant } from "@/variants/globals";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { FcMinus } from "react-icons/fc";

interface Props {
  head: string;
  showCategory: boolean;
  handleShowCategory: () => void;
  handleHideCategory: () => void;
}
const FilterHeader = ({
  head,
  showCategory,
  handleShowCategory,
  handleHideCategory,
}: Props) => {
  return (
    <h4 className="filter-head    ">
      {head}
      <AnimatePresence mode="wait">
        <motion.span
          variants={opacityVariant}
          initial="start"
          animate="end"
          exit="exit"
          key={"plus"}
          transition={{ duration: 0.4 }}
        >
          <Title title={showCategory ? "collapse" : "expand"}>
            {showCategory ? (
              <FcMinus onClick={handleHideCategory} />
            ) : (
              <BiPlus onClick={handleShowCategory} />
            )}
          </Title>
        </motion.span>
      </AnimatePresence>
    </h4>
  );
};

export default FilterHeader;
