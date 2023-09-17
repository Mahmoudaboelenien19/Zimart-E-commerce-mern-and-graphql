import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoSvg from "@/components/svgs/LogoSvg";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { isAuthContext } from "@/context/isAuth";
import useIsMobile from "@/custom/useIsMobile";
import useNavTransition from "@/custom/useNavTransition";
import IsAuth from "./IsAuth";
import LinksAside from "./LinksAside";
import NavLinks from "./NavLinks";

const Nav = () => {
  const { isAuth } = useContext(isAuthContext);
  const { LinkClr, boxShadow, navClr, navRef } =
    useNavTransition<HTMLElement>();
  const [showNav, setShowNav] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/dashboard") && isAuth) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  const { isMobile } = useIsMobile();

  /* 
  this useEffect to make scroll auto
   if user open any thing such as filters aside in mobile 
  as this will make overflow hidden 
  if user make screen bigger  this useEffect will run
  
   */
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
