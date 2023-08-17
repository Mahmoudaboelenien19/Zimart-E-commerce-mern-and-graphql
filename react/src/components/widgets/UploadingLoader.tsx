import React from "react";
import FadeElement from "./FadeElement";
import GridLoader from "./GridLoader";

const UploadingLoader = ({ bool }: { bool: boolean }) => {
  return (
    <>
      {bool && (
        <FadeElement cls="updating">
          <GridLoader cls="loading center" />
        </FadeElement>
      )}
    </>
  );
};

export default UploadingLoader;
