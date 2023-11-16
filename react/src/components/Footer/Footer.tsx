import AboutFooter from "./AboutFooter";
import FooterCategory from "./FooterCategory";
import FooterSocial from "./FooterSocial";
import CopyRight from "./CopyRight";
import FooterLinks from "./FooterLinks";
import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="content">
        <AboutFooter />
        <FooterCategory />
        <FooterLinks />
        <FooterSocial />
      </div>
      <CopyRight />
    </footer>
  );
};

export default Footer;
