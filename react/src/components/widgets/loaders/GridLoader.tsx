import React from "react";
import { BallTriangle } from "react-loader-spinner";

interface Props {
  cls: string;
}
const GridLoader = ({ cls }: Props) => {
  return (
    <div className={`${cls}`}>
      <BallTriangle
        height={30}
        width={30}
        radius={5}
        color="gray"
        ariaLabel="ball-triangle-loading"
      />
    </div>
  );
};

export default GridLoader;
