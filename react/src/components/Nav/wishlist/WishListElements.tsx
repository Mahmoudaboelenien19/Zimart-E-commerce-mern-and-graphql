import FadeElement from "@/components/widgets/animation/FadeElement";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import Favorite from "./Favorite";
import useGetCollection from "@/custom/shopping/useGetCollection";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import { addToFavRedux } from "@/redux/favSlice";
import { Collection, State } from "@/types/general";
import useHideScroll from "@/custom/helpers/useHideScroll";
import useIsMobile from "@/custom/helpers/useIsMobile";

const WishListElements = ({ bool, setter }: State) => {
  const dispatch = useAppDispatch();
  const { fav } = useAppSelector((st) => st.fav);
  const { data, loading } = useGetCollection("fav");
  const initialRender = useRef(true);
  useEffect(() => {
    if (!loading && data && initialRender.current) {
      dispatch(addToFavRedux(data));
      initialRender.current = false;
    }
  }, [loading]);
  const { isMobile } = useIsMobile();
  useHideScroll(bool, isMobile);
  return (
    <AnimatePresence mode="wait">
      {fav?.length >= 1 ? (
        <div className="wish-data">
          <FadeElement key={"data-parent"} className="center col gap  ">
            <AnimatePresence>
              {fav?.map(({ id, product }: Collection) => {
                if (product) {
                  return (
                    <Favorite
                      key={id}
                      path={product.images[0].productPath}
                      {...product}
                      setter={setter}
                    />
                  );
                }
              })}
            </AnimatePresence>
          </FadeElement>
        </div>
      ) : (
        <FadeElement key={"no-data-fav"} className="shadow no-data-fav center ">
          <p>no data in your wishlist</p>
        </FadeElement>
      )}
    </AnimatePresence>
  );
};

export default WishListElements;
