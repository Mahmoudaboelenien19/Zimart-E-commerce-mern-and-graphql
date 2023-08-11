import React, { useContext, useEffect } from "react";
import OpacityBtn from "../../../widgets/OpacityBtn";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import { useAppSelector } from "../../../../custom/reduxTypes";
import { imagesInterface } from "../../../../interfaces/user";
import useAddToCart from "../../../../custom/useAddToCart";
import { isAuthContext } from "../../../../context/isAuth";
import useRemoveFromCart from "../../../../custom/useRemoveFromCart";
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
    price,
    title,
    parentId,
  };
  const { handleAddToCart, isPending } = useAddToCart(addToCartObj);
  const { handleRemoveFromCart, isPending: isPendingRemove } =
    useRemoveFromCart({
      userId,
      productId: (images as imagesInterface[]).map((img) => img._id),
    });

  return (
    <OpacityBtn
      isPending={isPending || isPendingRemove}
      cls={`btn center gap ${btn === "add to cart" ? "main" : "remove"}`}
      btn={btn}
      fn={btn === "add to cart" ? handleAddToCart : handleRemoveFromCart}
      Icon={btn === "add to cart" ? BsFillCartPlusFill : BsFillCartXFill}
    />
  );
};

export default ListCartBtn;
