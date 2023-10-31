import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../custom/reduxTypes";
import { favInterface } from "../interfaces/user.interface";
import { productContext } from "../components/product Route/Product";
import { isAuthContext } from "../context/isAuth";
import useRemoveFromFav from "../custom/useRemoveFeomFav";
import useAddToFav from "../custom/useAddToFav";
import HeartSvg from "../components/svgs/heart";

interface Props {
  setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoraited: boolean;
}

const HeartSvgProduct = ({ isFavoraited, setIsFavorited }: Props) => {
  const {
    _id: parentId,
    bigImgInd,
    images = [],
    price,
    title,
  } = useContext(productContext);

  const { userId, isAuth } = useContext(isAuthContext);
  const { fav } = useAppSelector((state) => state.fav);
  const [id, setId] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    setId(images[bigImgInd]?._id);
  }, [bigImgInd]);

  useEffect(() => {
    images?.map((e) => (e._id === id ? setPath(e.productPath) : null));
  }, [id]);

  useEffect(() => {
    if (fav?.length === 0) {
      setIsFavorited(false);
    }
    if (fav?.length > 0) {
      const check = fav.some((e: favInterface) => id == e.productId);
      if (check) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  }, [id, fav]);

  const { handleRemoveFromFav } = useRemoveFromFav({
    userId,
    productId: [id as string],
  });

  const addToFavObj = { userId, productId: id, price, path, title, parentId };

  const { handleAddToFav } = useAddToFav(addToFavObj);

  const handleHeartFns = async () => {
    if (isAuth) {
      setIsFavorited(!isFavoraited);
    }

    if (!isFavoraited) {
      handleAddToFav();
    } else {
      handleRemoveFromFav();
    }
  };
  return (
    <>
      <HeartSvg fn={handleHeartFns} isFavoraited={isFavoraited} />
    </>
  );
};

export default HeartSvgProduct;
