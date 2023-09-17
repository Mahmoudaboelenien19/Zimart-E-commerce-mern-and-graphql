import React from "react";
import { motion } from "framer-motion";
import FIlter from "./FIlter";
import Checkbox from "@/custom SVGs/checkbox";
import { opacityVariant } from "@/variants/globals";
import { useSearchParams } from "react-router-dom";

interface Props {
  filter: string;
  head: string;
  ar: string[];
}
const FilterSection = ({ filter, ar, head }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const SPfilter = searchParams.get(filter);

  return (
    <FIlter head={head}>
      {ar.map((category, i) => {
        return (
          <motion.span
            className="center category"
            style={{ width: "fit-content" }}
            key={i}
            variants={opacityVariant}
            onClick={() => {
              setSearchParams((params) => {
                params.delete("search");
                params.delete("page");

                params.set(filter, `${category === SPfilter ? "" : category}`);
                if (category === SPfilter) {
                  params.delete(filter);
                }
                return params;
              });
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
