import React, { useContext } from "react";
import OpacityBtn from "./OpacityBtn";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import usePathAndId from "../../custom/usePathAndId";
import { productContext } from "../product Route/Product";
import useAddToCart from "../../custom/useAddToCart";
import { isAuthContext } from "../../context/isAuth";
import useRemoveFromCart from "../../custom/useRemoveFromCart";

const CartBtn = ({ btn, id }: { btn: string; id: string }) => {
  const { userId } = useContext(isAuthContext);

  const { images, bigImgInd, price, title } = useContext(productContext);

  const [productId, path] = usePathAndId(images, bigImgInd);
  const addToCartObj = {
    userId,
    productId,
    parentId: id,
    path,
    price,
    title,
  };
  const { handleAddToCart, isPending } = useAddToCart(addToCartObj);
  const { handleRemoveFromCart, isPending: isPendingRemove } =
    useRemoveFromCart({
      userId,
      productId: [productId],
    });

  return (
    <>
      <OpacityBtn
        key={btn === "add to cart" ? "add-to-cart" : "remove from cart"}
        cls={`${
          btn === "add to cart"
            ? "btn main center gap"
            : "btn remove center gap"
        }`}
        btn={btn}
        fn={btn === "add to cart" ? handleAddToCart : handleRemoveFromCart}
        Icon={btn === "add to cart" ? BsFillCartPlusFill : BsFillCartXFill}
        isPending={isPending || isPendingRemove}
      />
    </>
  );
};

export default CartBtn;
