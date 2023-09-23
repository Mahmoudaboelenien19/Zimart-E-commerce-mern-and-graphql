import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoSvg from "@/components/svgs/LogoSvg";
import ThemeToggle from "@/components/theme/ThemeToggle";
import useIsMobile from "@/custom/useIsMobile";
import useNavTransition from "@/custom/useNavTransition";
import IsAuth from "./IsAuth";
import LinksAside from "./LinksAside";
import NavLinks from "./NavLinks";

const Nav = () => {
  const { LinkClr, boxShadow, navClr, navRef } =
    useNavTransition<HTMLElement>();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    /* 
  this useEffect to make scroll auto
   if user open any thing such as filters aside in mobile 
  as this will make overflow hidden 
  if user make screen bigger  this useEffect will run
  
   */
    if (!isMobile) {
      document.body.style.overflowY = "auto";
    }
  }, [isMobile]);
  const check = !pathname.startsWith("/dashboard");
  return (
    <AnimatePresence initial={!check}>
      {check && (
        <motion.nav
          key={"main-nav"}
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
