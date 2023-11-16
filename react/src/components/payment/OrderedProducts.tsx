import { type Details } from "@/types/general";
import OrderedProductDetail from "./OrderedProductDetail";
import { LazyLoadImage } from "react-lazy-load-image-component";

const OrderedProduct = ({ title, price, count, path }: Details) => {
  return (
    <>
      <div className="ordered-product  w-100">
        <LazyLoadImage src={path} />
        <div className="col">
          <OrderedProductDetail detail="product :" value={title} />
          <OrderedProductDetail detail="count :" value={count || 0} />
          <OrderedProductDetail detail="price :" value={price} />
        </div>
      </div>
      <div className="hr" />
    </>
  );
};

export default OrderedProduct;
