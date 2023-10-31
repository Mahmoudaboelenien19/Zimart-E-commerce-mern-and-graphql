import { useAppDispatch } from "./reduxTypes";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_FAV } from "../graphql/mutations/user";
import { removeFromFavRedux } from "../redux/favSlice";
import { toast } from "react-hot-toast";

interface Props {
  userId: string;
  productId: string[];
}
const useRemoveFromFav = ({ userId, productId }: Props) => {
  const dispatch = useAppDispatch();
  const [RemoveFromFav] = useMutation(REMOVE_FROM_FAV);

  const handleRemoveFromFav = async () => {
    const res = await RemoveFromFav({
      variables: {
        userId,
        productId,
      },
    });
    dispatch(removeFromFavRedux(productId));
    toast.success(res?.data?.removeFromFav.msg);
  };
  return { handleRemoveFromFav };
};

export default useRemoveFromFav;
