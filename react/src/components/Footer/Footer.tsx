import React from "react";
import AboutFooter from "./AboutFooter";
import FooterCategory from "./FooterCategory";
import FooterSocial from "./FooterSocial";
import CopyRight from "./CopyRight";
import FooterLinks from "./FooterLinks";
const Footer = () => {
  return (
    <footer>
      <div className="content">
        <AboutFooter />
        <FooterLinks /> <FooterCategory /> <FooterSocial />{" "}
      </div>
      <CopyRight />
    </footer>
  );
};

export default Footer;
