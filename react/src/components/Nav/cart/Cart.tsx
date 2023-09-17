import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import { AnimatePresence } from "framer-motion";

import { Navigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import NoData from "@/components/widgets/NoData";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { viewContext } from "@/context/gridView";
import { isAuthContext } from "@/context/isAuth";
import CircleCheckSvg from "@/custom SVGs/CircleCheckSvg";
import { useAppDispatch, useAppSelector } from "@/custom/reduxTypes";
import { GET_USER_DATA } from "@/graphql/mutations/user";
import { cartInterface } from "@/interfaces/user";
import { clearCart, addToCartRedux } from "@/redux/cartSlice";
import Animation from "@/components/widgets/animation/Animation";

const offerArr = [
  { offer: "Spend $800 or more and get free shipping!", money: 800 },
  { offer: "Spend $1000 or more and get 5% discount!", money: 1000 },
];

const Cart = () => {
  const dispatch = useAppDispatch();
  const { userId, isAuth } = useContext(isAuthContext);
  const { setGridView } = useContext(viewContext);

  const [fn, { data }] = useMutation(GET_USER_DATA, {
    variables: {
      id: userId,
    },
  });
  const [loading, setLoading] = useState(true);
  const { cart } = useAppSelector((st) => st.cart);

  const [subTotal, setSubTotal] = useState(0);

  /*
   * i clear then add to cart to get the latest data
   */

  useEffect(() => {
    if (userId) {
      fn();
    }
  }, [userId]);
  useEffect(() => {
    sessionStorage.setItem("cart-length", JSON.stringify(cart.length));
    document.title = "Cart";
    setGridView(true);
  }, []);
  useEffect(() => {
    if (data?.getUserData?.cart) {
      dispatch(clearCart());
      setLoading(false);
      dispatch(addToCartRedux(data?.getUserData?.cart));
      sessionStorage.removeItem("cart-length");
    }
  }, [data?.getUserData?.cart]);

  useEffect(() => {
    if (userId) {
      fn({
        variables: {
          id: userId,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (Array.isArray(cart)) {
      setSubTotal(
        cart
          .filter((e) => e?.product?.stock > 0)
          .reduce((acc, cur) => acc + cur?.product?.price * cur.count, 0)
      );
    }
  }, [cart]);

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
            cls={"cart-nodata center"}
            loading={loading}
          >
            <div className="carts-par center col">
              {cart.map((item: cartInterface) => {
                return <CartItem key={item._id + item.path} {...item} />;
              })}
            </div>
          </NoData>
          {cart?.length >= 1 && !loading && (
            <TotalPrice
              subTotal={subTotal}
              key={"TotalPrice"}
              cart={cart || []}
            />
          )}
        </div>
      </FadeElement>
    </Animation>
  );
};

export default Cart;
