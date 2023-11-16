import { createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LogoSvg from "@/components/svgs/LogoSvg";
import ThemeToggle from "@/components/theme/ThemeToggle";
import useIsMobile from "@/custom/helpers/useIsMobile";
import useNavTransition from "@/custom/helpers/useNavTransition";
import IsAuth from "./IsAuth";
import LinksAside from "./LinksAside";
import NavLinks from "./NavLinks";
import "./nav.scss";
import FadeElement from "@/components/widgets/animation/FadeElement";

type favContextType = {
  showFav: boolean;
  setShowFav: React.Dispatch<React.SetStateAction<boolean>>;
};
export const favContext = createContext({} as favContextType);
const Nav = () => {
  const { boxShadow, navRef } = useNavTransition<HTMLElement>();
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

  return (
    <motion.nav
      key={"main-nav"}
      ref={navRef}
      style={{
        boxShadow,
      }}
      className="main"
      transition={{ duration: 0.3 }}
    >
      <div className="nav-children">
        <Link to="/" className="logo center">
          <LogoSvg />
        </Link>
        {!isMobile && <NavLinks />}
        <div className="links-par">
          <div className="center  theme">{!isMobile && <ThemeToggle />}</div>

          <div className="center">
            <IsAuth />
            {isMobile && <LinksAside />}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
