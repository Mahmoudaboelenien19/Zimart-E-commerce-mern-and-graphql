import { motion, MotionProps } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { IconType } from "react-icons/lib";
import FetchLoading from "../loaders/FetchLoading";

type Props = {
  pos?: string;
  btn?: string;
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
  ...props
}: Props) => {
  return (
    <motion.button
      {...props}
      key={"apply-btn" + btn}
      initial={{
        opacity: 0,
        // , borderRadius: 5
      }}
      animate={{
        opacity: disabled ? [1, 0.7] : opacity || 1,
      }}
      // whileHover={{ borderRadius: 0 }}
      transition={{ duration: 0.4 }}
      className={clsx(`center`, className)}
    >
      {Icon && pos === "left" && (disabled ? <FetchLoading /> : <Icon />)}
      {!Icon && disabled ? (
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
};

export default MainBtn;
