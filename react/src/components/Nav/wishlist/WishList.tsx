import { AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import Favorite from "./Favorite";
import { useMutation } from "@apollo/client";
import FadeElement from "@/components/widgets/animation/FadeElement";
import SlideButton from "@/components/widgets/buttons/SlideButton";
import DropDown from "@/components/widgets/dropdowns/DropDown";
import { isAuthContext } from "@/context/isAuth";
import { useAppDispatch, useAppSelector } from "@/custom/reduxTypes";
import { Clear_Fav } from "@/graphql/mutations/user";
import { clearAllFav } from "@/redux/favSlice";
import "./fav.scss";
interface Props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  showFav: boolean;
}
const WishList = ({ showFav, setter }: Props) => {
  const dispatch = useAppDispatch();
  const { userId } = useContext(isAuthContext);
  const { fav } = useAppSelector((state) => state.fav);
  const [showClearFav, setShowClearFav] = useState(false);

  const [Status, setStatus] = useState<number>(0);
  const [clearFav] = useMutation(Clear_Fav, {
    variables: {
      userId,
    },
  });
  const handleClearFav = async () => {
    const { data } = await clearFav();
    if (data?.ClearFav?.status === 200) {
      setStatus(200);
      dispatch(clearAllFav());
    } else {
      setStatus(404);
    }
  };

  return (
    <DropDown
      className="fav-drop "
      height={400}
      addCloseIcon
      bool={showFav}
      setter={setter}
    >
      <h2 className="header">Your Wishlist</h2>
      <AnimatePresence>
        {fav.length >= 1 && (
          <FadeElement className="center end">
            <button
              style={{ padding: "4px 8px" }}
              className=" btn unsave "
              onClick={() => {
                setShowClearFav(true);
                setStatus(0);
              }}
            >
              clear All
            </button>
          </FadeElement>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {fav.length >= 1 ? (
          <FadeElement key={"fav-parent"} className="center col gap">
            <AnimatePresence>
              {fav.map((ob) => {
                return <Favorite key={ob?.productId} {...ob} setter={setter} />;
              })}
            </AnimatePresence>
          </FadeElement>
        ) : (
          <FadeElement
            key={"no-data-fav"}
            className="shadow no-data-fav center"
          >
            <p>no data in your wishlist</p>
          </FadeElement>
        )}
      </AnimatePresence>
      {/* {showClearFav && (
        // <SlideButton
        //   bool={showClearFav}
        //   key={"slide-button-clear"}
        //   sethide={setShowClearFav}
        //   doneMsg="All CLeared"
        //   head=" Clear All !"
        //   pragrapgh="are you sure you want to permanently clear your wishlist ?"
        //   fn={handleClearFav}
        //   Status={Status}
        //   isVaild
        // >
        //   {" "}
        // </SlideButton>
      )} */}
    </DropDown>
  );
};

export default WishList;
