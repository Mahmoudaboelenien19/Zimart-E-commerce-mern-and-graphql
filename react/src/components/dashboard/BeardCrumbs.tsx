import { AnimatePresence } from "framer-motion";
import React from "react";
import { FaGreaterThan } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import FadeElement from "../widgets/animation/FadeElement";

const BeardCrumbs = () => {
  const location = useLocation();
  let to = ``;
  const crumbsArr = location.pathname.split("/");
  const crumbs = crumbsArr
    .filter((path) => path != "")
    .slice(0, -1)
    .map((crumb, i, arr) => {
      to += `/${crumb}`;
      return (
        <FadeElement cls="center gap" key={crumb + i} delay={0.1}>
          <NavLink className={"crumb-link"} to={to}>
            {crumb}
          </NavLink>

          <AnimatePresence>
            {i !== arr.length - 1 && (
              <FaGreaterThan
                key={crumb + "greaterThan"}
                fontSize={".8rem"}
                color="var(--wheat-light)"
                className="crumb-icon"
              />
            )}
          </AnimatePresence>
        </FadeElement>
      );
    });

  return (
    <div className="crumbs ">
      <NavLink className={"crumb-link"} to={"/"}>
        Home
      </NavLink>
      {crumbsArr.length > 2 && <div className="crumbs-line"></div>}
      <AnimatePresence>{crumbs}</AnimatePresence>
    </div>
  );
};

export default BeardCrumbs;
