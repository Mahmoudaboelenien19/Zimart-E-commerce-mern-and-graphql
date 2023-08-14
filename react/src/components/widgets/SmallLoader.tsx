import React from "react";
import { BallTriangle } from "react-loader-spinner";

const SmallLoader = () => {
  return (
    <BallTriangle
      height={12}
      width={12}
      radius={3}
      color="white"
      ariaLabel="ball-triangle-loading"
    />
  );
};

export default SmallLoader;
