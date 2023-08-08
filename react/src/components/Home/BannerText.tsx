import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

interface Props {
  header: string;
  clr: string;
  button: string;
  slogan: string;
  to: string;
  fn: () => void;
}
const BannerText = ({ fn, header, clr, button, to, slogan }: Props) => {
  const bannerTextVariant = {
    start: {
      opacity: 0,
      x: 120,
    },
    end: {
      opacity: [0, 0.2, 0.5, 0.7, 1],
      x: 0,
      transition: { duration: 0.4, delay: 1.2 },
    },
  };
  const navigate = useNavigate();
  const handleContactBtn = () => navigate("/contact");
  return (
    <motion.div
      variants={bannerTextVariant}
      key={header}
      className="banner-content center col"
      initial={"start"}
      animate="end"
      style={{ opacity: 0 }}
    >
      <h1 className="header" style={{ color: `${clr}` }}>
        {header}
      </h1>

      <p>{slogan}</p>

      <div className="product-links center">
        <Link to={to} smooth className=" ">
          <button
            onClick={fn}
            className="banner-btn btn"
            style={{
              background: clr,
              cursor: "pointer",
              border: `1.5px solid ${clr}`,
            }}
          >
            {button}
          </button>
        </Link>
        <button onClick={handleContactBtn} className="btn banner-btn  about">
          {" "}
          contact us
        </button>
      </div>
    </motion.div>
  );
};

export default BannerText;
