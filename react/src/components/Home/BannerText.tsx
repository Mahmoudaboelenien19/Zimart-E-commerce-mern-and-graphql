import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";

interface Props {
  header: string;
  clr: string;
  button: string;
  slogan: string;
  to: string;
  fn: () => void;
  isShown: boolean;
}
const BannerText = ({
  fn,
  header,
  clr,
  button,
  to,
  slogan,
  isShown,
}: Props) => {
  const bannerTextVariant = {
    start: {
      opacity: 0,
    },
    end: {
      opacity: isShown ? [0, 0.2, 0.5, 0.7, 1] : 0,
      x: !isShown ? 0 : [120, 0],
      transition: { duration: 0.4, delay: 0.4 },
    },
  };
  const navigate = useNavigate();
  const handleContactBtn = () => navigate("/contact");
  const { theme } = useContext(themeContext);
  return (
    <motion.div
      variants={bannerTextVariant}
      key={header}
      className={clsx("banner-content center col main-txt", theme)}
      initial="start"
      animate="end"
    >
      <h1 className="header" style={{ color: `${clr}` }}>
        {header}
      </h1>

      <p>{slogan}</p>

      <div className="banner-links center">
        <Link to={to} smooth className=" ">
          <button
            onClick={fn}
            className="banner-btn btn center gap"
            style={{
              background: clr,
              cursor: "pointer",
              border: `1.5px solid ${clr}`,
            }}
          >
            <span>{button}</span>
            <span>
              <FiArrowUpRight />
            </span>
          </button>
        </Link>
        <button
          onClick={handleContactBtn}
          className={clsx("btn banner-btn  about", theme)}
        >
          contact us
        </button>
      </div>
    </motion.div>
  );
};

export default BannerText;
