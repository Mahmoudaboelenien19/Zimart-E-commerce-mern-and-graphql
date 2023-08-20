import React, { useContext } from "react";
import { showAsideContext } from "./Dashboard";
import { AnimatePresence, motion } from "framer-motion";
import { ChildrenInterFace } from "../../interfaces/general";
import useIsMobile from "../../custom/useIsMobile";
import Animation from "../widgets/animation/Animation";
import DashboardAside from "./main/DashboardAside";
import DashNav from "./main/DashNav";
import useNavTransition from "../../custom/useNavTransition";

const DashMain = ({ children }: ChildrenInterFace) => {
  const { showAsideDash } = useContext(showAsideContext);
  const { isMobile } = useIsMobile();
  const { LinkClr, boxShadow, navClr, navRef } =
    useNavTransition<HTMLElement>();

  return (
    <div className="center w-100">
      <DashboardAside />
      <motion.section
        className="dash-product"
        style={{
          width: showAsideDash && !isMobile ? "calc(100% - 210px )" : "95%",
          margin: showAsideDash && !isMobile ? "0px 10px 0px 210px" : "0 auto",
        }}
      >
        <>
          <motion.nav
            className="dash-nav w-100"
            style={{
              paddingLeft: showAsideDash && !isMobile ? 210 : 10,
              boxShadow,
              background: navClr,
              color: LinkClr,
            }}
            ref={navRef}
          >
            <DashNav />
          </motion.nav>

          <Animation>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: "100%",
                }}
                style={{ marginTop: 75 }}
                transition={{ delay: showAsideDash ? 0.2 : 0.6 }}
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
