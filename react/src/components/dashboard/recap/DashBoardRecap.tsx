import { useRef } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import CountUpAnimation from "@/components/widgets/animation/CountUpAnimation";
import InViewAnimation from "@/components/widgets/animation/InViewAnimation";
import useParams from "@/custom/useParams";
const COLORS = ["#0088FE99", "#00C49F99", "#FFBB2899", "#FF804299"];

interface Props {
  head: string;
  percentage: number;
  analytics: string;
  to: string;
  link: string;
  i: number;
  Icon: React.ComponentType;
}
const DashBoardRecap = ({
  Icon,
  percentage,
  head,
  analytics,
  to,
  link,
  i,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { showDashBoaedAside } = useParams();

  return (
    <InViewAnimation
      style={{ borderBottom: `2px solid ${COLORS[i]}` }}
      className={"recap"}
    >
      <div className=" center between" ref={ref}>
        <span
          className={`center gap ${
            percentage >= 0 ? "percent-pos" : "percent-negative"
          }`}
        >
          {percentage >= 0 ? <IoIosArrowUp /> : <IoIosArrowDown />}
          {percentage}%
        </span>
      </div>
      {inView && (
        <div className="analytics center col">
          <div className="center number">
            <CountUpAnimation num={Number(analytics)} tofixed={0} />
          </div>

          <h3 className=" head-recap header center ">{head}</h3>
        </div>
      )}

      <div className="links-recap center between">
        <Link
          to={to + `${showDashBoaedAside ? "?showDashBoaedAside=true" : ""}`}
          style={{ color: `${[COLORS[i]]}` }}
        >
          {" "}
          {link}
        </Link>
        <Icon />
      </div>
    </InViewAnimation>
  );
};

export default DashBoardRecap;
