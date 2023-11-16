import BuyBtn from "@/components/widgets/buttons/BuyBtn";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import useBuyAllCart from "@/custom/shopping/useBuyAllCart";
import { useGetSubTotal } from "@/custom/shopping/useGetSubTotal";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Price from "./Price";
import Shipping from "./Shipping";
import ToTalCost from "./ToTaCost";

const TotaPriceData = () => {
  const { ar, intialArr } = useBuyAllCart();
  const { subTotal } = useGetSubTotal();
  const freeShipping = subTotal >= 800;
  const discount = subTotal >= 1000;
  const total = discount
    ? subTotal - subTotal * 0.05
    : freeShipping
    ? subTotal
    : subTotal + 10;
  return (
    <>
      <div className=" w-100 details ">
        <div className="detail">Subtotal </div>
        <div className="value center gap">
          $
          <AnimatePresence mode="wait">
            <Price num={Number(subTotal.toFixed(2))} key={"subtotal"} />
          </AnimatePresence>
        </div>
      </div>

      <Shipping bool={freeShipping} />
      <div className="details w-100">
        <span className="detail ">Discount </span>
        <div className="value center gap">
          $
          <AnimatePresence>
            <Price
              key={"discounted"}
              num={discount ? Number((0.05 * subTotal).toFixed(2)) : 0}
            />
          </AnimatePresence>
        </div>
      </div>
      <ToTalCost total={total} />

      <BuyBtn products={ar || intialArr} />
    </>
  );
};

export default TotaPriceData;
