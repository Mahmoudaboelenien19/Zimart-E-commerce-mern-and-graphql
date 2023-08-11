import { motion } from "framer-motion";
import React, { useRef } from "react";
import { btnHover, btnTap, opacityVariant } from "../../variants/globals";
import Title from "./Title";
import { BallTriangle } from "react-loader-spinner";
interface Props {
  fn: () => void;
  btn: string;
  cls: string;
  Icon?: React.ComponentType;
  title?: string;
  pos?: string;
  parCls?: string;
  type?: "submit" | "button" | "reset";
  isPending?: boolean;
}
const OpacityBtn = ({
  type = "button",
  pos = "left",
  parCls,
  fn,
  btn,
  cls,
  Icon,
  title,
  isPending = false,
}: Props) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <Title title={title ? title : ""} cls={parCls}>
      <motion.button
        ref={ref}
        key={"apply-btn"}
        // variants={opacityVariant}
        transition={{ duration: 0.4 }}
        // initial="start"
        // exit="exit"
        // animate="end"
        whileHover={btnHover}
        whileTap={btnTap}
        className={`center ${cls}`}
        onClick={fn}
        style={{ color: "var(--white)", opacity: isPending ? 0.7 : 1 }}
        type={type}
      >
        <>
          {isPending ? (
            <div
              style={{ width: ref.current!.offsetWidth - 30 || 0 }}
              className="center"
            >
              <BallTriangle
                height={12}
                width={12}
                radius={5}
                color="white"
                ariaLabel="ball-triangle-loading"
              />
            </div>
          ) : (
            <>
              {Icon && pos === "left" && <Icon />}
              {btn}
            </>
          )}
        </>
        {Icon && pos === "right" && <Icon />}
      </motion.button>
    </Title>
  );
};

export default OpacityBtn;
