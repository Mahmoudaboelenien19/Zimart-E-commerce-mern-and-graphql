import React, { useContext, useRef } from "react";
import { showAsideContext } from "./Dashboard";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChildrenInterFace } from "../../interfaces/general";
import useIsMobile from "../../custom/useIsMobile";
import Animation from "../widgets/Animation";
import DashboardAside from "./main/DashboardAside";
import DashNav from "./main/DashNav";
import { themeContext } from "../../context/ThemContext";

const DashMain = ({ children }: ChildrenInterFace) => {
  const { showAsideDash } = useContext(showAsideContext);
  const { isMobile } = useIsMobile();
  const { theme } = useContext(themeContext);

  const navRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    target: navRef,
  });
  const boxShadow = useTransform(
    scrollY,
    [0, 0.5],
    ["0 0 0 000000", ".5px .5px 1.5px 000000"]
  );
  const navClr = useTransform(
    scrollY,
    [0, 0.5],
    [
      theme === "light" ? "#fffff00" : "#0000000",
      theme === "dark" ? "#fff" : "#000",
    ]
  );
  const LinkClr = useTransform(
    scrollY,
    [0, 0.5],
    [theme === "dark" ? "#fff" : "#000", theme === "light" ? "#fff" : "#000"]
  );
  return (
    <div className="center w-100">
      <DashboardAside />
      <motion.section
        className="dash-product"
        style={{
          width: showAsideDash && !isMobile ? "calc(100% - 210px )" : "95%",
          margin: showAsideDash && !isMobile ? "0px auto 0px 210px" : "0 auto",
        }}
      >
        <>
          <motion.div
            className="dash-nav w-100"
            style={{
              paddingLeft: showAsideDash && !isMobile ? 210 : 10,
              boxShadow,
              background: navClr,
              color: LinkClr,
            }}
            ref={navRef}
          >
            <DashNav linkClr={LinkClr} navClr={navClr} />
          </motion.div>
          <Animation>
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
