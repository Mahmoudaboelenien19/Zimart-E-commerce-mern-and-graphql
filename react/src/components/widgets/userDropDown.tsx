import React, { RefObject, useContext } from "react";
import DropDown from "./DropDown";
import ProfileImg from "../ProfileImg";
import { isAuthContext } from "../../context/isAuth";
import { NavLink } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FcSettings } from "react-icons/fc";
import useLogOut from "../../custom/useLogOut";
import { FaQuestionCircle } from "react-icons/fa";

interface Props {
  bool: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserDropDown = ({ bool, setter }: Props) => {
  const { name } = useContext(isAuthContext);
  const { handleLogOut } = useLogOut();
  const dropArr = [
    { link: "update your data", icon: FiEdit, to: "/user", fn: () => null },
    { link: "faq", icon: FaQuestionCircle, to: "/faq", fn: () => null },

    {
      link: "logout",
      icon: RiLogoutCircleRFill,
      to: "/login",
      fn: handleLogOut,
    },
  ];

  return (
    <DropDown cls="user-drop" bool={bool} setter={setter}>
      <div className="w-100">
        <div className="user-drop-img center gap">
          <ProfileImg dimension={30} />
          <span> {name}</span>
        </div>
        <div className="hr"></div>
      </div>

      {dropArr.map(({ icon: Icon, link, to, fn }, i) => {
        return (
          <div key={i} className="w-100 " onClick={fn}>
            <NavLink className={"gap user-drop-link"} to={`${to}`}>
              {" "}
              <Icon fontSize={15} className="shadow  user-icon" />
              {link}
            </NavLink>
            {link !== "logout" && <div key={link} className="hr"></div>}
          </div>
        );
      })}
    </DropDown>
  );
};

export default UserDropDown;
