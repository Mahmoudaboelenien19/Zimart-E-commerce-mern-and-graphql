import React, { Fragment, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../custom/reduxTypes";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import CircleCheckSvg from "../../../custom SVGs/CircleCheckSvg";
import { AnimatePresence } from "framer-motion";
import { viewContext } from "../../../context/gridView";
import Animation from "../../widgets/animation/Animation";
import NoData from "../../widgets/NoData";
import { cartInterface } from "../../../interfaces/user";
import { Navigate } from "react-router-dom";
import { isAuthContext } from "../../../context/isAuth";
import FadeElement from "../../widgets/animation/FadeElement";

const offerArr = [
  { offer: "Spend $800 or more and get free shipping!", money: 800 },
  { offer: "Spend $1000 or more and get 5% discount!", money: 1000 },
];

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    document.title = "Cart";
  }, []);

  useEffect(() => {
    if (Array.isArray(cart)) {
      setSubTotal(cart.reduce((acc, cur) => acc + cur.price * cur.count, 0));
    }
  }, [cart]);

  const { setGridView } = useContext(viewContext);
  const { isAuth } = useContext(isAuthContext);
  useEffect(() => {
    setGridView(true);
  }, []);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Animation>
      <FadeElement cls="cart-cont  " delay={0.4}>
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

        <div className="cart-data center row between w-100">
          <NoData
            length={cart.length >= 1}
            message="No products at your cart"
            // cls={"h-50-w-65  center"}
            cls={"cart-nodata center"}
          >
            <div className="carts-par center col">
              {cart.map((item: cartInterface) => {
                return (
                  <Fragment key={item._id}>
                    <CartItem {...item} />
                  </Fragment>
                );
              })}
            </div>
          </NoData>
          {cart.length >= 1 && (
            <TotalPrice subTotal={subTotal} key={"TotalPrice"} />
          )}
        </div>
      </FadeElement>
    </Animation>
  );
};

export default Cart;
