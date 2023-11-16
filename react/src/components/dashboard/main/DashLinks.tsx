import { dashAsideLinks } from "@/assets/arries/LinksArr";
import useIsMobile from "@/custom/helpers/useIsMobile";
import useParams from "@/custom/helpers/useParams";
import useLogOut from "@/custom/user/useLogOut";
import { LayoutGroup, motion } from "framer-motion";
import { startTransition, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DashLinks = () => {
  const { showDashBoaedAside, deleteParam } = useParams();
  const { handleLogOut } = useLogOut();
  const { pathname } = useLocation();
  const [activeLink, setactiveLink] = useState("");

  useEffect(() => {
    if (pathname) {
      setactiveLink(pathname.split("/").slice(-1)[0]);
    }
  }, [pathname]);

  const { isMobile } = useIsMobile();
  const navigate = useNavigate();
  return (
    <LayoutGroup>
      {dashAsideLinks.map(({ head, links }) => {
        return (
          <span key={`dash-link ${head}`}>
            <h4 className="aside-dash-label">{head}</h4>
            <>
              {links.map(({ link, to, Icon, active }) => {
                return (
                  <motion.div
                    layout
                    transition={{ duration: 0 }}
                    className="relative dash-link"
                    key={link}
                    onClick={() => {
                      setactiveLink(active);

                      startTransition(() => {
                        // i made this delay as the animation is slow
                        setTimeout(() => {
                          navigate(
                            to +
                              `${
                                showDashBoaedAside
                                  ? "?showDashBoaedAside=true"
                                  : ""
                              }`
                          );
                        }, 450);
                        if (isMobile) {
                          deleteParam("showDashBoaedAside");
                        }
                        if (link === "logout") {
                          handleLogOut();
                        }
                      });
                    }}
                  >
                    <Icon className="icon" />
                    {/* <Link
                      to={
                        to +
                        `${
                          showDashBoaedAside ? "?showDashBoaedAside=true" : ""
                        }`
                      }
                    >
                      {link}
                    </Link> */}

                    <span>{link}</span>
                    {active === activeLink && link != "logout" && (
                      <motion.div
                        className="active-dash"
                        layoutId="dash-link"
                        transition={{
                          duration: 0.4,
                          // delay: 1.5,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </>
          </span>
        );
      })}
    </LayoutGroup>
  );
};

export default DashLinks;
