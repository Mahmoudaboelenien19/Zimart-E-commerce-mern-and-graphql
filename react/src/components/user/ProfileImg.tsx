import { useAppSelector } from "@/custom/helpers/reduxTypes";
import Skeleton from "react-loading-skeleton";
import MainImage from "../widgets/shared/Image";

const ProfileImg = () => {
  const { image: profile, name } = useAppSelector((st) => st.userData);

  return (
    <>
      {profile ? (
        <MainImage
          path={profile as string | ""}
          alt={`${name} proile`}
          wrapperClassName="user-profile-wrapper w-100 h-100"
          className=" w-100 h-100"
          width={100}
          effect="blur"
        />
      ) : (
        <Skeleton circle className=" w-100 h-100" />
      )}
    </>
  );
};

export default ProfileImg;
