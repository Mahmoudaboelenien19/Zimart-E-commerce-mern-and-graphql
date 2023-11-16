import useModifyUrl from "@/custom/helpers/useModifyUrl";
import React from "react";
import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";

type Props = {
  height?: number;
  width?: number;
  path: string;
} & LazyLoadImageProps;

const MainImage = ({ width, height, path, ...props }: Props) => {
  const { getlink } = useModifyUrl();

  return (
    <LazyLoadImage
      src={getlink(path, width, height)}
      effect="blur"
      {...props}
    />
  );
};

export default MainImage;
