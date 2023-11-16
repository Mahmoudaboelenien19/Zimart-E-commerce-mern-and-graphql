import CircleCheckSvg from "@/custom SVGs/CircleCheckSvg";
import { useGetSubTotal } from "@/custom/shopping/useGetSubTotal";
import { AnimatePresence } from "framer-motion";
import React from "react";
const offerArr = [
  { offer: "Spend $800 or more and get free shipping. !", money: 800 },
  { offer: "Spend $1000 or more and get 5% discount. !", money: 1000 },
];

const CartHeader = () => {
  const { subTotal } = useGetSubTotal();
  return (
    <div className="offer-cart center col">
      {offerArr.map(({ offer, money }, i) => {
        return (
          <h3 className="head header center between " key={i}>
            <span>{offer}</span>
            <AnimatePresence mode="wait">
              {subTotal >= money && (
                <CircleCheckSvg
                  key={"circle-check1"}
                  check={subTotal >= money}
                />
              )}
            </AnimatePresence>
          </h3>
        );
      })}
    </div>
  );
};

export default CartHeader;
