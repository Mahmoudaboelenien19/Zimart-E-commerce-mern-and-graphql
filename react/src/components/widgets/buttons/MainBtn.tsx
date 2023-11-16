import { motion, MotionProps } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { IconType } from "react-icons/lib";
import FetchLoading from "../loaders/FetchLoading";

type Props = {
  pos?: string;
  btn?: string;
  loading?: boolean;
  Icon?: IconType;
  opacity?: number;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps;

const MainBtn = ({
  pos = "left",
  btn,
  Icon,
  opacity,
  className,
  disabled,
  loading,
  ...props
}: Props) => (
  <motion.button
    {...props}
    key={"apply-btn" + btn}
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: disabled || loading ? [1, 0.7] : opacity || 1,
    }}
    transition={{ duration: 0.4 }}
    className={clsx(`center`, className)}
  >
    {Icon && pos === "left" && (loading ? <FetchLoading /> : <Icon />)}
    {!Icon && loading ? (
      <span className="gap btn-txt center ">
        <FetchLoading />
        <span>{btn}</span>
      </span>
    ) : (
      btn
    )}

    {Icon && pos === "right" && <Icon />}
  </motion.button>
);

export default MainBtn;
