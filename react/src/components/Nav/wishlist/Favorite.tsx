import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useIsMobile from "@/custom/helpers/useIsMobile";
import { opacityVariant } from "@/lib/variants/globals";
import useModifyUrl from "@/custom/helpers/useModifyUrl";
import { Details } from "@/types/general";
import useRemoveFromFav from "@/custom/shopping/useRemoveFromFav";
import Skeleton from "react-loading-skeleton";
import { Fragment } from "react";

type Props = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
} & Details;
const Favorite = ({ path, price, title, _id, setter }: Props) => {
  const navigate = useNavigate();
  const { removeFromFav } = useRemoveFromFav(_id);

  const { isMobile } = useIsMobile();
  const { getlink } = useModifyUrl();
  return (
    <motion.div
      layout
      className="fav-product center border"
      variants={opacityVariant}
      key={_id}
    >
      {path ? (
        <LazyLoadImage
          wrapperClassName="fav-img center "
          effect="blur"
          src={getlink(path, 400)}
          alt=""
        />
      ) : (
        <Skeleton height={80} width={80} circle />
      )}

      <div className="fav-content center shadow">
        {title ? (
          <Fragment>
            <h3 className="fav-title ">{title}</h3>
            <span className="fav-price">$ {price}</span>
            <div>
              <button className="btn unsave " onClick={removeFromFav}>
                unsave
              </button>
              <button
                className="btn  wish-detail"
                onClick={() => {
                  navigate(`/product/${_id}`);
                  if (isMobile) {
                    setter(false);
                  }
                }}
              >
                details
              </button>
            </div>
          </Fragment>
        ) : (
          <Skeleton
            count={3}
            height={6}
            width={"100%"}
            containerClassName="w-100 flex between col gap  h-100 skeleton"
            className="skeleton "
            style={{ marginLeft: 12 }}
            enableAnimation
          />
        )}
      </div>
    </motion.div>
  );
};

export default Favorite;
