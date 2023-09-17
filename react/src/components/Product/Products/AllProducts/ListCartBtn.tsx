import MainBtn from "@/components/widgets/buttons/MainBtn";
import { isAuthContext } from "@/context/isAuth";
import { useAppSelector } from "@/custom/reduxTypes";
import useAddToCart from "@/custom/useAddToCart";
import useRemoveFromCart from "@/custom/useRemoveFromCart";
import { imagesInterface } from "@/interfaces/user";
import React, { useContext, useEffect } from "react";

import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";

interface Props {
  setOnCart: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  title: string;
  images?: imagesInterface[];
  parentId: string;
  btn: string;
}
const ListCartBtn = ({
  setOnCart,
  price,
  title,
  parentId,
  images,
  btn,
}: Props) => {
  const { cart } = useAppSelector((state) => state.cart);
  const { userId } = useContext(isAuthContext);
  useEffect(() => {
    if (cart?.length === 0) {
      setOnCart(false);
    }

    if (cart?.length > 0) {
      for (const image of images as imagesInterface[]) {
        const check = cart.some((img) => image._id == img.productId);

        if (check) {
          setOnCart(true);
          break;
        } else {
          setOnCart(false);
        }
      }
    }
  }, [cart, images]);

  const addToCartObj = {
    userId,
    productId: (images as imagesInterface[])[0]._id,
    path: (images as imagesInterface[])[0].productPath,
    parentId,
  };
  const { handleAddToCart, isPending } = useAddToCart(addToCartObj);
  const { handleRemoveFromCart, isPending: isPendingRemove } =
    useRemoveFromCart({
      userId,
      productId: (images as imagesInterface[]).map((img) => img._id),
    });

  return (
    <MainBtn
      isPending={isPending || isPendingRemove}
      parCls="w-100 center"
      cls={`  btn center gap list-cart-btn ${
        btn === "add to cart" ? "main" : "remove"
      }`}
      btn={btn}
      fn={btn === "add to cart" ? handleAddToCart : handleRemoveFromCart}
      Icon={btn === "add to cart" ? BsFillCartPlusFill : BsFillCartXFill}
    />
  );
};

export default ListCartBtn;
