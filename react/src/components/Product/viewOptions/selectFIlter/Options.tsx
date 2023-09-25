import { optionsArr } from "@/assets/arries/arries";
import useParams from "@/custom/useParams";
import { selectDropDownVariants, opacityVariant } from "@/variants/globals";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SortOptions = ({ setIsSelectOpen }: Props) => {
  const { deleteParam, setParam, getParam } = useParams();
  const sort = getParam("sort");
  return (
    <motion.ul
      className="select-dropdown center col"
      variants={selectDropDownVariants}
      initial="start"
      animate="end"
      exit="exit"
    >
      {optionsArr.map((opt, i) => {
        return (
          <motion.li
            className="select-opt"
            style={{
              color: opt === sort ? "var(--wheat)" : "var(--third)",
            }}
            variants={opacityVariant}
            onClick={() => {
              setIsSelectOpen(false);
              deleteParam("search");
              deleteParam("isFilterApplied");
              deleteParam("catFilter");

              deleteParam("page");
              setParam("sort", opt);
            }}
            key={i}
          >
            {opt}
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default SortOptions;
