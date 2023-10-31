import { AnimatePresence } from "framer-motion";
import { Fragment, useContext, useEffect, useState } from "react";
import { imagesInterface } from "@/interfaces/user.interface";
import MainBtn from "@/components/widgets/buttons/MainBtn";
import useRemoveFromCart from "@/custom/shopping/useRemoveFromCart";
import { isAuthContext } from "@/context/isAuth";
import { useAppSelector } from "@/custom/reduxTypes";
import useAddToCart from "@/custom/shopping/useAddToCart";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import FadeElement from "@/components/widgets/animation/FadeElement";
import Title from "@/components/widgets/Title";

interface Props {
  title: string;
  price: number;
  stock: number;
  images?: imagesInterface[];
  _id: string;
}
const ProductBtns = ({ title, price, images = [], _id, stock }: Props) => {
  const [onCart, setOnCart] = useState(false);
  const { cart } = useAppSelector((state) => state.cart);
  const { userId } = useContext(isAuthContext);
  useEffect(() => {
    if (cart?.length === 0) {
      setOnCart(false);
    }

    if (cart?.length > 0) {
      for (const image of images as imagesInterface[]) {
        const check = cart?.some((img) => image._id == img?.productId);

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
    productId: (images as imagesInterface[])[0]?._id,
    path: (images as imagesInterface[])[0]?.productPath,
    parentId: _id,
  };
  const { handleAddToCart } = useAddToCart(addToCartObj, price, title, stock);
  const { handleRemoveFromCart } = useRemoveFromCart({
    userId,
    productId: (images as imagesInterface[])?.map((img) => img?._id),
  });

  return (
    <AnimatePresence mode="wait">
      {!onCart ? (
        <Fragment key="add-cart">
          <Title title="add to your cart">
            <FadeElement>
              <BsFillCartPlusFill
                onClick={handleAddToCart}
                size={14}
                className={"cart-icon"}
                color="var(--green)"
              />
            </FadeElement>
          </Title>
        </Fragment>
      ) : (
        <Fragment key="remove-cart">
          <Title title=" remove from cart">
            <FadeElement color={"var(--green)"}>
              <BsFillCartXFill
                onClick={handleRemoveFromCart}
                size={14}
                color="var(--delete)"
                className="cart-remove"
              />
            </FadeElement>
          </Title>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default ProductBtns;
