import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import clsx from "clsx";
import SpecialWord from "./SpecialWord";

const bannerTextVariant = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: [0, 0.5, 1],
    x: [120, 0],
    transition: { when: "beforeChildren", duration: 0.3, delay: 0.4 },
  },
};

const variant = {
  start: {},
  end: {},
};

interface Props {
  header: string;
  clr: string;
  button: string;
  slogan: string;

  to: string;
  fn: () => void;
}
const BannerText = ({ fn, header, clr, button, to, slogan }: Props) => {
  const navigate = useNavigate();
  const handleContactBtn = () => navigate("/contact");

  return (
    <motion.div
      variants={bannerTextVariant}
      className={"banner-content  col"}
      initial="start"
      animate="end"
    >
      <motion.h2 variants={variant} className="banner-head">
        <span>{header.split(" ").slice(0, 2).join(" ")}</span>
        <SpecialWord word={header.split(" ").slice(2, 3).join(" ")} clr={clr} />
        <span>{header.split(" ").slice(3, 4).join(" ")}</span>
        <span>{header.split(" ").slice(4).join(" ")}</span>
      </motion.h2>

      <p>{slogan}</p>

      <div className="banner-links product-links  center">
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
          className={clsx("btn banner-btn  about")}
        >
          contact us
        </button>
      </div>
    </motion.div>
  );
};

export default BannerText;
