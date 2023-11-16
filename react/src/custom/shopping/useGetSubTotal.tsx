import { Collection } from "@/types/general";
import { useState, useEffect } from "react";
import { useAppSelector } from "../helpers/reduxTypes";

export const useGetSubTotal = () => {
  const [subTotal, setSubTotal] = useState(0);
  const { cart } = useAppSelector((st) => st.cart);

  const getTotal = (): number => {
    const check = cart.every((pro) => pro.product);
    if (cart.length && check) {
      return cart
        .filter((pro: Collection) => pro.product!.stock > 0)
        .reduce(
          (acc: number, cur: Collection) =>
            acc + cur?.product!.price * cur.count,
          0
        );
    } else {
      return 0;
    }
  };
  useEffect(() => {
    const num = getTotal();
    setSubTotal(num);
  }, [cart]);
  return { subTotal };
};
