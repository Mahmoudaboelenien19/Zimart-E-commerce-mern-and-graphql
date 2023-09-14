import React from "react";
import LogoSvg from "../svgs/LogoSvg";
import FadeWithY from "../widgets/animation/FadeWithY";

const AboutFooter = () => {
  return (
    <FadeWithY once cls="about-footer center col ">
      <LogoSvg />
      <p>
        I created this E-commerce using React, TypeScript,Sass Apollo Client,
        React Router DOM and Framer Motion for Frontend. <br />
      </p>
      <p>
        and I use TypeScript, Mongoose, Node.js, Express, GraphQL, Stripe, OAuth
        Google, Authorization for Backend.
      </p>
    </FadeWithY>
  );
};

export default AboutFooter;
