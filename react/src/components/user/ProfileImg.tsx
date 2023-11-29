import { useAppSelector } from "@/custom/helpers/reduxTypes";
import Skeleton from "react-loading-skeleton";
import MainImage from "../widgets/shared/Image";

const ProfileImg = () => {
  const { image, name } = useAppSelector((st) => st.userData);

  return (
    <>
      {image ? (
        <MainImage
          path={image as string | ""}
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
