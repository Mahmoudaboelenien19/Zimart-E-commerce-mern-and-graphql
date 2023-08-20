import React, { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { asideVariant } from "../../../variants/globals";
import { Link } from "react-router-dom";
import { showAsideContext } from "../Dashboard";
import LogoSvg from "../../svgs/LogoSvg";
import useLogOut from "../../../custom/useLogOut";
import useIsMobile from "../../../custom/useIsMobile";
import { dashAsideLinks } from "../../../assets/arries/LinksArr.js";
import MobileCloseDropDown from "../../widgets/dropdowns/MobileCloseDropDown";

const DashboardAside = () => {
  const { showAsideDash, setShowAsideDash } = useContext(showAsideContext);
  const { handleLogOut } = useLogOut();

  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (showAsideDash) {
      sessionStorage.setItem("show-aside", JSON.stringify(true));
    } else {
      sessionStorage.setItem("show-aside", JSON.stringify(false));
    }
  }, [showAsideDash]);

  useEffect(() => {
    if (showAsideDash && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showAsideDash, isMobile]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      {showAsideDash && (
        <motion.aside
          id="dash-aside"
          variants={asideVariant}
          custom={{ bool: isMobile }}
          initial="start"
          animate={"end"}
          exit="exit"
          key={"dash-aside"}
        >
          <div
            style={{
              width: "100%",
              height: 60,
            }}
            className="center dash-aside-head"
          >
            <Link to={"/"}>
              <LogoSvg />
            </Link>
          </div>

          {dashAsideLinks.map(({ head, links }) => {
            return (
              <span key={`dash-link ${head}`}>
                <h4 className="aside-dash-label">{head}</h4>
                <>
                  {links.map(({ link, to, Icon, active }) => {
                    return (
                      <Link
                        key={link}
                        className={
                          location.pathname.split("/").slice(-1)[0] === active
                            ? "active"
                            : ""
                        }
                        to={to}
                        onClick={() => {
                          if (isMobile) {
                            setShowAsideDash(false);
                          }
                          if (link === "logout") {
                            handleLogOut();
                          }
                        }}
                      >
                        <Icon className="icon" color="var(--twitter)" />
                        <span>{link}</span>
                      </Link>
                    );
                  })}
                </>
              </span>
            );
          })}

          <MobileCloseDropDown setter={setShowAsideDash} title="close" />
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default DashboardAside;
