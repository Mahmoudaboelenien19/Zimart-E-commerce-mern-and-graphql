import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Avatar from "./Avatar";
import MainBtn from "../widgets/buttons/MainBtn";
import ProfileImg from "./ProfileImg";
import MainPop from "../widgets/shared/popup/MainPop";
const UserImage = () => {
  const inpFile = useRef<HTMLInputElement | null>(null);
  const [newImg, setnewImg] = useState<File | undefined>();
  const [edit, setEdit] = useState(false);
  const [fileKey, setFileKey] = useState<number>(0);
  const chooseImgFn = () => {
    inpFile?.current?.click();
  };
  const changeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(true);
    if (e.target?.files) {
      setnewImg(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setFileKey((prev) => prev + 1);
  };
  return (
    <div className="user-image ">
      <ProfileImg dimension={200} />

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="file"
          name=""
          id="user-upload"
          ref={inpFile}
          className="file-inp"
          onChange={changeImg}
          key={fileKey}
        />

        <MainBtn
          btn="update your avatar"
          className="user-img-btn btn"
          onClick={chooseImgFn}
        />
      </form>
      <MainPop bool={edit} setter={setEdit} className=" w-100">
        <Avatar
          setEdit={setEdit}
          newImg={newImg}
          handleCancel={handleCancel}
          setFileKey={setFileKey}
        />
      </MainPop>
    </div>
  );
};

export default UserImage;
