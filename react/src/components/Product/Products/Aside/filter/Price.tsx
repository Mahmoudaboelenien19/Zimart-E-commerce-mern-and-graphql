import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FIlter from "./FIlter";
import { parentVariant, opacityVariant } from "@/variants/globals";
import Title from "@/components/widgets/Title";
import useParams from "@/custom/useParams";

const Price = () => {
  const { priceFilter, deleteParam, setParam } = useParams();

  const [inpVal, setInpVal] = useState(priceFilter);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };

  useEffect(() => {
    if (inpVal != "0") {
      setParam("price", inpVal);
    } else {
      deleteParam("price");
    }
  }, [inpVal]);

  useEffect(() => {
    if (priceFilter === "0" && inputRef.current) {
      setInpVal("0");
      inputRef.current.value = "0";
    }
  }, [priceFilter]);

  return (
    <FIlter head="price">
      <motion.div
        variants={parentVariant}
        key={"parent"}
        initial="start"
        animate="end"
        exit={"exit"}
        className="price-filter"
      >
        <motion.p variants={opacityVariant}>{inpVal || "0"} $</motion.p>

        <Title title="select max price">
          <motion.input
            variants={opacityVariant}
            type="range"
            step="20"
            min={0}
            max={2000}
            onChange={handlePrice}
            ref={inputRef}
          />
        </Title>
      </motion.div>
    </FIlter>
  );
};

export default Price;
