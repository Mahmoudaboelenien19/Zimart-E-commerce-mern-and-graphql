import { AnimatePresence } from "framer-motion";
import React from "react";
import Price from "./Price";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

type Props = {
  total: number;
};
const ToTalCost = ({ total }: Props) => {
  const { cart } = useAppSelector((st) => st.cart);

  return (
    <h3 className="total-cost center gap">
      <span>total:</span>
      <div className="center gap">
        <span> $</span>
        <AnimatePresence mode="wait">
          <Price
            num={cart.length ? Number(total.toFixed(2)) : 0}
            key={"total-$"}
          />
        </AnimatePresence>
      </div>
    </h3>
  );
};

export default ToTalCost;
