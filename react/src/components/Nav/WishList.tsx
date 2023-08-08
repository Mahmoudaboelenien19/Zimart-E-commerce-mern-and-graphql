import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { opacityVariant } from "../../variants/globals";
import Favorite from "../widgets/Favorite";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import SlideButton from "../widgets/SlideButton";
import DropDown from "../widgets/DropDown";
import FadeElement from "../widgets/FadeElement";
import NoData from "../widgets/NoData";
import { useMutation } from "@apollo/client";
import { Clear_Fav } from "../../graphql/mutations/user.js";
import { clearAllFav } from "../../redux/favSlice";
import { isAuthContext } from "../../context/isAuth";

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
    <>
      <DropDown
        cls="fav-drop"
        head=" your wishlist"
        bool={showFav}
        setter={setter}
        title={"close your wishlist"}
      >
        <NoData
          length={fav.length >= 1}
          message="your wishlist is empty"
          cls="no-data-80"
        >
          <motion.div
            variants={opacityVariant}
            className="center"
            style={{ justifyContent: "flex-end", padding: "0 5px" }}
          >
            <button
              className=" btn"
              style={{
                background: "transparent",
                color: "var(--delete)",
                fontSize: ".7rem",
              }}
              onClick={() => {
                setShowClearFav(true);
                setStatus(0);
              }}
            >
              clear All
            </button>
          </motion.div>
          <AnimatePresence mode="wait">
            {fav.length >= 1 ? (
              <FadeElement key={"fav-parent"} cls="center col">
                <AnimatePresence>
                  {fav.map((arr) => {
                    return (
                      <Favorite key={arr.productId} {...arr} setter={setter} />
                    );
                  })}
                </AnimatePresence>
              </FadeElement>
            ) : (
              <FadeElement key={"no-data-fav"} cls="shadow no-data-fav center">
                no data in your wishlist
              </FadeElement>
            )}
          </AnimatePresence>
        </NoData>
        <AnimatePresence>
          {showClearFav && (
            <SlideButton
              key={"slide-button-clear"}
              sethide={setShowClearFav}
              cls="clear-all"
              doneMsg="All CLeared"
              head="are you sure you want to clear All?"
              height={120}
              fn={handleClearFav}
              Status={Status}
              isVaild
            >
              {" "}
            </SlideButton>
          )}
        </AnimatePresence>
      </DropDown>
    </>
  );
};

export default WishList;
