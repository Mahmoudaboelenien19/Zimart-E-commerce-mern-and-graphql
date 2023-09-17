import React from "react";
import NotificationDropDown from "../Notification/NotificationDropDown";
import BeardCrumbs from "../BeardCrumbs";
import ThemeToggle from "@/components/theme/ThemeToggle";
import MenuTogglar from "@/components/widgets/MenuTogglar";

const DashNav = () => {
  return (
    <>
      <BeardCrumbs key="beardCrumbs" />
      <span className="center " style={{ gap: 15 }}>
        <ThemeToggle isDash />
        <NotificationDropDown />
        <MenuTogglar
          target={"showDashBoaedAside"}
          hideMsg="hide dashboard"
          showMsg="show dashboard"
        />
      </span>
    </>
  );
};

export default DashNav;
