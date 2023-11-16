import { Outlet, ScrollRestoration } from "react-router-dom";
import DashNav from "./main/DashNav";
import clsx from "clsx";
import useNavTransition from "@/custom/helpers/useNavTransition";
import { motion } from "framer-motion";
import DashboardAside from "./main/DashboardAside";
import BeardCrumbs from "./BeardCrumbs";
import DashMain from "./DashMain";
import AdminEmailPop from "./AdminEmailPop";
const DashboardLayout = () => {
  const { boxShadow, navRef } = useNavTransition();

  return (
    <main className="col center">
      <AdminEmailPop />
      <ScrollRestoration />

      <motion.nav
        ref={navRef}
        style={{
          boxShadow,
        }}
        className={clsx("dash-nav w-100 ")}
      >
        <DashNav />
      </motion.nav>
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
