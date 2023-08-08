import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUpAnimation from "../../widgets/CountUpAnimation";
interface Props {
  head: string;
  percentage: number;
  analytics: string;
  to: string;
  link: string;
  Icon: React.ComponentType;
}
const DashBoardRecap = ({
  Icon,
  percentage,
  head,
  analytics,
  to,
  link,
}: Props) => {
  return (
    <motion.div
      style={{ opacity: 0 }}
      transition={{ delay: 0.05, duration: 0.4 }}
      whileInView={{ opacity: [0, 0.2, 0.4, 0.6, 1] }}
      className={`recap 
      `}
    >
      <div className=" center between">
        <span
          className={`center gap ${
            percentage >= 0 ? "percent-pos" : "percent-negative"
          }`}
        >
          {percentage >= 0 ? <IoIosArrowUp /> : <IoIosArrowDown />}
          {percentage}%
        </span>
      </div>
      <div className="analytics center col">
        <>
          {Number(analytics) >= 1 && (
            <span className="center">
              <CountUpAnimation num={Number(analytics)} tofixed={0} />{" "}
            </span>
          )}
        </>
        <h3 className=" head-recap header center ">{head}</h3>
      </div>
      <div className="links-recap center between">
        <Link to={to}> {link}</Link>
        <Icon />
      </div>
    </motion.div>
  );
};

export default DashBoardRecap;
