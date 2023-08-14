import React, { useRef, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "./Avatar";
import Overley from "../widgets/Overley";
import MainBtn from "../widgets/MainBtn";
import { isAuthContext } from "../../context/isAuth";
import ProfileImg from "../widgets/ProfileImg";
const UserImage = () => {
  const inpFile = useRef<HTMLInputElement | null>(null);

  const [newImg, setnewImg] = useState<File | undefined>();

  const [edit, setEdit] = useState(false);
  const [fileKey, setFileKey] = useState<number>(0);
  const { profile } = useContext(isAuthContext);
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
      <div className="user-img-par ">
        <ProfileImg dimension={150} />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          key={fileKey}
          type="file"
          name=""
          id="user-upload"
          ref={inpFile}
          className="file-inp"
          onChange={changeImg}
        />

        <MainBtn
          btn="update your avatar"
          cls="user-img-btn btn"
          fn={chooseImgFn}
        />
      </form>
      <AnimatePresence mode="wait">
        {edit && (
          <Overley cls="avatar-par center col gap" sethide={setEdit}>
            <Avatar
              setEdit={setEdit}
              setnewImg={setnewImg}
              newImg={newImg}
              handleCancel={handleCancel}
            />
          </Overley>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserImage;
