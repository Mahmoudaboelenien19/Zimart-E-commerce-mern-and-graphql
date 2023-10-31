import { linksArr } from "@/assets/arries/LinksArr";
import { opacityVariant } from "@/lib/variants/globals";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  setShowAside?: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavLinks = ({ setShowAside }: Props) => {
  const nullFn = () => null;
  const hideAside = () => {
    if (setShowAside) {
      setShowAside(false);
    }
  };
  const { pathname } = useLocation();
  return (
    <ul className="links center">
      {linksArr.map(({ to, link }, i) => {
        return (
          <motion.li
            className="center relative"
            key={i}
            variants={opacityVariant}
            onClick={setShowAside ? hideAside : nullFn}
          >
            <NavLink className="link" to={to}>
              {link}
            </NavLink>
            {pathname === to && (
              <motion.div
                transition={{
                  duration: 0.5,
                  delay: pathname === "/" ? 1.5 : 0.4,
                }}
                layoutId="active-link"
                className="abs active"
              />
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
