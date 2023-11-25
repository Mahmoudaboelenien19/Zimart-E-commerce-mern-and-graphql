import AboutFooter from "./AboutFooter";
import FooterCategory from "./FooterCategory";
import FooterSocial from "./FooterSocial";
import CopyRight from "./CopyRight";
import FooterLinks from "./FooterLinks";
import "./footer.scss";
import InViewAnimation from "../widgets/animation/InViewAnimation";

const Footer = () => {
  return (
    <footer>
      <InViewAnimation once={false} className="content">
        <AboutFooter />
        <FooterCategory />
        <FooterLinks />
        <FooterSocial />
      </InViewAnimation>
      <CopyRight />
    </footer>
  );
};

export default Footer;
