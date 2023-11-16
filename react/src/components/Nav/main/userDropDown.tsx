import { NavLink } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaQuestionCircle } from "react-icons/fa";
import ProfileImg from "@/components/user/ProfileImg";
import DropDown from "@/components/widgets/dropdowns/DropDown";
import useLogOut from "@/custom/user/useLogOut";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

interface Props {
  bool: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserDropDown = ({ bool, setter }: Props) => {
  const { name } = useAppSelector((st) => st.userData);
  const { handleLogOut } = useLogOut();
  const dropArr = [
    {
      link: "update your data",
      icon: FiEdit,
      to: "/user",
      fn: () => null,
    },
    { link: "faq", icon: FaQuestionCircle, to: "/faq", fn: () => null },

    {
      link: "logout",
      icon: RiLogoutCircleRFill,
      to: "",
      fn: handleLogOut,
    },
  ];

  return (
    <DropDown className="user-drop centered" bool={bool} setter={setter}>
      <div className="w-100">
        <div className="user-drop-img center">
          <div>
            <ProfileImg />
          </div>
          <span> {name}</span>
        </div>
        <div className="hr"></div>
      </div>

      {dropArr.map(({ icon: Icon, link, to, fn }, i) => {
        return (
          <div key={i} className="w-100 " onClick={fn}>
            <NavLink className={"gap user-drop-link"} to={`${to}`}>
              <Icon fontSize={15} className="shadow  user-icon" />
              {link}
            </NavLink>
            {link !== "logout" && <div key={link} className="hr" />}
          </div>
        );
      })}
    </DropDown>
  );
};

export default UserDropDown;
