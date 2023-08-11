import React, { useContext } from "react";
import { cartInterface } from "../../../interfaces/user.js";
import Counter from "./Counter.js";
import OpacityBtn from "../../widgets/OpacityBtn.js";
import useRemoveFromCart from "../../../custom/useRemoveFromCart.js";
import { isAuthContext } from "../../../context/isAuth.js";
import { BsFillCartXFill } from "react-icons/bs";
import DetailsBtn from "../../widgets/DetailsBtn.js";

import { useAppSelector } from "../../../custom/reduxTypes.js";
import useBuy from "../../../custom/useBuy.js";
import Title from "../../widgets/Title.js";

const CartItem = ({
  _id,
  productId,
  parentId,
  price,
  path,
  title,
  count,
}: cartInterface) => {
  const detailsArr = [
    { detail: "product", value: title },
    { detail: "productId", value: productId },
    { detail: "price", value: `$ ${price.toFixed(2)}` },
  ];
  const { userId } = useContext(isAuthContext);
  const { cart } = useAppSelector((state) => state.cart);
  const { handleRemoveFromCart } = useRemoveFromCart({
    userId,
    productId: [productId],
  });
  const obj = cart.find((item: cartInterface) => item._id === _id);
  const { handlePurchase, isPending } = useBuy([
    obj,
  ] as unknown as cartInterface[]);

  return (
    <div className="cart-item center ">
      <img className="cart-img" src={path} alt="" />
      <div className=" cart-content ">
        <div style={{ alignSelf: "center" }}>
          <Counter count={count} productId={productId} key={_id} />
        </div>
        {detailsArr.map(({ detail, value }, i) => {
          return (
            <div key={i}>
              <span className="shadow cart-detail">{detail}:</span>
              <span className="shadow cart-value">{value}</span>
            </div>
          );
        })}
        <div style={{ alignSelf: "center" }}>
          <OpacityBtn
            isPending={isPending}
            btn="purchase"
            fn={handlePurchase}
            cls="btn btn-buy "
          />
        </div>
      </div>
      <div className="cart-btns center  ">
        <Title title="remove from your cart list">
          <button className="btn cart-remove" onClick={handleRemoveFromCart}>
            <BsFillCartXFill />
          </button>
        </Title>
        <DetailsBtn _id={parentId} />
      </div>
    </div>
  );
};

export default CartItem;
