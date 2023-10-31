import { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { isAuthContext } from "@/context/isAuth";
import useIsMobile from "@/custom/useIsMobile";
import useRemoveFromFav from "@/custom/useRemoveFeomFav";
import { opacityVariant } from "@/lib/variants/globals";
import useModifyUrl from "@/custom/useModifyUrl";

interface Props {
  _id: string;
  product: {
    price: number;
    title: string;
  };
  price?: number;
  title?: string;
  productId: string;
  path: string;
  parentId: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const Favorite = ({
  _id,
  product,
  productId,
  path,
  parentId,
  title,
  price,
  setter,
}: Props) => {
  const navigate = useNavigate();
  const { userId } = useContext(isAuthContext);
  const { handleRemoveFromFav } = useRemoveFromFav({
    userId,
    productId: [productId as string],
  });
  const { isMobile } = useIsMobile();
  const { getlink } = useModifyUrl();
  return (
    <motion.div
      className="fav-product center"
      variants={opacityVariant}
      key={_id}
    >
      <LazyLoadImage
        wrapperClassName="fav-img center "
        effect="blur"
        src={getlink(path, 400)}
        alt=""
      />

      <div className="fav-content center shadow">
        <h3 className="fav-title ">{title || product?.title}</h3>
        <span className="fav-price">$ {price || product?.price}</span>
        <div className="product-links">
          <button className="btn unsave " onClick={handleRemoveFromFav}>
            unsave
          </button>
          <button
            className="btn  "
            style={{ color: "var(--third" }}
            onClick={() => {
              navigate(`/product/${parentId}`);
              if (isMobile) {
                setter(false);
              }
            }}
          >
            details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Favorite;
