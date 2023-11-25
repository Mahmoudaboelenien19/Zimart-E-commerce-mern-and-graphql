import { Outlet, ScrollRestoration } from "react-router-dom";
import DashNav from "./main/DashNav";
import clsx from "clsx";
import DashboardAside from "./main/DashboardAside";
import BeardCrumbs from "./BeardCrumbs";
import DashMain from "./DashMain";
import AdminEmailPop from "./AdminEmailPop";
import MainNav from "../widgets/shared/MainNav";
const DashboardLayout = () => {
  return (
    <main className="col center">
      <AdminEmailPop />
      <ScrollRestoration />

      <DashNav />
      <BeardCrumbs />
      <div className="w-100 between center">
        <DashboardAside />
        <DashMain>
          <Outlet />
        </DashMain>
      </div>
    </main>
  );
};

export default DashboardLayout;
