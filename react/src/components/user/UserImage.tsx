import React, { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Avatar from "./Avatar";
import Overley from "../widgets/dropdowns/Overley";
import MainBtn from "../widgets/buttons/MainBtn";
import ProfileImg from "./ProfileImg";
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
      <div>
        <ProfileImg dimension={200} />
      </div>
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
          cls="user-img-btn btn"
          fn={chooseImgFn}
        />
      </form>
      <AnimatePresence mode="wait">
        {edit && (
          <Overley cls="avatar-par center col gap" sethide={setEdit}>
            <Avatar
              setEdit={setEdit}
              newImg={newImg}
              handleCancel={handleCancel}
              setFileKey={setFileKey}
            />
          </Overley>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserImage;
