import React, { useContext, useState } from "react";
import { cartInterface } from "../../../interfaces/user.js";
import Counter from "./Counter.js";
import useRemoveFromCart from "../../../custom/useRemoveFromCart.js";
import { isAuthContext } from "../../../context/isAuth.js";
import { BsFillCartXFill } from "react-icons/bs";
import DetailsBtn from "../../widgets/buttons/DetailsBtn.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Title from "../../widgets/Title.js";
import BuyBtn from "../../payment/BuyBtn.js";

const CartItem = ({
  _id,
  productId,
  parentId,
  count,
  path,
  product: { price, title, stock },
}: cartInterface) => {
  const [counter, setCounter] = useState(count);

  const detailsArr = [
    { detail: "product", value: title },
    { detail: "productId", value: productId },
    { detail: "price", value: `$ ${price.toFixed(2)}` },
  ];
  const { userId } = useContext(isAuthContext);
  const { handleRemoveFromCart } = useRemoveFromCart({
    userId,
    productId: [productId],
  });

  return (
    <div className="cart-item center ">
      <LazyLoadImage
        src={path}
        effect="blur"
        wrapperClassName="cart-img-par center"
      />

      <div className=" cart-content ">
        <div style={{ alignSelf: "center" }}>
          {stock > 0 ? (
            <Counter
              counter={counter}
              productId={productId}
              key={_id}
              stock={stock}
              setCounter={setCounter}
            />
          ) : (
            <div className="cart-not-available center"> not available now</div>
          )}
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
          <BuyBtn
            products={[
              {
                _id,
                productId,
                parentId,
                price,
                path,
                title,
                count,
              },
            ]}
            disabled={stock === 0}
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
