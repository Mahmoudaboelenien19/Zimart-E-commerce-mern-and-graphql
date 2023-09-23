import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { linksArr } from "../../assets/arries/LinksArr";
import FadeWithY from "../widgets/animation/FadeWithY";
const FooterLinks = () => {
  const arr = [
    ...linksArr.filter((obj) => obj.link !== "Home"),
    { link: "Faq", to: "/faq" },
  ];
  return (
    <FadeWithY once cls=" footer-links ">
      <div className="center start col footer-links-par">
        <h3 className=" footer-head ">links</h3>
        <motion.span
        // whileHover={{ x: 10 }}
        >
          <Link to="banner" smooth style={{ cursor: "pointer" }}>
            home
          </Link>
        </motion.span>
        {arr.map(({ link, to }, i) => {
          return (
            <motion.span whileHover={{ x: 10 }} key={i}>
              <NavLink to={to}>{link}</NavLink>
            </motion.span>
          );
        })}
      </div>
    </FadeWithY>
  );
};

export default FooterLinks;
