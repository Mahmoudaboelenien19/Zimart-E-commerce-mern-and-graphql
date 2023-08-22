import React, { useContext, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../../variants/globals";
import { productListContext } from "../../../../context/FilterData";
import useShowTitle from "../../../../custom/useShowTitle";
import Title from "../../../widgets/Title";
import FIlter from "./FIlter";
const Price = () => {
  const { setPriceFilter, priceFilter } = useContext(productListContext);

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(Number(e.target.value));
  };

  const priceRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (priceRef?.current) {
      priceRef.current.value = String(priceFilter);
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
        <motion.p variants={opacityVariant}>{priceFilter} $</motion.p>

        <Title title="select max price">
          <motion.input
            variants={opacityVariant}
            type="range"
            step="20"
            min={0}
            max={2000}
            onChange={handlePrice}
            ref={priceRef}
            defaultValue={"0"}
          />
        </Title>
      </motion.div>
    </FIlter>
  );
};

export default Price;
