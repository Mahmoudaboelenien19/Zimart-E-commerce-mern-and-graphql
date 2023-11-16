import React, { useEffect, useRef } from "react";
import CartItem from "../CartItem/CartItem";
import NoData from "@/components/widgets/NoData";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import useGetCollection from "@/custom/shopping/useGetCollection";
import { addToCartRedux } from "@/redux/cartSlice";
import { type Collection } from "@/types/general";
import TotalPrice from "../TotalPrice/TotalPrice";

const CartData = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useGetCollection("cart");
  const initialRender = useRef(true);
  const { cart } = useAppSelector((st) => st.cart);

  useEffect(() => {
    if (!loading && data && initialRender.current) {
      dispatch(addToCartRedux(data));
      initialRender.current = false;
    }
  }, [loading]);
  return (
    <div>
      {cart?.length ? (
        <div className="cart-data center row between w-100">
          <div className="carts-par center col">
            {cart.map(({ count, product }: Collection) => {
              if (product) {
                return (
                  <CartItem
                    key={product.images[0].productPath}
                    path={product.images[0].productPath}
                    {...product}
                    count={count}
                  />
                );
              }
            })}
          </div>

          <>{cart?.length >= 1 && <TotalPrice key={"TotalPrice"} />}</>
        </div>
      ) : (
        <NoData
          message="No products at your cart"
          className={"cart-nodata center"}
        />
      )}
    </div>
  );
};

export default CartData;
