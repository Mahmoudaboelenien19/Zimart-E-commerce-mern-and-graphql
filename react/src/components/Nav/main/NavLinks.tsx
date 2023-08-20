import { MotionValue, motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import { opacityVariant } from "../../../variants/globals";
import { linksArr } from "../../../assets/arries/LinksArr.js";

interface Props {
  LinkClr?: MotionValue | string;
  setShowAside?: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavLinks = ({ LinkClr = "white", setShowAside }: Props) => {
  const nullFn = () => null;
  const hideAside = () => {
    if (setShowAside) {
      setShowAside(false);
    }
  };
  return (
    <ul className="links center">
      {linksArr.map(({ to, link }, i) => {
        return (
          <motion.li
            className="center"
            key={i}
            variants={opacityVariant}
            style={{ color: LinkClr }}
            onClick={setShowAside ? hideAside : nullFn}
          >
            <NavLink className="link" to={to}>
              {link}
            </NavLink>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
