import HeartSvg from "./heart";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import useAddToCollection from "@/custom/shopping/useAddToCollection";
import useIsAtCollection from "@/custom/shopping/useIsAtCollection";
import { addToFavRedux } from "@/redux/favSlice";
import useRemoveFromFav from "@/custom/shopping/useRemoveFromFav";

interface Props {
  id: string;
}

const ProductListHeart = ({ id }: Props) => {
  const { fav } = useAppSelector((state) => state.fav);
  const { isAuth } = useAppSelector((st) => st.isAuth);
  const { atCollection, setAtCollection } = useIsAtCollection(fav, id);
  const { handleAddToCollection } = useAddToCollection(id, "fav");

  const dispatch = useAppDispatch();
  const addToFav = async () => {
    const st = await handleAddToCollection();
    if (st === 200) {
      dispatch(addToFavRedux({ id }));
    }
  };

  //i made this only as custom hook as i ned this in Favorite component
  const { removeFromFav } = useRemoveFromFav(id);
  const handleHeartFns = async () => {
    if (isAuth) {
      setAtCollection(!atCollection);
    }

    if (!atCollection) {
      addToFav();
    } else {
      removeFromFav();
    }
  };
  return <HeartSvg fn={handleHeartFns} isFavoraited={atCollection} />;
};

export default ProductListHeart;
