import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { IconType } from "react-icons/lib";

export type SignUpInputsType = {
  Icon: IconType;
  placeholder: string;
  defaultValue?: string;
  type?: string;
};

export const signUpInputs = (name?: string, email?: string) => [
  {
    Icon: HiOutlineUser,

    placeholder: "name",
    defaultValue: name,
  },
  {
    Icon: HiAtSymbol,

    placeholder: "email",
    defaultValue: email,
  },

  {
    Icon: HiFingerPrint,

    placeholder: "password",
    type: "password",
  },
  {
    Icon: HiFingerPrint,

    placeholder: "confirm",
    type: "password",
  },
];
