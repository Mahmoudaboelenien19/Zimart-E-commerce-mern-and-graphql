import React from "react";
import LogoSvg from "../svgs/LogoSvg";
import FadeWithY from "../widgets/animation/FadeWithY";
import { MdEmail, MdPhone } from "react-icons/md";

const AboutFooter = () => {
  const arr = [
    { Icon: <MdEmail />, content: "office@carland.com" },

    { Icon: <MdPhone />, content: "(123) 456-789" },
  ];
  return (
    <FadeWithY once cls="about-footer center col ">
      <LogoSvg />
      <p className="first-p">
        Discover the perfect products for your lifestyle, delivered right to
        your doorstep.
      </p>
      <div>
        {arr.map(({ Icon, content }, index) => (
          <div key={index} className=" center gap">
            {Icon}
            <p>{content}</p>
          </div>
        ))}
      </div>
    </FadeWithY>
  );
};

export default AboutFooter;
