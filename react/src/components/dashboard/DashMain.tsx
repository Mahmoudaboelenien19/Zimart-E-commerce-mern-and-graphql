import React, { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DashboardAside from "./main/DashboardAside";
import useIsMobile from "@/custom/useIsMobile";
import { ChildrenInterFace } from "@/interfaces/general";
import useParams from "@/custom/useParams";
import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";

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

  const { theme } = useContext(themeContext);
  return (
    <div className="center w-100">
      <DashboardAside />
      <motion.section
        className={clsx("dash-product", theme)}
        style={{
          width:
            showDashBoaedAside && !isMobile ? "calc(100% - 310px )" : "95%",
          margin:
            showDashBoaedAside && !isMobile ? "0px 10px 0px 310px" : "0 auto",
        }}
      >
        <>
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
        </>
      </motion.section>
    </div>
  );
};
export default DashMain;
