import useRemoveFromCollection from "./useRemoveFromCollection";
import { removeFromFavRedux } from "@/redux/favSlice";
import { useAppDispatch } from "../helpers/reduxTypes";

const useRemoveFromFav = (id: string) => {
  const dispatch = useAppDispatch();

  const { handleRemoveFromCollection } = useRemoveFromCollection(id, "fav");
  const removeFromFav = async () => {
    const st = await handleRemoveFromCollection();
    if (st === 200) {
      dispatch(removeFromFavRedux(id));
    }
  };
  return { removeFromFav };
};

export default useRemoveFromFav;
