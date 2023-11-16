import InViewAnimation from "../widgets/animation/InViewAnimation";
import clsx from "clsx";
import ZimartDetails from "../contactUs/ZimartDetails";

const FooterLinks = () => {
  return (
    <InViewAnimation once className="icons-footer  contact-details center col">
      <h2 className=" header ">contact me</h2>

      <div className={clsx("social-icons center col")}>
        <ZimartDetails type="footer" />
      </div>
    </InViewAnimation>
  );
};

export default FooterLinks;
