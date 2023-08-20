import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { opacityVariant } from "../../../variants/globals";
import useIsMobile from "../../../custom/useIsMobile";
import Title from "../Title";
interface Props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}
const MobileCloseDropDown = ({ setter, title }: Props) => {
  const { isMobile } = useIsMobile();
  return (
    <AnimatePresence>
      {isMobile && (
        <motion.span
          key={"hide-dash"}
          variants={opacityVariant}
          transition={{ duration: 0.4 }}
          className="dash-aside-close"
          onClick={() => setter(false)}
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
