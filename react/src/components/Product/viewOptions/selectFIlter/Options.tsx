import { optionsArr } from "@/assets/arries/arries";
import useParams from "@/custom/useParams";
import { selectDropDownVariants, opacityVariant } from "@/variants/globals";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  selectValue: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
  setIsSelectFocus: React.Dispatch<React.SetStateAction<boolean>>;
};
const SortOptions = ({
  selectValue,
  setSelectValue,
  setIsSelectFocus,
}: Props) => {
  const { deleteParam } = useParams();
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
              color: opt === selectValue ? "var(--wheat)" : "var(--third)",
            }}
            variants={opacityVariant}
            onClick={() => {
              setIsSelectFocus(false);
              deleteParam("search");
              deleteParam("page");
              setSelectValue(opt);
            }}
            key={i}
            // onTapStart={() => setIsOptSelected(true)}
          >
            {opt}
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default SortOptions;
