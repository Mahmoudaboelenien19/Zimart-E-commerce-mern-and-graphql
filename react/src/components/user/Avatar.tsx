import React, { useRef, useState, useContext } from "react";

import AvatarEditor from "react-avatar-editor";
import { isAuthContext } from "../../context/isAuth";
import MainBtn from "../widgets/buttons/MainBtn";
import MobileCloseDropDown from "../widgets/dropdowns/MobileCloseDropDown";
import { useMutation } from "@apollo/client";
import { Update_Profile_Img } from "../../graphql/mutations/user";
import { toast } from "react-hot-toast";
import UploadingLoader from "../widgets/loaders/UploadingLoader";
interface Props {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setnewImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  newImg: File | undefined;
  handleCancel: () => void;
  setFileKey: React.Dispatch<React.SetStateAction<number>>;
}
const Avatar = ({ setEdit, newImg, handleCancel, setFileKey }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const editorRef = useRef<AvatarEditor | null>(null);
  const { setProfile } = useContext(isAuthContext);

  interface positionInterface {
    x: number;
    y: number;
  }
  const handlePositionChange = (position: positionInterface) => {
    setPosition(position);
  };

  const { userId } = useContext(isAuthContext);

  const [uploadImgFn] = useMutation(Update_Profile_Img, {});

  async function handleSaveButtonClick() {
    setFileKey((prev) => prev + 1);
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();
      setIsUpdating(true);

      if (croppedImage) {
        const blob = await fetch(croppedImage).then((res) => res.blob());

        const file = new File(
          [blob],
          `cropped Image-${Date.now()}-${Math.random().toString(16)}`
        );

        const res = await uploadImgFn({
          variables: {
            _id: userId,
            image: file,
          },
        });
        if (res.data.updateUserImage.status === 200) {
          toast.success(res.data.updateUserImage.msg);
          setEdit(false);
          setProfile(croppedImage as string);
          setIsUpdating(false);
        }
      }
    }
  }

  const [scale, setScale] = useState(0);
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };

  return (
    <>
      <h3 className="header underline  underline-sm header-sm">
        update your profile image
      </h3>
      <AvatarEditor
        style={{ backgroundColor: "white", border: "0" }}
        ref={editorRef}
        image={newImg ? URL.createObjectURL(newImg as File) : ""}
        width={200}
        height={200}
        border={2}
        borderRadius={125}
        position={position}
        onPositionChange={handlePositionChange}
        scale={1 + scale}
      />
      <MobileCloseDropDown setter={setEdit} title={"close"} />
      <div className="zoom-cont col center start w-100">
        <label htmlFor="zoom" className="zoom">
          {" "}
          zoom
        </label>
        <input
          type="range"
          id="zoom"
          onChange={handleScaleChange}
          min="0"
          max="1"
          step=".01"
          defaultValue={0.01}
          className="w-100"
        />
      </div>
      <div className=" center gap " style={{ gap: 30, marginTop: 6 }}>
        <MainBtn fn={handleSaveButtonClick} btn="Save" cls="btn main border" />
        <MainBtn fn={handleCancel} btn="cancel" cls="btn cancel-outline" />
      </div>

      <UploadingLoader bool={isUpdating} />
    </>
  );
};

export default Avatar;
