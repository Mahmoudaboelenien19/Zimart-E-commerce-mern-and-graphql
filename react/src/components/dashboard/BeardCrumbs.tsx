import { AnimatePresence, motion } from "framer-motion";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { NavLink, useLocation } from "react-router-dom";
import FadeElement from "../widgets/animation/FadeElement";
import useParams from "@/custom/helpers/useParams";
import useIsMobile from "@/custom/helpers/useIsMobile";
import { AiFillHome } from "react-icons/ai";

const BeardCrumbs = () => {
  const location = useLocation();
  const { showDashBoaedAside } = useParams();

  let to = ``;
  const crumbsArr = location.pathname.split("/");
  const crumbs = crumbsArr
    .filter((path) => path != "")
    .slice(0, -1)
    .map((crumb, i, arr) => {
      to += `/${crumb}`;
      return (
        <AnimatePresence key={crumb + i}>
          <FadeElement className="center gap" delay={0.1}>
            <NavLink
              className={"crumb-link"}
              to={
                to + `${showDashBoaedAside ? "?showDashBoaedAside=true" : ""}`
              }
            >
              {crumb}
            </NavLink>

            {i !== arr.length - 1 && (
              <LiaGreaterThanSolid
                key={crumb + "greaterThan"}
                fontSize={".8rem"}
                size={"min(12px, 1.2rem)"}
                color="var(--wheat-lighter)"
                className="crumb-icon"
              />
            )}
          </FadeElement>
        </AnimatePresence>
      );
    });
  const { isMobile } = useIsMobile();
  const check = showDashBoaedAside && !isMobile;
  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="crumbs  center relative"
        animate={{ left: check ? 310 : 20 }}
        transition={{
          delay: check ? 0.35 : 0.12,
          duration: 0.35,
          ease: "easeInOut",
        }}
      >
        <div className="home center gap">
          <AiFillHome color="var(--third-light)" size={"min(12px, 1.2rem)"} />
          <NavLink className={" crumb-link  gap"} to={"/"}>
            Home
          </NavLink>
        </div>
        {crumbsArr.length > 2 && <div className="crumbs-line" />}
        {crumbs}
      </motion.div>
    </AnimatePresence>
  );
};

export default BeardCrumbs;
