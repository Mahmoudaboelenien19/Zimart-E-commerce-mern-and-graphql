import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FIlter from "./FIlter";
import { opacityVariant } from "@/lib/variants/globals";
import useParams from "@/custom/helpers/useParams";

const Price = () => {
  const { priceFilter, deleteParam, setParam } = useParams();

  const inputRef = useRef<null | HTMLInputElement>(null);
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v != "0") {
      setParam("price", v);
    } else {
      deleteParam("price");
    }
  };

  useEffect(() => {
    if ((!priceFilter || priceFilter === "0") && inputRef.current) {
      inputRef.current.value = "0";
    }
  }, [priceFilter]);

  return (
    <FIlter head="price">
      <div className="price-filter w-100">
        <motion.p variants={opacityVariant}>{priceFilter || "0"} $</motion.p>

        <motion.input
          className="w-100"
          variants={opacityVariant}
          type="range"
          step="20"
          min={0}
          max={2000}
          defaultValue={priceFilter || "0"}
          onChange={handlePrice}
          ref={inputRef}
        />
      </div>
    </FIlter>
  );
};

export default Price;
