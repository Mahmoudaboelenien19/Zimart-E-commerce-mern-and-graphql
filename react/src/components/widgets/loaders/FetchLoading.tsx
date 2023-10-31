"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
type Props = {
  clr?: string;
  width?: string;
};
const FetchLoading = ({ clr = "var(--white", width = "12" }: Props) => {
  return (
    <RotatingLines
      strokeColor={clr}
      strokeWidth="5"
      animationDuration="0.75"
      width={width}
      visible={true}
    />
  );
};

export default FetchLoading;
