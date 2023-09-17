import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Title from "../Title";
import useParams from "@/custom/useParams";
import { opacityVariant } from "@/variants/globals";
import useIsMobile from "@/custom/useIsMobile";
interface Props {
  target: string;
  title: string;
  bool?: boolean;
}
const MobileCloseDropDown = ({ target, title, bool }: Props) => {
  const { isMobile } = useIsMobile();
  const { deleteParam } = useParams();
  const closeTarget = () => {
    deleteParam(target);

    if (target === "showDashBoaedAside") {
      sessionStorage.removeItem("show-aside");
    }
  };
  return (
    <AnimatePresence>
      {(isMobile || bool) && (
        <motion.span
          key={"hide-dash"}
          variants={opacityVariant}
          transition={{ duration: 0.4 }}
          className="close-pop"
          onClick={closeTarget}
        >
          <Title title={title}>
            <AiFillCloseCircle className="icon red" />
          </Title>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default MobileCloseDropDown;
