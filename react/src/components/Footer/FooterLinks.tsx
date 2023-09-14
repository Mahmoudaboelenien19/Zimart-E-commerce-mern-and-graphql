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
    <FadeWithY once cls="footer-important-links footer-links ">
      <h3 className=" footer-head header">links</h3>
      <motion.span whileHover={{ x: 10 }}>
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
    </FadeWithY>
  );
};

export default FooterLinks;
