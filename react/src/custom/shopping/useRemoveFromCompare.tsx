import { removeFromCompareRedux } from "@/redux/compareSlice";
import { useAppDispatch } from "../helpers/reduxTypes";
import useRemoveFromCollection from "./useRemoveFromCollection";

const useRemoveFromCompare = (id: string) => {
  const { handleRemoveFromCollection } = useRemoveFromCollection(id, "compare");

  const dispatch = useAppDispatch();
  const removeFromCompare = async () => {
    const st = await handleRemoveFromCollection();
    if (st === 200) {
      dispatch(removeFromCompareRedux(id));
    }
  };
  return { removeFromCompare };
};

export default useRemoveFromCompare;
