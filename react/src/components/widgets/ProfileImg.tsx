import React, { useContext } from "react";
import { isAuthContext } from "../../context/isAuth";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface Props {
  dimension: number;
}
const ProfileImg = ({ dimension }: Props) => {
  const { profile } = useContext(isAuthContext);

  return (
    <>
      {profile ? (
        <LazyLoadImage
          src={profile}
          alt={`${name} proile`}
          style={{
            height: dimension,
            width: dimension,
            borderRadius: "50%",
            border: "0.5px grey solid",
          }}
          effect="blur"
        />
      ) : (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton
            circle
            style={{
              height: dimension,
              width: dimension,
            }}
          />
        </SkeletonTheme>
      )}
    </>
  );
};

export default ProfileImg;
