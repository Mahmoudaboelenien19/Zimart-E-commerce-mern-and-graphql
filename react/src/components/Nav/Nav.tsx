import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoSvg from "../widgets/LogoSvg";

import { isAuthContext } from "../../context/isAuth";

import ThemeToggle from "../widgets/ThemeToggle";
import NavLinks from "./NavLinks";
import useIsMobile from "../../custom/useIsMobile";
import LinksAside from "./LinksAside";
import IsAuth from "./IsAuth";
import useNavTransition from "../../custom/useNavTransition";

const Nav = () => {
  const { isAuth } = useContext(isAuthContext);
  const { LinkClr, boxShadow, navClr, navRef } =
    useNavTransition<HTMLElement>();
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    if (location.pathname.startsWith("/dashboard") && isAuth) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location, isAuth]);

  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflowY = "auto";
    }
  }, [isMobile]);
  return (
    <AnimatePresence initial={!showNav}>
      {showNav && (
        <motion.nav
          key={"main-nav"}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.2, 0.4, 0.6, 1],
            transition: { delay: 1, duration: 0.3 },
          }}
          ref={navRef}
          style={{ background: navClr, boxShadow }}
        >
          <Link to="/" className="logo center">
            <LogoSvg />
          </Link>
          {!isMobile && (
            <div className=" center">
              <>
                <NavLinks LinkClr={LinkClr} />
              </>
            </div>
          )}
          <div className="links-par">
            <div className="center ">{!isMobile && <ThemeToggle />}</div>

            <div className="center">
              <IsAuth color={LinkClr} />
              {isMobile && <LinksAside />}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Nav;
