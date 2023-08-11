import { useMutation } from "@apollo/client";
import { Add_To_Cart } from "../graphql/mutations/user";
import { useAppDispatch } from "./reduxTypes";
import { addToCartRedux } from "../redux/cartSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface Props {
  userId: string;
  productId: string;
  path: string;
  parentId: string;
  price: number;
  title: string;
}
const useAddToCart = (obj: Props) => {
  const [isPending, setIsPending] = useState(false);

  const [addToCart] = useMutation(Add_To_Cart, {
    variables: {
      input: {
        ...obj,
        count: 1,
      },
    },
  });

  const dispatch = useAppDispatch();
  const handleAddToCart = async () => {
    setIsPending(true);
    try {
      const { data } = await addToCart();
      dispatch(
        addToCartRedux({
          ...obj,
          count: 1,
        })
      );

      toast.success(data.addToCart.msg);
      setIsPending(false);
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error((err as Error).message);
        setIsPending(false);
      }
    }
  };
  return { handleAddToCart, isPending };
};

export default useAddToCart;
