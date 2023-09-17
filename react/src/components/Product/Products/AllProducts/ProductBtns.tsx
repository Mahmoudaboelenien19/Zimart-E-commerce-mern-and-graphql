import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import ListCartBtn from "./ListCartBtn";
import { imagesInterface } from "@/interfaces/user";

interface Props {
  title: string;
  price: number;
  images?: imagesInterface[];
  _id: string;
}
const ProductBtns = ({ title, price, images, _id }: Props) => {
  const [onCart, setOnCart] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {!onCart ? (
        <ListCartBtn
          key={"ListCartBtn"}
          setOnCart={setOnCart}
          price={price}
          title={title}
          parentId={_id}
          images={images}
          btn="add to cart"
        />
      ) : (
        <ListCartBtn
          key={"removeListCartBtn"}
          setOnCart={setOnCart}
          price={price}
          title={title}
          parentId={_id}
          images={images}
          btn="remove from cart"
        />
      )}
    </AnimatePresence>
  );
};

export default ProductBtns;
