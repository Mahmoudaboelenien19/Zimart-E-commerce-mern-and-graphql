import InViewAnimation from "../widgets/animation/InViewAnimation";
import { ReactSVG } from "react-svg";

const AboutFooter = () => {
  return (
    <InViewAnimation once className="about-footer center col ">
      <ReactSVG
        src={
          "https://res.cloudinary.com/domobky11/image/upload/v1700364978/logo_vn5mvy.svg"
        }
        className="footer-logo"
      />
      <p>
        Discover the perfect products for your lifestyle, conveniently delivered
        right to your doorstep. Experience unparalleled convenience and
        exceptional quality with our curated selection. exceptional quality with
        our curated selection.
      </p>
    </InViewAnimation>
  );
};

export default AboutFooter;
