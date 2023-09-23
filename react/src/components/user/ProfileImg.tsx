import { isAuthContext } from "@/context/isAuth";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";

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
        <Skeleton
          circle
          style={{
            height: dimension,
            width: dimension,
          }}
        />
      )}
    </>
  );
};

export default ProfileImg;
