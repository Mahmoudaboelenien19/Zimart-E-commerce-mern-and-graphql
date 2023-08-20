import React from "react";
import Title from "./Title";

interface Props {
  bool: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  hideMsg: string;
  showMsg: string;
}
const MenuTogglar = ({ bool, setter, hideMsg, showMsg }: Props) => {
  return (
    <Title title={bool ? hideMsg : showMsg}>
      <div className="menu-togglar" onClick={() => setter(!bool)}>
        {[...Array(3)].map((_, i) => {
          return (
            <span
              key={i}
              className={`menu-toggle-span ${bool ? "animate" : ""}`}
            ></span>
          );
        })}
      </div>
    </Title>
  );
};

export default MenuTogglar;
