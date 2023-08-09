import React, { useContext, useEffect } from "react";
import { useAppSelector } from "../../custom/reduxTypes";
import { favInterface, imagesInterface } from "../../interfaces/user";
import HeartSvg from "../svgs/heart";
import useRemoveFromFav from "../../custom/useRemoveFeomFav";
import useAddToFav from "../../custom/useAddToFav";
import { isAuthContext } from "../../context/isAuth";

interface Props {
  setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoraited: boolean;
  price: number;
  title: string;
  images?: imagesInterface[];
  parentId: string;
}

const ProductListHeart = ({
  isFavoraited,
  setIsFavorited,
  images,
  price,
  title,
  parentId,
}: Props) => {
  const { fav } = useAppSelector((state) => state.fav);
  const { userId, isAuth } = useContext(isAuthContext);

  useEffect(() => {
    if (fav?.length === 0) {
      setIsFavorited(false);
    }

    if (fav?.length > 0) {
      for (const image of images as imagesInterface[]) {
        const check = fav.some((e: favInterface) => image._id == e.productId);
        if (check) {
          setIsFavorited(true);
          break;
        } else {
          setIsFavorited(false);
        }
      }
    }
  }, [fav, images]);

  const addToFavObj = {
    userId,
    productId: (images as imagesInterface[])[0]._id,
    price,
    path: (images as imagesInterface[])[0].productPath,
    title,
    parentId,
  };
  const { handleAddToFav } = useAddToFav(addToFavObj);
  const { handleRemoveFromFav } = useRemoveFromFav({
    userId,
    productId: images?.map((image) => image._id) as string[],
  });

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

export default ProductListHeart;
