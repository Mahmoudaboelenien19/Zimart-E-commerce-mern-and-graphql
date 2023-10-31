import { Outlet } from "react-router-dom";
import DashNav from "./main/DashNav";
import clsx from "clsx";
import useNavTransition from "@/custom/useNavTransition";
import { motion } from "framer-motion";
import DashboardAside from "./main/DashboardAside";
import BeardCrumbs from "./BeardCrumbs";
import Transition from "../widgets/animation/transition/Transition";
const DashboardLayout = () => {
  const { boxShadow, navRef, bg } = useNavTransition();

  return (
    <main className="col center">
      <Transition />
      <motion.nav
        ref={navRef}
        style={{
          boxShadow,
          background: bg,
        }}
        className={clsx("dash-nav w-100")}
      >
        <DashNav />
      </motion.nav>
      <BeardCrumbs />
      <DashboardAside />

      <>
        <Outlet />
      </>
    </main>
  );
};

export default DashboardLayout;
