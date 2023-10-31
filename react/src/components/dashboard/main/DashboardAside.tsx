import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { dashAsideLinks } from "@/assets/arries/LinksArr";
import MobileCloseDropDown from "@/components/widgets/dropdowns/MobileCloseDropDown";
import useIsMobile from "@/custom/useIsMobile";
import useLogOut from "@/custom/useLogOut";
import { asideVariant } from "@/lib/variants/globals";
import useParams from "@/custom/useParams";
import ProfileImg from "@/components/user/ProfileImg";
import { Fragment, useContext } from "react";
import { isAuthContext } from "@/context/isAuth";
import clsx from "clsx";

const DashboardAside = () => {
  const { showDashBoaedAside, deleteParam } = useParams();
  const { handleLogOut } = useLogOut();
  const { isMobile } = useIsMobile();
  const { name } = useContext(isAuthContext);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showDashBoaedAside && (
        <motion.aside
          id="dash-aside"
          variants={asideVariant}
          custom={{ bool: isMobile }}
          initial="start"
          animate={"end"}
          exit="exit"
          key={"dash-aside"}
        >
          <div className=" dash-user center gap">
            <ProfileImg dimension={60} />

            <div className="content">
              <h4>{name}</h4>
              <p>
                welcome to dashboard.! let&apos;s see what happens in your app.
              </p>
            </div>
          </div>
          <div className="hr" />
          {dashAsideLinks.map(({ head, links }) => {
            return (
              <span key={`dash-link ${head}`}>
                <h4 className="aside-dash-label">{head}</h4>
                <>
                  {links.map(({ link, to, Icon, active }) => {
                    return (
                      <Fragment key={link}>
                        <Link
                          className={clsx(
                            location.pathname.split("/").slice(-1)[0] ===
                              active && "active",
                            "relactive"
                          )}
                          to={
                            to +
                            `${
                              showDashBoaedAside
                                ? "?showDashBoaedAside=true"
                                : ""
                            }`
                          }
                          onClick={() => {
                            if (isMobile) {
                              deleteParam("showDashBoaedAside");
                            }
                            if (link === "logout") {
                              handleLogOut();
                            }
                          }}
                        >
                          <Icon className="icon" color="var(--twitter)" />
                          <span>{link}</span>
                        </Link>
                      </Fragment>
                    );
                  })}
                </>
              </span>
            );
          })}

          <MobileCloseDropDown target="showDashBoaedAside" title="close" />
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default DashboardAside;
