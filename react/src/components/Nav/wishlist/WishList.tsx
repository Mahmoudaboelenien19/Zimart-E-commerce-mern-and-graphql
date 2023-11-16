import DropDown from "@/components/widgets/dropdowns/DropDown";
import "./fav.scss";
import WishListElements from "./WishListElements";
import ClearWishList from "./ClearWishList";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { AnimatePresence } from "framer-motion";

interface Props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  showFav: boolean;
}
const WishList = ({ showFav, setter }: Props) => {
  const { fav } = useAppSelector((st) => st.fav);

  return (
    <DropDown
      className="fav-drop centered"
      addCloseIcon
      bool={showFav}
      setter={setter}
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
      <WishListElements bool={showFav} setter={setter} />
    </DropDown>
  );
};

export default WishList;
