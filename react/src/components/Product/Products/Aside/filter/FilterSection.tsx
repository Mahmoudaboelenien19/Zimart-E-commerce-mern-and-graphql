import React, { useContext } from "react";
import { motion } from "framer-motion";
import FIlter from "./FIlter";
import Checkbox from "@/custom SVGs/checkbox";
import { opacityVariant } from "@/variants/globals";
import useParams from "@/custom/useParams";
import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";

interface Props {
  filter: string;
  head: string;
  ar: string[];
}
const FilterSection = ({ filter, ar, head }: Props) => {
  const { getParam, deleteParam, setParam } = useParams();
  const SPfilter = getParam(filter);

  const { theme } = useContext(themeContext);
  return (
    <FIlter head={head}>
      {ar.map((category, i) => {
        return (
          <motion.span
            className={clsx("center category", theme)}
            style={{ width: "fit-content" }}
            key={i}
            variants={opacityVariant}
            onClick={() => {
              setParam(filter, `${category === SPfilter ? "" : category}`);
              if (category === SPfilter) {
                deleteParam(filter);
              }
            }}
          >
            <Checkbox filter={category} isChecked={SPfilter === category} />
            {category}
          </motion.span>
        );
      })}
    </FIlter>
  );
};

export default FilterSection;
