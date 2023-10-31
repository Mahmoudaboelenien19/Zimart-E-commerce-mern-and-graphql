import { useContext, useState } from "react";
import Counter from "./Counter.js";
import { BsFillCartXFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Title from "@/components/widgets/Title";
import BuyBtn from "@/components/payment/BuyBtn.js";
import DetailsBtn from "@/components/widgets/buttons/DetailsBtn.js";
import { isAuthContext } from "@/context/isAuth.js";
import useRemoveFromCart from "@/custom/shopping/useRemoveFromCart.js";
import { cartInterface } from "@/interfaces/user.interface.js";
import useModifyUrl from "@/custom/useModifyUrl.js";

const CartItem = ({
  _id,
  productId,
  parentId,
  count,
  path,
  price,
  title,
  stock,
}: cartInterface) => {
  const [counter, setCounter] = useState(count);

  const detailsArr = [
    { detail: "product", value: title },
    { detail: "productId", value: productId },
    { detail: "price", value: `$ ${price?.toFixed(2)}` },
  ];
  const { userId } = useContext(isAuthContext);
  const { handleRemoveFromCart } = useRemoveFromCart({
    userId,
    productId: [productId],
  });
  const { getlink } = useModifyUrl();
  return (
    <div className="cart-item center ">
      <LazyLoadImage
        src={getlink(path, 800)}
        effect="blur"
        wrapperClassName="cart-img-par center"
      />

      <div className=" cart-content ">
        <div style={{ alignSelf: "center" }}>
          {stock ? (
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
        <div className="cart-details">
          {detailsArr.map(({ detail, value }, i) => {
            return (
              <div key={i}>
                <span className="shadow cart-detail">{detail}:</span>
                <span className="shadow cart-value">{value}</span>
              </div>
            );
          })}
        </div>
        <div style={{ alignSelf: "center" }}>
          <BuyBtn
            products={[
              {
                _id,
                productId,
                parentId,
                price: price || 0,
                path,
                title: title || "",
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
