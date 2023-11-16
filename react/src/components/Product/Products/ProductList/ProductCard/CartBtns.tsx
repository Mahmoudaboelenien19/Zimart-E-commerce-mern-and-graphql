import { AnimatePresence } from "framer-motion";
import React, { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import FadeElement from "@/components/widgets/animation/FadeElement";
import useAddToCollection from "@/custom/shopping/useAddToCollection";
import useIsAtCollection from "@/custom/shopping/useIsAtCollection";
import { addToCartRedux } from "@/redux/cartSlice";
import useRemoveformCart from "@/custom/shopping/useRemoveformCart";

type Props = {
  _id: string;
  onCollection: React.JSX.Element;
  offCollection: React.JSX.Element;
};
const CartBtns = ({ onCollection, offCollection, _id }: Props) => {
  const { cart } = useAppSelector((state) => state.cart);

  const { atCollection } = useIsAtCollection(cart, _id);
  const { handleAddToCollection, loading } = useAddToCollection(_id, "cart");
  const dispatch = useAppDispatch();
  const addToCart = async () => {
    if (!loading) {
      const st = await handleAddToCollection();
      if (st === 200) {
        dispatch(addToCartRedux({ id: _id }));
      }
    }
  };
  const { removeFromCart } = useRemoveformCart(_id);
  return (
    <AnimatePresence mode="wait">
      {!atCollection ? (
        <Fragment key="add-cart">
          <FadeElement onClick={addToCart}>{onCollection}</FadeElement>
        </Fragment>
      ) : (
        <Fragment key="remove-cart">
          <FadeElement color={"var(--green)"} onClick={removeFromCart}>
            {offCollection}
          </FadeElement>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default CartBtns;
