import LogoSvg from "../svgs/LogoSvg";
import InViewAnimation from "../widgets/animation/InViewAnimation";

const AboutFooter = () => {
  return (
    <InViewAnimation once className="about-footer center col ">
      <LogoSvg type="footer" />
      <p>
        Discover the perfect products for your lifestyle, conveniently delivered
        right to your doorstep. Experience unparalleled convenience and
        exceptional quality with our curated selection.
      </p>
    </InViewAnimation>
  );
};

export default AboutFooter;
