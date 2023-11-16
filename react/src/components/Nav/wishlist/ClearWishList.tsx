import FadeElement from "@/components/widgets/animation/FadeElement";
import { Fragment, useState } from "react";
import ClearPopUp from "./ClearPopUp";

const ClearWishList = () => {
  const [showClearFav, setShowClearFav] = useState(false);

  return (
    <Fragment>
      <FadeElement className="center end">
        <button
          style={{ padding: "4px 8px" }}
          className=" btn unsave "
          onClick={() => {
            setShowClearFav(true);
          }}
        >
          clear All
        </button>
      </FadeElement>

      <ClearPopUp bool={showClearFav} setter={setShowClearFav} />
    </Fragment>
  );
};

export default ClearWishList;
