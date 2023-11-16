import Counter from "./Counter.js";
import "react-lazy-load-image-component/src/effects/blur.css";
import BuyBtn from "@/components/widgets/buttons/BuyBtn.js";
import { type Details } from "@/types/general.js";
import { motion } from "framer-motion";
import MainImage from "@/components/widgets/shared/Image.js";
import CartButtons from "./CartButtons.js";

const CartItem = ({ count = 0, path, price, title, stock, _id }: Details) => {
  const detailsArr = [
    { detail: "product", value: title },
    { detail: "productId", value: _id },
    { detail: "price", value: `$ ${price?.toFixed(2)}` },
  ];

  return (
    <motion.div
      key={_id}
      className="cart-item center "
      layout
      transition={{ duration: 0.3 }}
    >
      <MainImage
        path={path}
        width={800}
        wrapperClassName="cart-img-par center"
      />

      <div className=" cart-content ">
        <div style={{ alignSelf: "center" }}>
          {stock ? (
            <Counter
              count={count || 0}
              productId={_id}
              key={_id}
              stock={stock}
            />
          ) : (
            <div className="cart-not-available center"> not available now</div>
          )}
        </div>
        <div className="cart-details ">
          {detailsArr.map(({ detail, value }, i) => {
            return (
              <div key={i} className="details">
                <span className=" detail">{detail}:</span>
                <span className=" value txt ">{value}</span>
              </div>
            );
          })}
        </div>
        <div style={{ alignSelf: "center" }}>
          <BuyBtn
            products={[
              {
                productId: _id,
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
      <CartButtons id={_id} />
    </motion.div>
  );
};

export default CartItem;
