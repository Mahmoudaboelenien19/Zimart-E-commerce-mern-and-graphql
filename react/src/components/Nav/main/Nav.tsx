import { useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/theme/ThemeToggle";
import useIsMobile from "@/custom/helpers/useIsMobile";
import IsAuth from "./IsAuth";
import LinksAside from "./LinksAside";
import NavLinks from "./NavLinks";
import "./nav.scss";
import { ReactSVG } from "react-svg";
import MainNav from "@/components/widgets/shared/MainNav";

const Nav = () => {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    /* 
  *isMobile dependency for make scroll auto
   if user open any thing such as filters aside in mobile 
  as this will make overflow hidden  then directly   if user make screen bigger  this useEffect will run  
   */

    if (!isMobile) {
      document.body.style.overflowY = "auto";
    }
  }, [isMobile]);
  return (
    <MainNav className="main">
      <div className="nav-children">
        <Link to="/" className="logo center">
          <ReactSVG
            src={
              "https://res.cloudinary.com/domobky11/image/upload/v1700364978/logo_vn5mvy.svg"
            }
            className="logo-svg"
          />
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
    </MainNav>
  );
};

export default Nav;
