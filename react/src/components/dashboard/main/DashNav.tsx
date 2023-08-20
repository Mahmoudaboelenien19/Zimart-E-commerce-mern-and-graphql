import React, { useContext } from "react";
import MenuTogglar from "../../widgets/MenuTogglar";
import ThemeToggle from "../../theme/ThemeToggle";
import NotificationDropDown from "../Notification/NotificationDropDown";
import { showAsideContext } from "../Dashboard";
import BeardCrumbs from "../BeardCrumbs";

const DashNav = () => {
  const { showAsideDash, setShowAsideDash } = useContext(showAsideContext);

  return (
    <>
      <BeardCrumbs key="beardCrumbs" />
      <span className="center " style={{ gap: 15 }}>
        <ThemeToggle />
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
