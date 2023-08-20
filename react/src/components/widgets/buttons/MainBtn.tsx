import { motion } from "framer-motion";
import React from "react";
import Title from "../Title";
import SmallLoader from "../loaders/SmallLoader";
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
const MainBtn = ({
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
  return (
    <Title title={title ? title : ""} cls={parCls}>
      <motion.button
        key={"apply-btn"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        disabled={isPending}
        className={`center ${cls}`}
        onClick={fn}
        style={{ color: "var(--white)", opacity: isPending ? 0.5 : 1 }}
        type={type}
      >
        <>
          <>
            {Icon && pos === "left" && (isPending ? <SmallLoader /> : <Icon />)}

            {!Icon && isPending ? (
              <span className="gap center">
                <SmallLoader />
                {btn}
              </span>
            ) : (
              btn
            )}
          </>

          {Icon && pos === "right" && <Icon />}
        </>
      </motion.button>
    </Title>
  );
};

export default MainBtn;
