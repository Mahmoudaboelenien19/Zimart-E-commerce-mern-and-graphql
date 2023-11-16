import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { linksArr } from "../../assets/arries/LinksArr";
import InViewAnimation from "../widgets/animation/InViewAnimation";
import Header from "../widgets/shared/Header";
const FooterLinks = () => {
  const arr = [
    ...linksArr.filter((obj) => obj.link !== "Home"),
    { link: "Faq", to: "/faq" },
  ];
  return (
    <InViewAnimation once className="center start col footer-links">
      <Header head="links" />
      <Link to="banner" smooth style={{ cursor: "pointer" }}>
        home
      </Link>
      {arr.map(({ link, to }, i) => {
        return (
          <NavLink key={i} to={to}>
            {link}
          </NavLink>
        );
      })}
    </InViewAnimation>
  );
};

export default FooterLinks;
