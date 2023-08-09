import React, { useContext } from "react";
import MenuTogglar from "../../widgets/MenuTogglar";
import ThemeToggle from "../../widgets/ThemeToggle";
import NotificationDropDown from "../Notification/NotificationDropDown";
import { showAsideContext } from "../Dashboard";
import BeardCrumbs from "../BeardCrumbs";
import { MotionValue } from "framer-motion";
interface Props {
  linkClr?: MotionValue<string>;
  navClr?: MotionValue<string>;
}
const DashNav = ({ linkClr, navClr }: Props) => {
  const { showAsideDash, setShowAsideDash } = useContext(showAsideContext);

  return (
    <>
      <BeardCrumbs key="beardCrumbs" />
      <span className="center " style={{ gap: 15 }}>
        <ThemeToggle navClr={navClr} linkClr={linkClr} />
        <NotificationDropDown />
        <MenuTogglar
          bool={showAsideDash}
          setter={setShowAsideDash}
          hideMsg="hide dashboard"
          showMsg="show dashboard"
        />
      </span>
    </>
  );
};

export default DashNav;
