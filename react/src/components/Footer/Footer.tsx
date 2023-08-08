import React, { useEffect } from "react";
import AboutFooter from "./AboutFooter";
import FooterCategory from "./FooterCategory";
import FooterSocial from "./FooterSocial";
import CopyRight from "./CopyRight";
import FooterLinks from "./FooterLinks";
import { motion } from "framer-motion";
import { stagger, useAnimate, useInView } from "framer-motion";
const Footer = () => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });
  useEffect(() => {
    if (inView) {
      animate(
        "footer > * ,p,footer  div",
        { opacity: [0, 0.4, 0.8, 1] },
        { duration: 0.2, delay: stagger(0.1) }
      );
    }
  }, [inView]);
  return (
    <motion.footer
      ref={scope}
      whileInView={{ opacity: [0, 0.3, 0.6, 1] }}
      viewport={{ amount: 0.25 }}
    >
      <div className="content">
        <AboutFooter />
        <FooterLinks />
        <FooterCategory />
        <FooterSocial />
      </div>
      <CopyRight />
    </motion.footer>
  );
};

export default Footer;
