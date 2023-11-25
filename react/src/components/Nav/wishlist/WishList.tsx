import DropDown from "@/components/widgets/dropdowns/DropDown";
import "./fav.scss";
import WishListElements from "./WishListElements";
import ClearWishList from "./ClearWishList";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { AnimatePresence } from "framer-motion";
import useIsMobile from "@/custom/helpers/useIsMobile";
import useHideScroll from "@/custom/helpers/useHideScroll";
import { Fragment, useState } from "react";
import Title from "@/components/widgets/Title";
import { AiFillHeart } from "react-icons/ai";
import ShowCount from "../main/showCounter";

const WishList = () => {
  const { fav } = useAppSelector((st) => st.fav);

  const [showFav, setShowFav] = useState(false);
  const { isMobile } = useIsMobile();
  useHideScroll(showFav, isMobile);
  return (
    <Fragment>
      <Title title={!showFav ? "show your wishlist" : "hide your wishList"}>
        <ShowCount length={fav.length} />
        <AiFillHeart fontSize={"1.2rem"} onClick={() => setShowFav(true)} />
      </Title>

      <DropDown
        className="fav-drop centered"
        addCloseIcon
        bool={showFav}
        setter={setShowFav}
      >
        <div className="wish-head">
          <h2 className="header">Your Wishlist</h2>
          <AnimatePresence>
            {fav.length >= 1 && (
              <FadeElement key="clear-fav">
                <ClearWishList />
              </FadeElement>
            )}
          </AnimatePresence>
        </div>
        <WishListElements bool={showFav} setter={setShowFav} />
      </DropDown>
    </Fragment>
  );
};

export default WishList;
