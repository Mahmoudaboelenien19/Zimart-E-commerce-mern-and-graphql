import React, { useContext } from "react";
import { showAsideContext } from "./Dashboard";
import { AnimatePresence, motion } from "framer-motion";
import { ChildrenInterFace } from "../../interfaces/general";
import BeardCrumbs from "./BeardCrumbs";
import useIsMobile from "../../custom/useIsMobile";
import Animation from "../widgets/Animation";
import DashboardAside from "./main/DashboardAside";

const DashMain = ({ children }: ChildrenInterFace) => {
  const { showAsideDash } = useContext(showAsideContext);
  const { isMobile } = useIsMobile();
  return (
    <div className="center w-100">
      <DashboardAside />
      <motion.section
        className="dash-product"
        style={{
          width: showAsideDash && !isMobile ? "calc(100% - 210px )" : "95%",
          margin:
            showAsideDash && !isMobile ? "10px 20px 10px 210px" : "25px auto",
        }}
      >
        <>
          <Animation>
            <BeardCrumbs key="beardCrumbs" />

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: "100%",
                }}
                style={{ marginTop: 75 }}
                transition={{ delay: showAsideDash ? 0.2 : 0.6 }}
                // transition={{ delay: 0.6 }}
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
