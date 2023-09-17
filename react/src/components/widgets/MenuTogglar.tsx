import React from "react";
import Title from "./Title";
import useParams from "@/custom/useParams";

interface Props {
  hideMsg: string;
  target: string;
  showMsg: string;
}
const MenuTogglar = ({ target, hideMsg, showMsg }: Props) => {
  const { deleteParam, setParam, [target]: value } = useParams();
  const handleShow = () => {
    if (target === "showDashBoaedAside") {
      sessionStorage.removeItem("show-aside");
    }
    if (value) {
      deleteParam(target);
    } else {
      setParam(target, "true");
    }
  };
  return (
    <Title title={value ? hideMsg : showMsg}>
      <div className="menu-togglar" onClick={handleShow}>
        {[...Array(3)].map((_, i) => {
          return (
            <span
              key={i}
              className={`menu-toggle-span ${value ? "animate" : ""}`}
            ></span>
          );
        })}
      </div>
    </Title>
  );
};

export default MenuTogglar;
