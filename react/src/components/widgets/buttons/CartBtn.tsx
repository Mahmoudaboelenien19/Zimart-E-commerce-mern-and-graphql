import { useContext } from "react";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import MainBtn from "./MainBtn";
import { productContext } from "@/components/product Route/Product";
import { isAuthContext } from "@/context/isAuth";
import useAddToCart from "@/custom/shopping/useAddToCart";
import usePathAndId from "@/custom/usePathAndId";
import useRemoveFromCart from "@/custom/shopping/useRemoveFromCart";
import clsx from "clsx";

const CartBtn = ({ btn, id }: { btn: string; id: string }) => {
  const { userId } = useContext(isAuthContext);
  const { images, bigImgInd, title, price, stock } = useContext(productContext);
  const [productId, path] = usePathAndId(images, bigImgInd);
  const addToCartObj = {
    userId,
    productId,
    parentId: id,
    path,
  };
  const { handleAddToCart, loading } = useAddToCart(
    addToCartObj,
    price,
    title,
    stock
  );
  const { handleRemoveFromCart, loading: isPendingRemove } = useRemoveFromCart({
    userId,
    productId: [productId],
  });

  return (
    <MainBtn
      key={btn === "add to cart" ? "add-to-cart" : "remove from cart"}
      className={clsx(
        btn === "add to cart" ? "btn main center gap" : "btn remove center gap"
      )}
      btn={btn}
      onClick={btn === "add to cart" ? handleAddToCart : handleRemoveFromCart}
      Icon={btn === "add to cart" ? BsFillCartPlusFill : BsFillCartXFill}
      disabled={loading || isPendingRemove}
    />
  );
};

export default CartBtn;
