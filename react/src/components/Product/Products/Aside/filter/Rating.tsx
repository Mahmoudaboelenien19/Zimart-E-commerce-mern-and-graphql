import React from "react";

import { motion } from "framer-motion";

import Star from "../Star";

import FIlter from "./FIlter";
import Checkbox from "@/custom SVGs/checkbox";
import { opacityVariant, parentVariant } from "@/variants/globals";
import { useSearchParams } from "react-router-dom";

const Rating = () => {
  const [searchParams, seSearchParams] = useSearchParams();
  const filter = searchParams.get("rate");

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
        onClick={() => {
          seSearchParams((params) => {
            params.delete("search");
            params.delete("page");

            params.set(
              "rate",
              `${String(6 - i) === filter ? "" : String(6 - i)}`
            );
            if (String(6 - i) === filter) {
              params.delete("rate");
            }
            return params;
          });
        }}
      >
        <Checkbox isChecked={String(6 - i) === filter} filter={String(6 - i)} />
        <span className="rate-filter">{group}</span>
      </motion.div>
    );
  }

  return (
    <FIlter head="rating">
      <motion.div variants={parentVariant} key={"rating-parent"}>
        {stars}
      </motion.div>
    </FIlter>
  );
};

export default Rating;
