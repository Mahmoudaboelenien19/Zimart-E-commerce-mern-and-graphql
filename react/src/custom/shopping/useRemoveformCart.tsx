import { useAppDispatch } from "../helpers/reduxTypes";
import { removeFromCartRedux } from "@/redux/cartSlice";
import useRemoveFromCollection from "./useRemoveFromCollection";

const useRemoveformCart = (id: string) => {
  const { handleRemoveFromCollection } = useRemoveFromCollection(id, "cart");

  const dispatch = useAppDispatch();
  const removeFromCart = async () => {
    const st = await handleRemoveFromCollection();
    if (st === 200) {
      dispatch(removeFromCartRedux(id));
    }
  };

  return { removeFromCart };
};

export default useRemoveformCart;
