import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/components/theme/ThemeToggle";
import MenuTogglar from "@/components/widgets/MenuTogglar";
import MobileCloseDropDown from "@/components/widgets/dropdowns/MobileCloseDropDown";
import useHideScroll from "@/custom/useHideScroll";
import { mobileDropDownVariant } from "@/variants/globals";

const LinksAside = () => {
  const [showAside, setShowAside] = useState(false);

  useHideScroll(showAside);

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
            <MobileCloseDropDown setter={setShowAside} title="close nav" />

            <ThemeToggle />

            <NavLinks setShowAside={setShowAside} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default LinksAside;
