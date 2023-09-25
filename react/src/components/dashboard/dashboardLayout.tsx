import useIsMobile from "@/custom/useIsMobile";
import useParams from "@/custom/useParams";
import React from "react";
import { Outlet } from "react-router-dom";
import DashNav from "./main/DashNav";

const DashboardLayout = () => {
  const { showDashBoaedAside } = useParams();
  const { isMobile } = useIsMobile();
  return (
    <main>
      <nav
        className="dash-nav w-100"
        style={{
          paddingLeft: showDashBoaedAside && !isMobile ? 310 : 10,
          background: "var(--main)",
          color: "var(--third)",
        }}
      >
        <DashNav />
      </nav>
      <>
        <Outlet />
      </>
    </main>
  );
};

export default DashboardLayout;
