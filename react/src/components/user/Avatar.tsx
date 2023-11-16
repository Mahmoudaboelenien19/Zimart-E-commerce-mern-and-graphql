import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import MainBtn from "../widgets/buttons/MainBtn";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { Update_Profile_Img } from "@/graphql/mutations/user";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import { updateUserData } from "@/redux/userDataSlice";
interface Props {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  newImg: File | undefined;
  handleCancel: () => void;
  setFileKey: React.Dispatch<React.SetStateAction<number>>;
}
const Avatar = ({ setEdit, newImg, handleCancel, setFileKey }: Props) => {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const editorRef = useRef<AvatarEditor>(null);

  interface positionInterface {
    x: number;
    y: number;
  }
  const handlePositionChange = (position: positionInterface) => {
    setPosition(position);
  };
  const { userId } = useAppSelector((st) => st.isAuth);
  const dispatch = useAppDispatch();
  const [uploadImgFn] = useMutation(Update_Profile_Img);
  async function handleSaveButtonClick() {
    setFileKey((prev) => prev + 1);
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();

      if (croppedImage) {
        const blob = await fetch(croppedImage).then((res) => res.blob());

        const file = new File(
          [blob],
          `cropped Image-${Date.now()}-${Math.random().toString(16)}`
        );

        const res = uploadImgFn({
          variables: {
            _id: userId,
            image: file,
          },
        });
        toast.promise(res, {
          loading: "updating ...  !",
          success: (res) => {
            if (res.data.updateUserImage.status === 200) {
              setEdit(false);
              dispatch(updateUserData({ image: croppedImage as string }));
              return res.data.updateUserImage.msg;
            }
          },
          error: "error",
        });
      }
    }
  }

  const [scale, setScale] = useState(0);
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };

  return (
    <div className="col center">
      <h2 className="header avater-head ">update your profile image</h2>
      <AvatarEditor
        style={{ backgroundColor: "white", border: "0" }}
        ref={editorRef}
        image={newImg ? URL.createObjectURL(newImg as File) : ""}
        width={250}
        height={250}
        border={2}
        borderRadius={125}
        position={position}
        onPositionChange={handlePositionChange}
        scale={1 + scale}
      />

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

      <div className=" center avatar-btns ">
        <MainBtn
          onClick={handleSaveButtonClick}
          btn="Save"
          className="btn main border"
        />
        <MainBtn
          onClick={handleCancel}
          btn="cancel"
          className="btn cancel-outline"
        />
      </div>
    </div>
  );
};

export default Avatar;
