import { logInWithGoogle, signUpWithGoogle } from "@/assets/routes";
import { FcGoogle } from "react-icons/fc";
import MainBtn from "../widgets/buttons/MainBtn";

const GooGleBtn = ({ type }: { type?: string }) => {
  return (
    <MainBtn
      btn="Continue with Google"
      className={"inp-parent center google-log between w-100 "}
      Icon={FcGoogle}
      type="button"
      onClick={() => {
        if (type === "sign") {
          window.open(signUpWithGoogle, "_self");
        } else {
          window.open(logInWithGoogle, "_self");
        }
      }}
    />
  );
};

export default GooGleBtn;

// <FcGoogle fontSize={18} />
