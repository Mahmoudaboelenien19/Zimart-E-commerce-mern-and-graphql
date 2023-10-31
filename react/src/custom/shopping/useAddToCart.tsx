import { useMutation } from "@apollo/client";
import { useAppDispatch } from "../reduxTypes";
import { toast } from "react-hot-toast";
import { Add_To_Cart } from "@/graphql/mutations/user";
import { addToCartRedux } from "@/redux/cartSlice";

interface CartObj {
  userId: string;
  productId: string;
  path: string;
  parentId: string;
}
const useAddToCart = (
  obj: CartObj,
  price: number,
  title: string,
  stock: number
) => {
  const [addToCart, { loading }] = useMutation(Add_To_Cart, {
    variables: {
      input: {
        ...obj,
        count: 1,
      },
    },
  });

  const dispatch = useAppDispatch();
  const handleAddToCart = async () => {
    try {
      const { data } = await addToCart();
      dispatch(
        addToCartRedux({
          ...obj,
          title,
          price,
          stock,
          count: 1,
        })
      );

      toast.success(data.addToCart.msg);
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error("login please !");
      }
    }
  };
  return { handleAddToCart, loading };
};

export default useAddToCart;
