import { linksArr } from "@/assets/arries/LinksArr";
import { opacityVariant } from "@/lib/variants/globals";
import { LayoutGroup, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface Props {
  setShowAside?: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavLinks = ({ setShowAside }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setactive] = useState("");
  const linkFn = (to: string) => {
    if (to != "/dashboard") {
      setactive(to);
      setTimeout(() => {
        navigate(to);
      }, 150);
    } else {
      navigate("/dashboard");
    }
    if (setShowAside) {
      setShowAside(false);
    }
  };

  useEffect(() => {
    setactive(pathname);
  }, [pathname]);
  return (
    <ul className="links center">
      {linksArr.map(({ to, link }, i) => {
        return (
          <LayoutGroup key={i}>
            <motion.li
              layout
              transition={{
                duration: 0,
                delay: 0,
              }}
              className="center relative link"
              variants={opacityVariant}
              onClick={() => linkFn(to)}
            >
              {link}
              {active === to && (
                <motion.div
                  transition={{
                    duration: 0.15,
                  }}
                  layoutId="active-link"
                  className="active-link"
                />
              )}
            </motion.li>
          </LayoutGroup>
        );
      })}
    </ul>
  );
};

export default NavLinks;
