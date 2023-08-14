import { useMutation } from "@apollo/client";
import { Add_To_Fav } from "../graphql/mutations/user";
import { addToFavRedux } from "../redux/favSlice";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "./reduxTypes";

interface Props {
  userId: string;
  productId: string;
  price: number;
  path: string;
  title: string;
  parentId: string;
}

const useAddToFav = (obj: Props) => {
  const [addToFav] = useMutation(Add_To_Fav);
  const dispatch = useAppDispatch();
  const handleAddToFav = async () => {
    try {
      const res = await addToFav({
        variables: { input: obj },
      });
      if ((res as { status: number }).status === 401) {
        toast.error("unauth");
      } else {
        toast.success(res.data.addToFav.msg);
        dispatch(addToFavRedux(obj));
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error((err as Error).message);
      }
    }
  };

  return { handleAddToFav };
};

export default useAddToFav;
