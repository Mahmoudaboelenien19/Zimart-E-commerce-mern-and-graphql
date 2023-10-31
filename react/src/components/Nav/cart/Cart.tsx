import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import { AnimatePresence } from "framer-motion";
import NoData from "@/components/widgets/NoData";
import FadeElement from "@/components/widgets/animation/FadeElement";
import CircleCheckSvg from "@/custom SVGs/CircleCheckSvg";
import { useAppSelector } from "@/custom/reduxTypes";
import { cartInterface } from "@/interfaces/user.interface";
import SLiderComponent from "@/components/widgets/SLider";

const offerArr = [
  { offer: "Spend $800 or more and get free shipping!", money: 800 },
  { offer: "Spend $1000 or more and get 5% discount!", money: 1000 },
];

export const Component = () => {
  const { cart } = useAppSelector((st) => st.cart);
  const [subTotal, setSubTotal] = useState(0);
  console.log(cart);
  useEffect(() => {
    document.title = "Zimart | Cart";
  }, []);

  useEffect(() => {
    if (Array.isArray(cart)) {
      setSubTotal(
        cart
          .filter((e) => e?.product?.stock > 0)
          .reduce((acc, cur) => acc + cur?.product?.price * cur.count, 0)
      );
    }
  }, [cart]);

  return (
    <FadeElement className="cart-cont  " delay={0.4}>
      <div className="offer-cart center col">
        {offerArr.map(({ offer, money }, i) => {
          return (
            <h3 className="head center between " key={i}>
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

      {cart?.length ? (
        <div className="cart-data center row between w-100">
          <div className="carts-par center col">
            {cart.map((item: cartInterface) => {
              return (
                <CartItem
                  key={item._id + item.path}
                  {...item}
                  price={item?.price || item.product?.price || 0}
                  title={item?.title || item.product?.title || ""}
                  stock={item?.stock || item.product?.stock || 0}
                />
              );
            })}
          </div>

          <>
            {cart?.length >= 1 && (
              <TotalPrice
                subTotal={subTotal}
                key={"TotalPrice"}
                cart={cart || []}
              />
            )}
          </>
        </div>
      ) : (
        <NoData
          message="No products at your cart"
          className={"cart-nodata center"}
        />
      )}

      <SLiderComponent />
    </FadeElement>
  );
};
