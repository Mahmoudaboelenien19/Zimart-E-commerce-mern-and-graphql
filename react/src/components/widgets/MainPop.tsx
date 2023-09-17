import React from "react";
import Overley from "../widgets/dropdowns/Overley";
import { ChildrenInterFace } from "../../interfaces/general";
import { motion } from "framer-motion";
import FadeElement from "./animation/FadeElement";
import useHideScroll from "../../custom/useHideScroll";
interface Props extends ChildrenInterFace {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  bool: boolean;
  cls?: string;
}
const MainPop = ({ bool, setter, children, cls = "" }: Props) => {
  useHideScroll(bool);

  return (
    <>
      {bool && (
        <Overley cls={`popup  ${cls}`} sethide={setter}>
          <FadeElement delay={0.6} cls="pop-par center col gap between">
            {children}
          </FadeElement>
          <motion.div
            className="skewed       "
            initial={{ transform: "rotate(0)" }}
            animate={{ transform: "rotate(2deg)" }}
            transition={{ delay: 0.2, duration: 0.2 }}
          ></motion.div>
        </Overley>
      )}
    </>
  );
};

export default MainPop;
