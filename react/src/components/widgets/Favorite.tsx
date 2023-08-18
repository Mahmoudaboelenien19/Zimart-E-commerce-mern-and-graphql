import React, { useContext } from "react";
import { motion } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import { useNavigate } from "react-router-dom";
import useRemoveFromFav from "../../custom/useRemoveFeomFav";
import useIsMobile from "../../custom/useIsMobile";
import { isAuthContext } from "../../context/isAuth";
import { favInterface } from "../../interfaces/user";

interface Props extends favInterface {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const Favorite = ({
  _id,
  price,
  title,
  productId,
  path,
  parentId,
  setter,
}: Props) => {
  const navigate = useNavigate();
  const { userId } = useContext(isAuthContext);
  const { handleRemoveFromFav } = useRemoveFromFav({
    userId,
    productId: [productId as string],
  });
  const { isMobile } = useIsMobile();
  return (
    <motion.div
      className="fav-product center"
      variants={opacityVariant}
      key={_id}
      // initial="start"
      // exit={"exit"}
      // animate="end"
      // transition={{ duration: 0.4 }}
    >
      <div className="fav-img center ">
        <img src={path} alt="" />
      </div>

      <div className="fav-content center shadow">
        <h3 className="fav-title ">{title}</h3>
        <span className="fav-price">$ {price}</span>
        <div className="product-links">
          <button className="btn unsave shadow" onClick={handleRemoveFromFav}>
            unsave
          </button>
          <button
            className="btn shadow "
            style={{ color: "var(--white" }}
            onClick={() => {
              navigate(`/${parentId}`);
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
