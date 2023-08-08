import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { mobileDropDownVariant } from "../../variants/globals.js";
import MenuTogglar from "../widgets/MenuTogglar";
import ThemeToggle from "../widgets/ThemeToggle";

const LinksAside = () => {
  const [showAside, setShowAside] = useState(false);
  useEffect(() => {
    if (showAside) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showAside]);
  return (
    <>
      <MenuTogglar
        bool={showAside}
        showMsg="show nav bar"
        hideMsg="close nav bar"
        setter={setShowAside}
      />
      <AnimatePresence>
        {showAside && (
          <motion.aside
            key={"aside-links"}
            variants={mobileDropDownVariant}
            initial="start"
            animate="end"
            exit="exit"
            className="aside-links"
          >
            <ThemeToggle />

            <NavLinks setShowAside={setShowAside} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default LinksAside;
