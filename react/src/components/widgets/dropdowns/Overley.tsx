import React from "react";
import { motion } from "framer-motion";

import { ChildrenInterFace } from "../../../interfaces/general";
import FadeElement from "../animation/FadeElement";
interface Props extends ChildrenInterFace {
  sethide: React.Dispatch<React.SetStateAction<boolean>>;
  cls: string;
  dir?: string;
  height?: number;
}
const Overley = ({ sethide, cls, children }: Props) => {
  const handlehidePop = () => {
    sethide(false);
  };

  return (
    <motion.div
      className="overley center"
      onClick={handlehidePop}
      key={"overley"}
    >
      {/* <span onClick={(e) => e.stopPropagation()}> */}
      <FadeElement
        cls={cls}
        key={"overley-pop"}
        fn={(e) => e.stopPropagation()}
      >
        {children}
      </FadeElement>
      {/* </span> */}
    </motion.div>
  );
};

export default Overley;
