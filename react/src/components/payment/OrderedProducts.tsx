import React from "react";
import OrderedProductDetail from "./OrderedProductDetail";

interface Props {
  title: string;
  price: number;
  i: number;
  count: number;
}
const OrderedProduct = ({ title, price, i, count }: Props) => {
  return (
    <>
      <div className="ordered-product center col start">
        <h2 className="underline underline-sm header header-sm">product {i}</h2>
        <OrderedProductDetail detail="product :" value={title} />
        <OrderedProductDetail detail="count :" value={count} />
        <OrderedProductDetail detail="price :" value={price} />

        <div className="or"></div>
      </div>
    </>
  );
};

export default OrderedProduct;
