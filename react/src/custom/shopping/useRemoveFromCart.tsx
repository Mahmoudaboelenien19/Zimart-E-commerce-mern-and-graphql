import { REMOVE_FROM_Cart } from "../../graphql/mutations/user";
import { useMutation } from "@apollo/client";
import { removeFromCartRedux } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

interface Props {
  userId: string;
  productId: string[];
}
const useRemoveFromCart = (obj: Props) => {
  const [removeFromCartDB, { loading }] = useMutation(REMOVE_FROM_Cart);
  const dispatch = useDispatch();
  const handleRemoveFromCart = async () => {
    const res = await removeFromCartDB({
      variables: obj,
    });
    toast.success(res.data.removeFromCart.msg);
    dispatch(removeFromCartRedux(obj.productId));
  };
  return { handleRemoveFromCart, loading };
};

export default useRemoveFromCart;
