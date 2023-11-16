import Title from "@/components/widgets/Title";
import DetailsBtn from "@/components/widgets/buttons/DetailsBtn.js";
import useRemoveformCart from "@/custom/shopping/useRemoveformCart.js";
import React from "react";
import { BsFillCartXFill } from "react-icons/bs";

type Props = {
  id: string;
};
const CartButtons = ({ id }: Props) => {
  const { removeFromCart } = useRemoveformCart(id);

  return (
    <div className="cart-btns center  ">
      <Title title="remove from your cart list">
        <button className="btn cart-remove" onClick={removeFromCart}>
          <BsFillCartXFill />
        </button>
      </Title>
      <DetailsBtn _id={id} />
    </div>
  );
};

export default CartButtons;
