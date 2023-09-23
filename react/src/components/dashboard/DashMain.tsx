import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Animation from "../widgets/animation/Animation";
import DashboardAside from "./main/DashboardAside";
import DashNav from "./main/DashNav";
import useIsMobile from "@/custom/useIsMobile";
import { ChildrenInterFace } from "@/interfaces/general";
import useParams from "@/custom/useParams";

const DashMain = ({ children }: ChildrenInterFace) => {
  const { showDashBoaedAside, setParam } = useParams();
  const { isMobile } = useIsMobile();

  const check =
    sessionStorage.getItem("show-aside") &&
    JSON.parse(sessionStorage.getItem("show-aside") || "");

  useEffect(() => {
    if (showDashBoaedAside || check) {
      sessionStorage.setItem("show-aside", "true");
      if (!showDashBoaedAside) {
        setParam("showDashBoaedAside", "true");
      }
    } else {
      sessionStorage.setItem("show-aside", JSON.stringify(null));
    }
  }, [showDashBoaedAside]);
  return (
    <div className="center w-100">
      <DashboardAside />
      <motion.section
        className="dash-product"
        style={{
          width:
            showDashBoaedAside && !isMobile ? "calc(100% - 310px )" : "95%",
          margin:
            showDashBoaedAside && !isMobile ? "0px 10px 0px 310px" : "0 auto",
        }}
      >
        <>
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

          <Animation>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: "100%",
                }}
                style={{ marginTop: 75 }}
                transition={{ delay: showDashBoaedAside ? 0.2 : 0.6 }}
                key="dash-products"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </Animation>
        </>
      </motion.section>
    </div>
  );
};
export default DashMain;
